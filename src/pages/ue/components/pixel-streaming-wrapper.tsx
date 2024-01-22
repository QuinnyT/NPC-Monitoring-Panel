// Copyright Epic Games, Inc. All Rights Reserved.

import { useCallback, useEffect, useRef } from "react";
import {
  Config,
  AllSettings,
  PixelStreaming,
} from "@epicgames-ps/lib-pixelstreamingfrontend-ue5.3";

import {
  Application,
  PixelStreamingApplicationStyle,
  UIElementCreationMode,
} from "@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.3";
import { Sheet } from "./sheet";
import { useApi } from "@/hooks/use-api";
// import { createBWYInstanceApi, createUEInstanceApi } from '@/lib/api';
import { useRedis } from "@/hooks/use-redis";

export const PixelStreamingApplicationStyles =
  new PixelStreamingApplicationStyle();
PixelStreamingApplicationStyles.applyStyleSheet();

export interface PixelStreamingWrapperProps {
  initialSettings?: Partial<AllSettings>;
}

export const PixelStreamingWrapper = ({
  initialSettings,
}: PixelStreamingWrapperProps) => {
  useApi();
  const { setTargetId } = useRedis();

  // A reference to parent div element that the Pixel Streaming library attaches into:
  const videoParent = useRef<HTMLDivElement>(null);
  const UEClient = useRef<boolean>(false);
  const cursorState = useRef<boolean>(false); // 0 hide 1 show
  const currentKey = useRef<string>("");

  const handleClickStart = useCallback(async (e: React.MouseEvent) => {
    UEClient.current = true;
    if ((e.target as any).nodeName === "DIV" && !UEClient.current) {
      // const data1 = await createBWYInstanceApi({ msg: 'create' })
      // console.log(data1);
      // const data2 = await createUEInstanceApi({ msg: 'create' })
      // console.log(data2);
    }
  }, []);

  // Pixel streaming library instance is stored into this state variable after initialization:
  // const [pixelStreaming, setPixelStreaming] = useState<PixelStreaming>();

  // A boolean state variable that determines if the Click to play overlay is shown:
  // const [clickToPlayVisible, setClickToPlayVisible] = useState(true);

  // Run on component mount:
  // useEffect(() => {
  //   if (videoParent.current) {
  //     // Attach Pixel Streaming library to videoParent element:
  //     const config = new Config({ initialSettings });
  //     const streaming = new PixelStreaming(config, {
  //       videoElementParent: videoParent.current
  //     });

  //     // register a playStreamRejected handler to show Click to play overlay if needed:
  //     streaming.addEventListener('playStreamRejected', () => {
  //       setClickToPlayVisible(true);
  //     });

  //     // Save the library instance into component state so that it can be accessed later:
  //     setPixelStreaming(streaming);

  //     // Clean up on component unmount:
  //     return () => {
  //       try {
  //         streaming.disconnect();
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     };
  //   }
  // }, []);

  useEffect(() => {
    if (videoParent.current) {
      // Attach Pixel Streaming library to videoParent element:
      const config = new Config({ initialSettings });

      // const streaming = new PixelStreaming(config, {
      //     videoElementParent: videoParent.current
      // });

      const streaming = new PixelStreaming(config);
      const application = new Application({
        stream: streaming,
        onColorModeChanged: (isLightMode) =>
          PixelStreamingApplicationStyles.setColorMode(isLightMode),
        // settingsPanelConfig: {
        //   isEnabled: false,
        //   visibilityButtonConfig: { creationMode: UIElementCreationMode.Disable }
        // },
        statsPanelConfig: {
          isEnabled: false,
          visibilityButtonConfig: {
            creationMode: UIElementCreationMode.Disable,
          },
        },
        videoQpIndicatorConfig: {
          disableIndicator: true,
        }
      });

      streaming.addResponseEventListener("handle_responses", (response) => {
        const { SpectateTargetID } = JSON.parse(response);
        setTargetId(SpectateTargetID);
      });

      videoParent.current.appendChild(application.rootElement);

      // register a playStreamRejected handler to show Click to play overlay if needed:
      // streaming.addEventListener('playStreamRejected', () => {
      //     setClickToPlayVisible(true);
      // });
      // Save the library instance into component state so that it can be accessed later:
      // setPixelStreaming(streaming);

      function hijackAlt(e: KeyboardEvent) {
        if ((e.key === "m" || e.key === "Alt") && UEClient.current) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          console.log("m", currentKey.current, e.key);

          // if (currentKey.current === "") {
          //   currentKey.current = e.key
          // }

          if (currentKey.current !== e.key) {
            config.setSettings({ HoveringMouse: true });
            cursorState.current = true;
            currentKey.current = e.key;
            console.log("触发alt 现在HoveringMouse: true");
          } else {
            config.setSettings({ HoveringMouse: false });
            cursorState.current = false;
            currentKey.current = "";
            console.log("触发alt 现在HoveringMouse: false");
          }

          // currentKey.current = e.key

          // if (!cursorState.current) {
          //   config.setSettings({ HoveringMouse: true })
          //   cursorState.current = true
          //   currentKey.current = e.key
          //   console.log('触发alt 现在HoveringMouse: true');
          // } else {
          //   config.setSettings({ HoveringMouse: false })
          //   cursorState.current = false
          //   currentKey.current = ""
          //   console.log('触发alt 现在HoveringMouse: false');
          // }
        }
      }

      window.addEventListener("keyup", hijackAlt);

      // Clean up on component unmount:
      return () => {
        try {
          streaming.disconnect();
          videoParent.current!.removeChild(application.rootElement);
          streaming.removeResponseEventListener("handle_responses");
          window.removeEventListener("keyup", hijackAlt);
        } catch {
          /* empty */
        }
      };
    }
  }, []);

  return (
    <div
      id="pixelStreaming"
      className="relative w-full h-full"
      ref={videoParent}
      onClick={handleClickStart}
    >
      <Sheet />
      <div className="absolute bottom-0 left-0 w-44 h-28 rounded-2xl bg-[#737373B2] z-50 px-2 py-4 select-none">
        <div className="flex flex-col">
          <div className=" text-lg font-semibold mb-2">切回控制</div>
          <div className="text-sm mb-1">1. Alt进入客户端</div>
          <div className="text-sm">2. 鼠标左键选择切入视角</div>
        </div>
      </div>
    </div>
    /* {clickToPlayVisible && (
        <div
          className='absolute top-0 left-0 w-full h-full flex justify-center items-center cursor-pointer'
          onClick={() => {
            pixelStreaming?.play();
            setClickToPlayVisible(false);
          }}
        >
          <div>Click to play</div>
        </div>
    )} */
  );
};
