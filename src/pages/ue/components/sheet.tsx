import { useCallback, useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, Heart, Award, Users2, ShieldCheck, BadgeJapaneseYen, LucideIcon } from "lucide-react"

import { AttrValue, useRedis } from "@/hooks/use-redis"
import RoseGraph from "./rose-graph"

type Info = {
  label: string,
  icon: LucideIcon,
}


const infos: Info[] = [
  // todo: get & change value from...
  {
    label: 'Honor',
    icon: Award
  },
  {
    label: 'Intimacy',
    icon: Heart
  },
  {
    label: 'Social',
    icon: Users2
  },
  {
    label: 'Belonging',
    icon: ShieldCheck
  },
  {
    label: "Survival",
    icon: BadgeJapaneseYen
  }
]

export const Sheet = () => {
  const { redisData } = useRedis()

  const [isDisplay, setIsDisplay] = useState(false)
  const [attrValues, setAttrValues] = useState<AttrValue>()
  const [UV, setUV] = useState<{u: number; v: number;}>()

  useEffect(() => {
    if (redisData && redisData.length > 0) {
      // console.log(redisData[redisData.length - 1]);
      setUV({u: redisData[redisData.length - 1].u, v: redisData[redisData.length - 1].v})
      setAttrValues(redisData[redisData.length - 1].attr_value)
    }
    console.log(UV);
    
  }, [redisData])

  return (
    <div
      onClick={(e) => { e.preventDefault(); e.stopPropagation() }}
      className="absolute top-0 right-0 z-50 h-full flex items-center rounded-r-2xl overflow-x-hidden bg-[#6F6F6FCC] backdrop-blur transition-all ease-in-out"
      style={{
        width: isDisplay ? '35vw' : '3vw',
        transitionDuration: isDisplay ? "700ms" : "600ms",
        animationDuration: isDisplay ? "700ms" : "600ms"
      }}
    >
      <Button onClick={() => setIsDisplay(!isDisplay)} variant="ghost" className="hover:bg-transparent">
        <ChevronLeft className="transition-all duration-500 text-white" style={{ rotate: isDisplay ? '180deg' : '' }} />
      </Button>
      {
        isDisplay && (
          <div className="flex flex-col text-white">
            <div className="w-64 px-3 py-1 mb-5 text-lg font-semibold bg-gradient-to-r from-[#3B3630]/30 to-[#5E5840]/30">CURRENT AGENT INFO</div>
            <div className="w-[30vw] h-[30vh] p-2 px-3 bg-[#1F1F1FB2] rounded-3xl">
              <div className="mt-2 mb-4 pl-4 mx-auto text-3xl font-semibold" style={{ letterSpacing: '0.625rem' }}>李白</div>
              {/* <div className="w-[50%] p-1 mx-auto text-lg text-center font-semibold bg-[#5E5840]/90">{redisData.length ? redisData[0].name : ""}</div> */}
              <div className="flex flex-col gap-y-2 pl-8">
                {infos.map(info => (
                  <div className="flex justify-between items-center gap-x-2" key={info.label}>
                    <div className="flex items-center gap-x-2 w-36">
                      <info.icon className="w-8 h-8" />
                      <span className="text-lg font-semibold">{info.label}</span>
                    </div>
                    <Progress value={attrValues![info.label]} className="transition-all duration-200" />
                    <span className="w-6 text-lg font-semibold">{attrValues![info.label]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-52 px-3 py-1 my-5 text-lg font-semibold bg-gradient-to-r from-[#3B3630]/30 to-[#5E5840]/30">UV ANALYSIS</div>
            <div className="flex justify-between items-center px-6 w-[30vw] h-[34vh] bg-[#1F1F1FB2] rounded-3xl">
              <>
                <div className="flex flex-col items-center">
                  <p className="text-xl indent-3 tracking-wider">Equilibrium State</p>
                  <div className="flex items-center gap-x-1 w-60">
                    <div className="w-4 h-4 rounded-full bg-[#F1B163]" />
                    <span className="text-sm">U: Social Conformity</span>
                  </div>
                  <div className="flex items-center gap-x-1 w-60">
                  <div className="w-4 h-4 rounded-full bg-[#2B83F6]" />
                    <span className="text-sm">V: Individual Integrity</span>
                  </div>
                  <div className="relative w-4 h-40 border-2 border-[#B0B0B0]">
                    <div 
                      className="absolute bottom-0 w-full bg-red-400"
                      style={{
                        height: `${(UV!.u + UV!.v)/2}%`
                      }}
                    >
                      <div className="absolute top-[50%] left-5 w-28">
                        {
                          UV!.u > UV!.v ? 'U > V' : 'U < V'
                        }
                      </div>
                      <div 
                        className="absolute top-0 w-full bg-[#2B83F6]"
                        style={{
                          height: `${UV!.v/(UV!.u + UV!.v)*100}%`
                        }}
                      />
                      
                      <div
                        className="absolute bottom-0 w-full bg-[#F1B163]"
                        style={{
                          height: `${UV!.u/(UV!.u + UV!.v)*100}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </>
              <div className="flex flex-col justify-center items-center relative h-full">
                <p className="text-xl indent-3 tracking-wider">UV Energy</p>
                <RoseGraph isDisplay />
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}
