import { PixelStreamingWrapper } from "@/pages/ue/components/pixel-streaming-wrapper";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { createBWYInstanceApi, createUEInstanceApi } from '@/lib/api';
import { useNavigate } from "react-router-dom"

export default function UEPage() {
  const destroy =  useCallback(async () => {
    const data2 = await createUEInstanceApi({ msg: 'destroy' })
    console.log("data2", data2);
    const data1 = await createBWYInstanceApi({ msg: 'destroy' })
    console.log("data1", data1);
  }, [])

  const navigate = useNavigate();

  function handleBakeHome () {
    destroy();
    navigate('/');
  }

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
            HoveringMouse: false,
            WaitForStreamer: true,
          }}
        />
      </div>
      <Button className="w-44 h-14 text-lg font-semibold" onClick={handleBakeHome}>返回首页</Button>
    </div>
  )
}