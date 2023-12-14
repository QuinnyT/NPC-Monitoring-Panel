import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog"
import { Loader2 } from "lucide-react"

export default function CityPage() {
  const navigate = useNavigate()
  useEffect(() => {
    const timer = setTimeout(() => navigate('/ue'), 1000)
    return () => clearTimeout(timer)
  })

  return (
    <AlertDialog open>
      <AlertDialogContent className="p-16 flex flex-col justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin" />
        <AlertDialogDescription>
          Please wait a story rendition is being generated(60s)
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>

  )
}