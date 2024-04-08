import { Outlet, useLocation } from "react-router";
import { CharacterList } from "@/components/character-list";
import { Siderbar } from "@/components/sidebar";
import { Footer } from "@/components/footer";


export default function MainPage() {
  const location = useLocation();
  const isRender = location.pathname === '/main/intro' || location.pathname === '/main/relation'
  return (
    <div className="min-h-screen relative">
      <img src="/UI_logo.png" alt="Parametrix" className='absolute top-5 left-5 w-40' />
      {isRender && <CharacterList />}
      <div className="absolute w-96 mt-60">
        <Siderbar />
      </div>
      <main className="pl-[28rem] pt-52 w-[90vw]">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}