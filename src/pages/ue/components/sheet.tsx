import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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

export const Sheet = () => {
  const { redisData } = useRedis();

  const [isDisplay, setIsDisplay] = useState(false);
  const [attrValues, setAttrValues] = useState<AttrValue>();
  const [UV, setUV] = useState<{ u: number; v: number }>({ u: 0, v: 0 });

  useEffect(() => {
    if (redisData && redisData.length > 0) {
      setAttrValues(redisData[redisData.length - 1].attr_value);
      // setUV({
      //   u: redisData[redisData.length - 1].u,
      //   v: redisData[redisData.length - 1].v,
      // });
    }
    const timer = setInterval(() => {
      setUV({
        u: Math.random() * 100,
        v: Math.random() * 100,
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [redisData]);

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className="absolute top-0 z-40 right-11 h-full flex items-center rounded-r-2xl overflow-x-hidden bg-[#6F6F6FCC]/50 backdrop-blur transition-all ease-in-out"
      style={{
        width: isDisplay ? "25vw" : "3vw",
        transitionDuration: isDisplay ? "700ms" : "600ms",
        animationDuration: isDisplay ? "700ms" : "600ms",
      }}
    >
      <Button
        onClick={() => setIsDisplay(!isDisplay)}
        variant="ghost"
        className="-mt-16 hover:bg-transparent"
      >
        <ChevronLeft
          className="transition-all duration-500 text-white"
          style={{ rotate: isDisplay ? "180deg" : "" }}
        />
      </Button>
      {isDisplay && (
        <div className="flex flex-col h-full py-2 text-white">
          <div className="my-4 -ml-8 text-2xl font-semibold tracking-wider">
            CURRENT AGENT INFO
          </div>
          <div className="w-[23.5vw] h-[28vh] -ml-10 p-2 px-3 bg-[#1F1F1FB2] rounded-3xl">
            <div className="flex justify-between items-center mb-2">
              <div
                className="my-2 pl-4 text-2xl font-semibold"
                style={{ letterSpacing: "0.625rem" }}
              >
                李白
              </div>

              <HoverCard>
                <HoverCardTrigger>
                  <HelpCircle />
                </HoverCardTrigger>
                <HoverCardContent side="right" className="relative z-50">
                  The React Framework – created and maintained by @vercel.
                </HoverCardContent>
              </HoverCard>
            </div>
            {/* <div className="w-[50%] p-1 mx-auto text-lg text-center font-semibold bg-[#5E5840]/90">{redisData.length ? redisData[0].name : ""}</div> */}
            <div className="flex flex-col gap-y-3 pl-3">
              {infos.map((info) => (
                <div key={info.label} className="flex items-center gap-x-4">
                  <div className="flex items-center gap-x-2 w-36">
                    <info.icon className="w-6 h-6" />
                    <span className="text-md font-semibold">{info.label}</span>
                  </div>
                  <Progress
                    value={attrValues![info.label]}
                    className="w-40 transition-all duration-200"
                  />
                  <span className="w-6 text-md font-semibold">
                    {attrValues![info.label]}
                  </span>
                </div>
              ))}
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
  );
};
