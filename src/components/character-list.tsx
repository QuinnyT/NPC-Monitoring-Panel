import { cn } from "@/lib/utils";
import { useCharacter } from "@/hooks/use-character";
import { Avatar, AvatarImage } from "@/components/ui/avatar"

export const CharacterList = () => {
  const { characterList, currentCharacter, setCurrentCharacter } = useCharacter()
  return (
    <div className="absolute top-28 w-full flex gap-x-4 pl-[28rem]">
      {characterList.map((character, index) => (
        <Avatar
          key={character.name}
          onClick={() => setCurrentCharacter(index)}
          className={cn("w-16 h-16 border-4", index === currentCharacter ? "border-[#45cee3]" : "border-white")}
        >
          <AvatarImage src={character.avatar} />
        </Avatar>
      ))}
    </div>
  )
}