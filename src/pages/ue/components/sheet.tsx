import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, Heart, Award, Users2, ShieldCheck, BadgeJapaneseYen, LucideIcon } from "lucide-react"

import { AttrValue, useRedis } from "@/hooks/use-redis"
import RoseGraph from "./rose-graph"

type Info = {
  label: string,
  icon: LucideIcon,
  value: number
}


const infos: Info[] = [
  // todo: get & change value from...
  {
    label: 'Honor',
    icon: Award,
    value: 2
  },
  {
    label: 'Intimacy',
    icon: Heart,
    value: 10
  },
  {
    label: 'Social',
    icon: Users2,
    value: 40
  },
  {
    label: 'Belonging',
    icon: ShieldCheck,
    value: 78
  },
  {
    label: "Survival",
    icon: BadgeJapaneseYen,
    value: 52
  }
]

export const Sheet = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) => {
  const [isDisplay, setIsDisplay] = useState(false)

  const { redisData } = useRedis()
  const [attrValues, setAttrValues] = useState<AttrValue | { [key: string]: number }>({})
  const [UV, setUV] = useState<number>(0)
  const [index, setIndex] = useState<number>(0)

  useEffect(() => {
    if (redisData && redisData.length > 0) {
      // console.log(redisData[redisData.length - 1]);
      setUV(redisData[redisData.length - 1].uv_bar)
      setAttrValues(redisData[redisData.length - 1].attr_value)
    }
  }, [redisData])

  useEffect(() => {
    if (!UV) return
    // todo
    if (UV <= -30) {
      setIndex(0)
    } else if (UV <= -10 && UV > -30) {
      setIndex(1)
    } else if (UV <= 10 && UV > -10) {
      setIndex(2)
    } else if (UV <= 30 && UV > 10) {
      setIndex(3)
    } else {
      setIndex(4)
    }
  }, [UV])

  const color = [
    "#bfa280",
    "#ada18a",
    "#9ba194",
    "#88a09e",
    "#769fa8",
  ]

  return (
    <div
      {...props}
      className="absolute top-0 right-0 z-50 h-full flex items-center rounded-r-2xl overflow-x-hidden bg-white/10 backdrop-blur transition-all ease-in-out"
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
            <div className="w-[30vw] h-[30vh] p-2 px-6 bg-[#1F1F1F]">
              <div className="w-[50%] p-1 mx-auto text-lg text-center font-semibold bg-[#5E5840]/90">{redisData[0].name}</div>
              <div className="flex flex-col gap-y-2">
                {infos.map(info => (
                  <div className="flex justify-between items-center gap-x-2" key={info.label}>
                    <div className="flex items-center gap-x-2 w-36">
                      <info.icon className="w-8 h-8" />
                      <span className="text-lg font-semibold">{info.label}</span>
                    </div>
                    <Progress value={attrValues![info.label]} className="transition-all duration-200" />
                    <span className=" w-6 text-lg font-semibold">{attrValues![info.label]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-52 px-3 py-1 my-5 text-lg font-semibold bg-gradient-to-r from-[#3B3630]/30 to-[#5E5840]/30">UV ANALYSIS</div>
            <div className="flex justify-between items-center px-6 w-[30vw] h-[32vh] bg-[#1F1F1F]">
              <div className="flex flex-col items-center">
                <p className="text-sm indent-3 tracking-wider">(Social Conformity)</p>
                <span>U</span>
                <div className="relative bg-gradient-to-b from-[#BFA280] to-[#769FA8] w-2 h-36">
                  <div
                    className="absolute bg-transparent left-[50%] translate-x-[-50%] w-6 h-3 border-2 border-white rounded-[50%] transition-all duration-200"
                    style={{
                      top: `${(UV! + 100) / 2}%`,
                      backgroundColor: color[index!]
                    }}
                  >
                    <p
                      className="absolute -top-[11px] left-7 text-lg font-semibold"
                      style={{ color: color[index!] }}
                    >
                      {/* {index === 3 ? 'U≈V' : index! > 3 ? 'U>V' : 'U<V'} */}
                      {UV === 0 ? 'U≈V' : UV < 0 ? 'U>V' : 'U<V'}
                    </p>
                  </div>
                </div>
                <span>V</span>
                <p className="text-sm indent-3 tracking-wider">(Individual Integrity)</p>
              </div>
              <div className="flex flex-col justify-center items-center relative h-full mt-4">
                <p className="text-xl">UV Energy</p>
                <RoseGraph isDisplay />
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}