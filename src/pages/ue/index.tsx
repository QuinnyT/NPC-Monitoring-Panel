import { Sheet } from "@/components/sheet";
import { Button } from "@/components/ui/button";

export default function UEPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-y-3 p-1">
      <div className="text-white text-2xl font-semibold">点击esc退出实景操控</div>
      <div className="relative w-[85vw] h-[85vh] bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url("/ue.png")` }}>
        <Sheet></Sheet>
      </div>
      <Button className="w-44 h-14 text-lg font-semibold">返回首页</Button>
    </div>
  )
}