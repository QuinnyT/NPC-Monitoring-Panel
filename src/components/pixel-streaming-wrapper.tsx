// Copyright Epic Games, Inc. All Rights Reserved.

import { useEffect, useRef } from 'react';
import {
  Config,
  AllSettings,
  PixelStreaming,
} from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.3';

import {
  Application,
  PixelStreamingApplicationStyle
} from '@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.3';

export const PixelStreamingApplicationStyles =
  new PixelStreamingApplicationStyle();
PixelStreamingApplicationStyles.applyStyleSheet();

export interface PixelStreamingWrapperProps {
  initialSettings?: Partial<AllSettings>;
}


export const PixelStreamingWrapper = ({
  initialSettings
}: PixelStreamingWrapperProps) => {
  // A reference to parent div element that the Pixel Streaming library attaches into:
  const videoParent = useRef<HTMLDivElement>(null);

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
  // }, [videoParent.current]);

  useEffect(() => {
    if (videoParent.current) {
      // Attach Pixel Streaming library to videoParent element:
      const config = new Config({ initialSettings, useUrlParams: true });

      // const streaming = new PixelStreaming(config, {
      //     videoElementParent: videoParent.current
      // });

      const streaming = new PixelStreaming(config);
      const application = new Application({
        stream: streaming,
        onColorModeChanged: (isLightMode) =>
          PixelStreamingApplicationStyles.setColorMode(isLightMode)
      });

      videoParent.current.appendChild(application.rootElement);

      // register a playStreamRejected handler to show Click to play overlay if needed:
      // streaming.addEventListener('playStreamRejected', () => {
      //     setClickToPlayVisible(true);
      // });
      // Save the library instance into component state so that it can be accessed later:
      // setPixelStreaming(streaming);

      // Clean up on component unmount:
      return () => {
        try {
          streaming.disconnect();
        } catch { /* empty */ }
      };
    }
  }, [videoParent.current]);

  return (
    <div className='relative w-full h-full'>
      <div
        className='w-full h-full'
        ref={videoParent}
      />
      {/* {clickToPlayVisible && (
        <div
          className='absolute top-0 left-0 w-full h-full flex justify-center items-center cursor-pointer'
          onClick={() => {
            pixelStreaming?.play();
            setClickToPlayVisible(false);
          }}
        >
          <div>Click to play</div>
        </div>
      )} */}
    </div>
  );
};