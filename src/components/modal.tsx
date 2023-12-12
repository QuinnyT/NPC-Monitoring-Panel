import { useModal } from "@/hooks/use-modal"
import { useNavigate } from "react-router-dom"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export const Modal = () => {
  const { link, isOpen, setIsOpen, setIsEditing } = useModal()
  const navigate = useNavigate()

  const handleCancel = () => {
    setIsOpen()
  }

  const handleAction = () => {
    console.log(link);
    setIsEditing(false)
    setIsOpen()
    navigate(link)
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>确定切换吗？当前仍有修改的内容未保存，切换页面将丢失所有未保存内容。</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>取消</AlertDialogCancel>
          <AlertDialogAction onClick={handleAction}>确定</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}