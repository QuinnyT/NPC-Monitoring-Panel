import { ChevronRight, Heart, Award, Users2, ShieldCheck, BadgeJapaneseYen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"


export const Sheet = () => {
  return (
    <div className="absolute top-0 right-0 w-[35vw] h-full flex items-center bg-white/10 backdrop-blur">
      <Button variant="ghost" className="hover:bg-transparent">
        <ChevronRight />
      </Button>
      <div className="flex flex-col">
        <div className="w-64 px-3 py-1 mb-5 text-lg font-semibold bg-gradient-to-r from-[#3B3630]/30 to-[#5E5840]/30">CURRENT AGENT INFO</div>
        <div className="w-[30vw] h-[30vh] p-2 bg-[#1F1F1F]">
          <div className="w-[50%] p-1 mx-auto text-lg text-center font-semibold bg-[#5E5840]/90">李 白</div>
          <div className="flex flex-col gap-y-2">
            <div className="flex justify-between items-center gap-x-2">
              <div className="flex items-center gap-x-2 w-36">
                <Award className="w-8 h-8" />
                <span className="text-lg font-semibold">Honor</span>
              </div>
              <Progress value={35} />
              <span className="text-lg font-semibold">35</span>
            </div>
            <div className="flex justify-between items-center gap-x-2">
              <div className="flex items-center gap-x-2 w-36">
                <Heart className="w-8 h-8" />
                <span className="text-lg font-semibold">Intimacy</span>
              </div>
              <Progress value={0} />
              <span className="text-lg font-semibold">10</span>
            </div>
            <div className="flex justify-between items-center gap-x-2">
              <div className="flex items-center gap-x-2 w-36">
                <Users2 className="w-8 h-8" />
                <span className="text-lg font-semibold">Social</span>
              </div>
              <Progress value={10} />
              <span className="text-lg font-semibold">10</span>
            </div>
            <div className="flex justify-between items-center gap-x-2">
              <div className="flex items-center gap-x-2 w-36">
                <ShieldCheck className="w-8 h-8" />
                <span className="text-lg font-semibold">Belonging</span>
              </div>
              <Progress value={80} />
              <span className="text-lg font-semibold">80</span>
            </div>
            <div className="flex justify-between items-center gap-x-1">
              <div className="flex items-center gap-x-2 w-36">
                <BadgeJapaneseYen className="w-8 h-8" />
                <span className="text-lg font-semibold">Survival</span>
              </div>
              <Progress value={60} />
              <span className="text-lg font-semibold">60</span>
            </div>
          </div>
        </div>
        <div className="w-52 px-3 py-1 my-5 text-lg font-semibold bg-gradient-to-r from-[#3B3630]/30 to-[#5E5840]/30">UV ANALYSIS</div>
        <div className="w-[30vw] h-[30vh] bg-[#1F1F1F]"></div>
      </div>
    </div>
  )
}