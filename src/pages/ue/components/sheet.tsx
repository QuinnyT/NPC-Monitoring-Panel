import { useEffect, useState, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuPortal, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdownmenu";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  HelpCircle,
  ChevronLeft,
  Heart,
  Award,
  Users2,
  ShieldCheck,
  BadgeJapaneseYen,
  LucideIcon,
} from "lucide-react";

import { AttrValue, useRedis } from "@/hooks/use-redis";
import RoseGraph from "./rose-graph";
import { UVBar } from "./uv-bar";
// import { DropdownMenuPortal } from "@radix-ui/react-dropdown-menu";

type Info = {
  label: string;
  icon: LucideIcon;
};

const infos: Info[] = [
  {
    label: "Honor",
    icon: Award,
  },
  {
    label: "Intimacy",
    icon: Heart,
  },
  {
    label: "Social",
    icon: Users2,
  },
  {
    label: "Belonging",
    icon: ShieldCheck,
  },
  {
    label: "Survival",
    icon: BadgeJapaneseYen,
  },
];

type HistoryEvent = {
  frame: string;
  name: string;
};

const historyevent: HistoryEvent[] = [
  {
    frame: "10",
    name: "Test1",
  },
  {
    frame: "100",
    name: "Test2",
  },
  {
    frame: "20",
    name: "Test3",
  },
  {
    frame: "99",
    name: "Test4",
  },
  {
    frame: "111",
    name: "Test5",
  },
  {
    frame: "151",
    name: "Test6",
  },
];


