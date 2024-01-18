import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
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
      setUV({
        u: redisData[redisData.length - 1].u,
        v: redisData[redisData.length - 1].v,
      });
    }
  }, [redisData]);

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className="absolute top-0 z-50 right-11 h-full flex items-center rounded-r-2xl overflow-x-hidden bg-[#6F6F6FCC]/50 backdrop-blur transition-all ease-in-out"
      style={{
        width: isDisplay ? "35vw" : "3vw",
        transitionDuration: isDisplay ? "700ms" : "600ms",
        animationDuration: isDisplay ? "700ms" : "600ms",
      }}
    >
      <Button
        onClick={() => setIsDisplay(!isDisplay)}
        variant="ghost"
        className="hover:bg-transparent"
      >
        <ChevronLeft
          className="transition-all duration-500 text-white"
          style={{ rotate: isDisplay ? "180deg" : "" }}
        />
      </Button>
      {isDisplay && (
        <div className="flex flex-col h-full py-2 text-white">
          <div className="my-5 text-2xl font-semibold tracking-wider">
            CURRENT AGENT INFO
          </div>
          <div className="w-[30vw] h-[28vh] p-2 px-3 bg-[#1F1F1FB2] rounded-3xl">
            <div
              className="my-2 pl-4 mx-auto text-2xl font-semibold"
              style={{ letterSpacing: "0.625rem" }}
            >
              李白
            </div>
            {/* <div className="w-[50%] p-1 mx-auto text-lg text-center font-semibold bg-[#5E5840]/90">{redisData.length ? redisData[0].name : ""}</div> */}
            <div className="flex flex-col gap-y-2 pl-8">
              {infos.map((info) => (
                <div key={info.label} className="flex items-center gap-x-6">
                  <div className="flex items-center gap-x-2 w-36">
                    <info.icon className="w-8 h-8" />
                    <span className="text-lg font-semibold">{info.label}</span>
                  </div>
                  <Progress
                    value={attrValues![info.label]}
                    className="w-64 transition-all duration-200"
                  />
                  <span className="w-6 text-lg font-semibold">
                    {attrValues![info.label]}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="my-5 text-2xl font-semibold tracking-wider">
            DATA ANALYSIS
          </div>
          <div className="relative flex justify-between items-center px-6 w-[30vw] h-[38vh] bg-[#1F1F1FB2] rounded-3xl">
            <div className=" h-[32vh] flex flex-col items-center gap-y-3">
              <p className="text-xl indent-3 tracking-wider">
                Equilibrium State
              </p>
              <UVBar UV={UV} />
            </div>
            <div className=" h-[32vh] flex flex-col items-center gap-y-3">
              <p className="text-xl indent-3 tracking-wider">UV Energy</p>
              <RoseGraph isDisplay />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
