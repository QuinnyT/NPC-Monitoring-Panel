import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div
      className="relative w-full h-screen bg-no-repeat bg-center bg-cover overflow-hidden"
      // style={{ backgroundImage: `url("/UI_bg.png")` }}
    >
      <video className='absolute top-0 left-0 min-w-full min-h-full w-auto h-auto z-0' autoPlay loop muted>
        {/* <source src="https://mbluxury1.s3.amazonaws.com/2020/09/18141509/home-video-2020.mp4" /> */}
        <source src="/video.mp4" />
      </video>
      <img src="/UI_logo.png" alt="Parametrix" className='absolute top-5 left-5' />
      <div
        className='flex flex-col items-center absolute inset-x-0 bottom-36'
        style={{ textShadow: '1px -1px 3px #000, -1px -1px 3px #000, -1px 1px 3px #000, 1px 1px 3px #000' }}
      >
        <div className='text-[6rem]'>唐朝武昌古城</div>
        <p className='text-[1.2rem]'>用 AI 技术复原唐朝武昌古城生活。通过训练 AI 智能体进行城市历史建筑模拟，展现唐朝时期武汉市的繁荣景象。</p>
        <Link to='/main'>
          <Button className='mt-4 text-[1.2rem] h-12 w-32 px-12 py-6 rounded-lg font-semibold'>
            探索古城
          </Button>
        </Link>
      </div>
    </div>
  )
}