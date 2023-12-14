import { useMode } from "@/hooks/use-mode"
import { cn } from "@/lib/utils"

export default function ModePage() {
  const { mode, setMode } = useMode()

  const handleClick = (mode: 'SMOOTH' | 'UV') => {
    setMode(mode)
  }

  return (
    <div className="relative -top-16 flex gap-x-16">
      <div>
        <p className="text-xl mb-6">流畅游玩模式</p>
        <div
          onClick={() => handleClick('SMOOTH')}
          className={cn("relative w-[484px] h-[575px] rounded-[40px] bg-no-repeat bg-center bg-cover", mode === 'SMOOTH' && 'border-[3px] border-[#45CEE3]')}
          style={{
            backgroundImage: `url("/UI_smooth-mode.png")`
          }}
        >
          <p className="absolute bottom-16 px-7 text-lg">流畅游玩模式适合环境新手使用，它能够更快速地带领您了解整个武昌城的环境和背景。</p>
        </div>
      </div>
      <div>
        <p className="text-xl mb-6">深度 UV 模式</p>
        <div
          onClick={() => handleClick('UV')}
          className={cn("relative w-[484px] h-[575px] rounded-[40px] bg-no-repeat bg-center bg-cover", mode === 'UV' && 'border-[3px] border-[#45CEE3]')}
          style={{
            backgroundImage: `url("/UI_uv-mode.png")`
          }}
        >
          <p className="absolute bottom-12 px-7 text-lg">深度 UV 模式适用于想要对人物进行深度观察的玩家，它能够帮助您深入了解每个人物的状态和特点。</p>
        </div>
      </div>
    </div>
  )
}