import { useCharacter } from "@/hooks/use-character"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function RelationPage() {
  const { characterList, currentCharacter } = useCharacter()
  const character = characterList[currentCharacter]
  const { length } = character.relateCharacter

  return (
    <div>
      <p className="text-xl">{character.name} 的关系网</p>
      <div className="relative left-20 top-4 flex justify-center pr-96 text-sm">
        {
          character.relateCharacter.map((data, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div
                  className="absolute flex flex-col justify-center items-center gap-y-3 origin-bottom"
                  style={{
                    rotate: `${index * (360 / length)}deg`
                  }}
                >
                  <div className="relative" style={{ rotate: `-${index * (360 / length)}deg` }}>
                    <Avatar className="w-12 h-12 border-4 border-white" >
                      <AvatarImage src={data.avatar} />
                    </Avatar>
                    <p className="mt-1 text-center whitespace-nowrap">{data.name}</p>
                  </div>
                  <Separator orientation="vertical" className="relative h-28">
                    <div className="absolute left-2" style={{ rotate: (index * (360 / length) > 90 && index * (360 / length) < 270) ? '180deg' : '' }}>
                      {data.relationship}
                    </div>
                  </Separator>
                </div>
              </DialogTrigger>
              <DialogContent className="w-[50vw] bg-card border-none">
                <DialogHeader className="flex flex-row justify-around items-center mb-4">
                  <div className="w-[200px] p-2 flex items-center gap-x-3 bg-[#535353] rounded-3xl">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={character.avatar} />
                    </Avatar>
                    {character.name}
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="81" height="16" viewBox="0 0 81 16" fill="none">
                    <path opacity="0.4" d="M80.7071 8.70711C81.0976 8.31658 81.0976 7.68342 80.7071 7.29289L74.3431 0.928932C73.9526 0.538408 73.3195 0.538408 72.9289 0.928932C72.5384 1.31946 72.5384 1.95262 72.9289 2.34315L78.5858 8L72.9289 13.6569C72.5384 14.0474 72.5384 14.6805 72.9289 15.0711C73.3195 15.4616 73.9526 15.4616 74.3431 15.0711L80.7071 8.70711ZM0 9H80V7H0V9Z" fill="white" />
                  </svg>
                  <div className="w-[200px] p-2 flex items-center gap-x-3 bg-[#535353] rounded-3xl">
                    <Avatar className="w-10 h-10" >
                      <AvatarImage src={data.avatar} />
                    </Avatar>
                    {data.name}
                  </div>
                </DialogHeader>
                <p>人物间关系</p>
                <div className="w-full p-3 bg-[#535353] rounded-xl mb-4">
                  <p>{data.relationship}</p>
                </div>
                <p>关系描述</p>
                <div className="w-full p-3 bg-[#535353] rounded-xl mb-4">
                  <p>{data.desc}</p>
                </div>
                <DialogClose className="mx-auto">
                  <Button className="bg-card w-36" variant="outline">关闭</Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          ))
        }
        <div className="absolute top-[11rem] z-10 flex flex-col justify-center items-center">
          <Avatar className="w-12 h-12 border-4 border-white" >
            <AvatarImage src={character.avatar} />
          </Avatar>
        </div>
      </div>
    </div>
  )
}