import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button"
import { useModal } from "@/hooks/use-modal";
import { useMode } from "@/hooks/use-mode";

export const Footer = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname.slice(6)

  const { setLink, isEditing, setIsOpen } = useModal()
  const { mode } = useMode()

  const pages = ['intro', 'relation', 'mode', 'city'];

  const back = () => {
    const currentIndex = pages.indexOf(pathname);
    setLink('/')
    if (isEditing) {
      // 若未保存内容就跳转页面 显示弹窗
      setIsOpen()
    } else {
      if (currentIndex > 0) {
        navigate(pages[currentIndex - 1]);
      } else {
        navigate('/')
      }
    }
  };

  const next = () => {
    const currentIndex = pages.indexOf(pathname);
    setLink(pages[currentIndex + 1])
    if (isEditing) {
      // 若未保存内容就跳转页面 显示弹窗
      setIsOpen()
    } else {
      if (currentIndex < pages.length - 1) {
        navigate(pages[currentIndex + 1]);
      }
    }
  };

  const handleClick = () => { }

  return (
    <div className="w-full flex justify-between px-20 absolute bottom-10">
      <Modal />
      <div>
        <Button onClick={handleClick} className="w-52 h-12 text-base font-semibold">一键开始体验</Button>
      </div>
      <div className="flex gap-x-4">
        <Button onClick={back} variant="outline" className="w-52 h-12 text-base font-semibold">返回上一页</Button>
        {pathname !== 'city' && (
          <Button
            disabled={pathname === 'mode' && mode === ''}
            onClick={next}
            className="w-52 h-12 text-base font-semibold"
          >
            下一页
          </Button>
        )}
      </div>
    </div>
  )
}