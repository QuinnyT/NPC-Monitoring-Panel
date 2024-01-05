import { PixelStreamingWrapper } from "@/pages/ue/components/pixel-streaming-wrapper";
import { Button } from "@/components/ui/button";

export default function UEPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-y-3 p-1 bg-black overflow-hidden">
      {/* <div className="text-white text-2xl font-semibold">
        点击esc退出实景操控
      </div> */}
      <div className="relative w-[85vw] h-[85vh] rounded-2xl bg-no-repeat bg-center bg-cover">
        <PixelStreamingWrapper
          initialSettings={{
            AutoPlayVideo: true,
            AutoConnect: false,
            ss: "ws://10.225.0.120:80",
            StartVideoMuted: true,
            HoveringMouse: true,
            WaitForStreamer: true,
          }}
        />
      </div>
      <Button className="w-44 h-14 text-lg font-semibold">返回首页</Button>
    </div>
  )
}