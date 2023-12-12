import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useCharacter } from "@/hooks/use-character";

import { FileEdit, RotateCcw, SaveAll } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useModal } from "@/hooks/use-modal";


export default function IntroPage() {
  const { characterList, currentCharacter } = useCharacter()
  const {isEditing, setIsEditing} = useModal()
  const [text, setText] = useState<string>(characterList[currentCharacter].text)
  const [prevText, setPreText] = useState<string>(text)

  useEffect(() => {
    setIsEditing(false)
    setText(characterList[currentCharacter].text)
  }, [characterList, currentCharacter, setIsEditing])

  return (
    <div>
      <p className="text-xl mb-4">诗人基本信息</p>
      <div className="min-h-40 bg-card rounded-lg p-6">
        <p>
          {characterList[currentCharacter].info}
        </p>
      </div>
      <p className="text-xl my-4">诗人性格</p>
      <div className="relative bg-card rounded-lg p-6">
        <Textarea
          onChange={(e) => setText(e.target.value)}
          disabled={!isEditing}
          value={text}
        />
        <div
          className={
            cn(
              "absolute bottom-2 right-8 w-8 h-7 flex justify-center items-center border-2 border-[#707070] rounded-xl",
              isEditing && 'w-16 justify-evenly'
            )}
        >
          {!isEditing ? (
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    onClick={() => {
                      setPreText(text)
                      setIsEditing(true)
                    }}
                    variant="ghost"
                    size="icon"
                    className="hover:bg-transparent"
                  >
                    <FileEdit className="w-4 h-4 hover:rotate-12 transition" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>编辑诗人性格</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <>
              <AlertDialog>
                <AlertDialogTrigger>
                  <TooltipProvider delayDuration={200}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover:bg-transparent">
                          <RotateCcw
                            className="w-4 h-4 hover:rotate-12 transition"
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>撤销</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </AlertDialogTrigger>
                <AlertDialogContent className="h-48 gap-20">
                  <AlertDialogHeader>
                    <AlertDialogTitle>已编辑的内容将会丢失，是否确定撤销编辑？</AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="">取消</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        setText(prevText)
                        setIsEditing(false)
                      }}
                    >确定</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Separator orientation="vertical" className="w-0.5 h-4 bg-[#707070]" />
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger>
                    <Button variant="ghost" size="icon" className="hover:bg-transparent">
                      <SaveAll onClick={() => setIsEditing(false)} className="w-4 h-4 hover:rotate-12 transition " />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>保存</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}
        </div>
      </div>
    </div>
  )
}