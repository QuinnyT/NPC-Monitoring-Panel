import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, Heart, Award, Users2, ShieldCheck, BadgeJapaneseYen, LucideIcon } from "lucide-react"
import { api } from "@/lib/api"

type Info = {
  label: string,
  icon: LucideIcon,
  value: number
}
type Value = {
  Survival: number;
  Belonging: number;
  Social: number;
  Intimacy: number;
  Honor: number;
  [key: string]: number;
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

export const Sheet = () => {
  const [isDisplay, setIsDisplay] = useState(false)
  const [attrValues, setAttrValues] = useState<Value>({
    "Honor": 0,
    "Intimacy": 0,
    "Social": 10,
    "Belonging": 30,
    "Survival": 30,
  })

  useEffect(() => {
    setAttrValues(api().attr_value)
  }, [])


  return (
    <div
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
            <div className="w-[30vw] h-[30vh] p-2 bg-[#1F1F1F]">
              <div className="w-[50%] p-1 mx-auto text-lg text-center font-semibold bg-[#5E5840]/90">李 白</div>
              <div className="flex flex-col gap-y-2">
                {infos.map(info => (
                  <div className="flex justify-between items-center gap-x-2">
                    <div className="flex items-center gap-x-2 w-36">
                      <info.icon className="w-8 h-8" />
                      <span className="text-lg font-semibold">{info.label}</span>
                    </div>
                    <Progress value={attrValues[info.label]} />
                    <span className=" w-6 text-lg font-semibold">{attrValues[info.label]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-52 px-3 py-1 my-5 text-lg font-semibold bg-gradient-to-r from-[#3B3630]/30 to-[#5E5840]/30">UV ANALYSIS</div>
            <div className="w-[30vw] h-[30vh] bg-[#1F1F1F]"></div>
          </div>
        )
      }
    </div>
  )
}


