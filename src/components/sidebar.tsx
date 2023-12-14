import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useModal } from "@/hooks/use-modal";
import { useMode } from "@/hooks/use-mode";
import { Separator } from "@/components/ui/separator"
import { Modal } from "@/components/modal";
import { useToast } from "@/components/ui/use-toast"

const links = [
  { to: "intro", label: "古城诗人简介" },
  { to: "relation", label: "诗人与他人关系" },
  { to: "mode", label: "选择观测模式" },
  { to: "city", label: "进入城内体验" },
]

export const Siderbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast()
  
  const { isEditing, setLink, setIsOpen } = useModal()
  const { mode } = useMode()

  const handleNavigate = (to: string) => {
    setLink(to)
    if (isEditing && to !== 'intro') {
      setIsOpen()
    } else if (to === 'city' && mode === '') {
      toast({
        title: "观测模式未选择",
        description: "请选择你想要的模式再进入体验吧。",
      })
    } else {
      navigate(to);
    }
  };

  return (
    <div>
      <Modal />
      <div className="flex flex-col pl-10">
        {links.map((link, index) => (
          <div key={link.label}>
            <div
              onClick={() => handleNavigate(link.to)}
              className="flex gap-x-3 cursor-pointer"
            >
              <div
                className={cn(
                  "rounded-full w-6 h-6 text-center",
                  location.pathname === `/main/${link.to}`
                    ? "bg-[#45cee3]"
                    : "bg-slate-500"
                )}
              >
                {index + 1}
              </div>
              <div>{link.label}</div>
            </div>
            {index < links.length - 1 && (
              <Separator orientation="vertical" className="h-16 ml-3 my-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}