export const Sheet = () => {
  const { redisData } = useRedis();

  const box = useRef(null);
  const [isDisplay, setIsDisplay] = useState(false);
  const [attrValues, setAttrValues] = useState<AttrValue>({
    Survival: 0,
    Belonging: 0,
    Social: 0,
    Intimacy: 0,
    Honor: 0,
  });
  const [UV, setUV] = useState<{ u: number; v: number }>({ u: 0, v: 0 });

  useEffect(() => {
    if (redisData && redisData.length > 0) {
      setAttrValues(redisData[redisData.length - 1].attr_value);
      // setUV({
      //   u: redisData[redisData.length - 1].u,
      //   v: redisData[redisData.length - 1].v,
      // });
      setUV({
        u: redisData[redisData.length - 1].u,
        v: redisData[redisData.length - 1].v,
      });
    }
  }, [redisData]);

  function handleHoverCardOpenChange(open: boolean) {
    console.log(box.current);
    if (!box.current) return

    // eslint-disable-next-line no-undef
    const ref = box.current as React.HTMLAttributes<HTMLDivElement>
    if (open) {
      ref.style!.overflow = "visible";
    } else {
      ref.style!.overflow = "hidden";
    }
  }

  return (
    <div>
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="absolute z-40 top-0 right-0 h-full flex items-center rounded-r-2xl overflow-x-hidden bg-[#6F6F6FCC]/50 backdrop-blur transition-all ease-in-out"
        style={{
          width: isDisplay ? "25vw" : "3vw",
          transitionDuration: isDisplay ? "700ms" : "600ms",
          animationDuration: isDisplay ? "700ms" : "600ms",
        }}
        ref={box}
      >
        <Button
          onClick={() => setIsDisplay(!isDisplay)}
          variant="ghost"
          className="-mt-10 hover:bg-transparent"
        >
          <ChevronLeft
            className="transition-all duration-500 text-white"
            style={{ rotate: isDisplay ? "180deg" : "" }}
          />
        </Button>
        {isDisplay && (
          <div className="flex flex-col h-full py-2 text-white">
            <div className="my-4 -ml-8 text-2xl font-semibold tracking-wider flex">
              CURRENT AGENT INFO
            </div>
            
            <div className="flex w-[23.5vw] h-[28vh]  -ml-10 p-2 px-3 bg-[#1F1F1FB2] rounded-3xl">
              <div className="w-[10vw] h-full relative">
                <HoverCard openDelay={50} onOpenChange={handleHoverCardOpenChange}>
                <HoverCardTrigger asChild className="absolute top-6 right-10">
                  <HelpCircle />
                </HoverCardTrigger>
                <HoverCardContent
                  side="right"
                  className="relative top-20 bg-[#D9D9D9]/90 w-48 h-72"
                >
                  <img
                    className="absolute top-9 right-4 object-cover"
                    src="/UI_triangle.png"
                    alt="Maslow"
                  />
                </HoverCardContent>
                </HoverCard>
                <div className="flex justify-between items-center mb-2">
                <div
                  className="my-2 pl-4 text-2xl font-semibold"
                  style={{ letterSpacing: "0.625rem" }}
                >
                  事件
                </div>
                </div>
                {/* <div className="w-[50%] p-1 mx-auto text-lg text-center font-semibold bg-[#5E5840]/90">{redisData.length ? redisData[0].name : ""}</div> */}
                <div className="flex flex-col h-3/4 gap-y-3 pl-3 "> 
                  <div className="flex items-center justify-between h-[10%]">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="w-[75%] text-[0.7rem] gap-x-4 border border-[#F4F1F1] opacity-50 p-px rounded ">
                        <img src="/UI_insert.png" />
                        <div>选择输入事件</div>
                        <img src="/UI_down.png" />
                      </DropdownMenuTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuContent className="w-32 bg-white text-[0.7rem]">
                          <DropdownMenuItem>
                            <div>111</div>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <div>222</div>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenuPortal>
                    </DropdownMenu>
                    <Button className="w-[20%] h-full rounded text-[0.7rem] bg-[#F4F1F1]">确定</Button>
                  </div>
              
                  {/* <div className="flex h-1/6 bg-white gap-x-4">
                  </div> */}
                  <div className="h-4/5  ">
                    <div className="w-full h-1/5 flex items-center gap-x-4 text-md font-semibold border-y border-white ">
                      <div className="w-[30%] pl-2">帧</div>
                      <div className="w-[70%]">历史事件</div>
                    </div>
                    <div className="w-full h-[80%] gap-x-4 border-b border-white overflow-y-scroll">
                    {historyevent.map((event) => (
                      <div key={event.frame} className="w-full h-1/5 flex items-center gap-x-4 text-md border-b border-white border-opacity-50">
                        <div className="w-[30%] pl-2">{event.frame}</div>
                        <div className="w-[70%]">{event.name}</div>
                      </div>
                    ))}
                    </div>
                  </div>
                </div>

              </div>

              <div className="w-[12vw] relative ml-2">
              <HoverCard openDelay={50} onOpenChange={handleHoverCardOpenChange}>
                <HoverCardTrigger asChild className="absolute top-6 right-10">
                  <HelpCircle />
                </HoverCardTrigger>
                <HoverCardContent
                  side="right"
                  className="relative top-20 bg-[#D9D9D9]/90 w-48 h-72"
                >
                  <img
                    className="absolute top-9 right-4 object-cover"
                    src="/UI_triangle.png"
                    alt="Maslow"
                  />
                </HoverCardContent>
              </HoverCard>
              <div className="flex justify-between items-center mb-2">
                <div
                  className="my-2 pl-4 text-2xl font-semibold"
                  style={{ letterSpacing: "0.625rem" }}
                >
                  李白
                </div>
              </div>
              {/* <div className="w-[50%] p-1 mx-auto text-lg text-center font-semibold bg-[#5E5840]/90">{redisData.length ? redisData[0].name : ""}</div> */}
              <div className="flex flex-col justify-between h-3/4 gap-y-3 pl-3 ">
                {infos.map((info) => (
                  <div key={info.label} className="flex items-center gap-x-4">
                    <div className="flex items-center gap-x-2 w-36">
                      <info.icon className="w-6 h-6" />
                      <span className="text-md font-semibold">
                        {info.label}
                      </span>
                    </div>
                    <Progress
                      value={attrValues![info.label]}
                      className="w-36 transition-all duration-200"
                    />
                    <span className="w-[12vw] text-md font-semibold">
                      {attrValues![info.label]}
                    </span>
                  </div>
                ))}
              </div>
              </div>
            </div>
            


            <div className="mt-16 mb-4 -ml-8 text-2xl font-semibold tracking-wider">
              DATA ANALYSIS
            </div>
            <div className="relative w-[23.5vw] h-[36vh] -ml-10 px-2 flex justify-between items-center bg-[#1F1F1FB2] rounded-3xl">
              <div className=" h-[32vh] ml-2 flex flex-col items-center gap-y-3">
                <p className="text-xl font-semibold">Equilibrium State</p>
                <UVBar UV={UV} />
              </div>
              <div className=" h-[32vh] flex flex-col items-center gap-y-3">
                <p className="text-xl font-semibold">Energy Scale</p>
                <RoseGraph isDisplay />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
