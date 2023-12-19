import { useState } from 'react'
import { characterList, categories } from './character'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from "@/components/ui/scroll-area"

const colors = [
  "#77333D",
  "#9E4540",
  "#B57C56",
  "#C28867",
  "#75866B",
  "#647D6D",
  "#3E6666",
  "#3E5A73",
  "#335D6E",
  "#496969",
  "#465F66",
  "#565080",
  "#5C4E7F",
  "#834C61",
  "#91384E",
  "#B95B47",
  "#D29C6D",
  "#6C7E6F",
  "#4E7274",
  "#45596D",
  "#6B5E88",
  "#9F5179",
  "#C55C6E",
  "#D28F8F",
  "#799271",
  "#3C6668",
  "#336181",
  "#5A508C",
  "#8B6B9D",
  "#AF6887",
  "#CD9A99",
  "#74877C",
  "#4C6473",
  "#3E4D5E",
  "#685C7F",
  "#8D4E77",
  "#AA6F73",
  "#CF7F8E",
  "#B14E4E",
  "#BD7354",
  "#A37B61",
  "#748A6D",
  "#5C8A80",
  "#57778F"
]

export default function CardPage() {
  const [isDisplayAll, setIsDisPlayAll] = useState(true)
  const [characterArray, setCharacterArray] = useState(characterList.flat())
  const [bgColor, setBgColor] = useState('')

  // 当使用 characterList.flat() 来遍历时可以用以下函数算出背景颜色
  // const getColor = (name: string[]) => {
  //   const index = nameList[name[0]]
  //   let color = ''
  //   categories.some((categorie, i) => {
  //     if (roleList[index].includes(categorie)) {
  //       console.log(colors[i], i);
  //       color = colors[i]
  //       return
  //     }
  //   })
  //   return color
  // }

  const displayAllCards = () => {
    return characterList.map((character, index) => (
      <div>
        <div className='grid grid-cols-4 gap-4 mt-6'>
          {character.map((c, i) => (
            <div
              key={i}
              className='flex flex-col gap-y-4 w-[400px] p-3 rounded-xl'
              style={{
                backgroundColor: `${colors[index]}`
              }}
            >
              <div className='flex items-center gap-x-2'>
                <Avatar>
                  <AvatarImage src={`./UI_head1.png`} />
                </Avatar>
                <p className='text-xl'>{Object.keys(c)}</p>
              </div>
              <ScrollArea className='h-12 text-sm leading-6 overflow-auto'>{Object.values(c)}</ScrollArea>
            </div>
          ))}
        </div>
      </div>
    ))
  }

  return (
    <div className='min-h-screen p-4 bg-zinc-300 text-slate-200'>
      <div className='grid grid-cols-8 gap-4 w-full'>
        <button
          onClick={() => setIsDisPlayAll(true)}
          className="flex items-center text-md md:px-4 md:py-3 rounded-md bg-slate-400 hover:opacity-75 transition"
        >
          all
        </button>
        {
          categories.map((category, index) => (
            <button
              onClick={() => {
                setIsDisPlayAll(false)
                setCharacterArray(characterList[index])
                setBgColor(colors[index])
              }}
              className="flex items-center text-md md:px-4 md:py-3 rounded-md hover:opacity-75 transition"
              style={{
                backgroundColor: `${colors[index]}`,
              }}
            >
              {category}
            </button>
          ))
        }
      </div>
      {isDisplayAll ?
        displayAllCards() :
        <div className='grid grid-cols-4 gap-4 mt-6'>
          {characterArray.map((c, i) => (
            <div
              key={i}
              className='flex flex-col gap-y-4 w-[400px] p-3 rounded-xl'
              style={{
                backgroundColor: `${bgColor}`
              }}
            >
              <div className='flex items-center gap-x-2'>
                <Avatar>
                  <AvatarImage src={`./UI_head1.png`} />
                </Avatar>
                <p className='text-xl'>{Object.keys(c)}</p>
              </div>
              <ScrollArea className='h-12 text-sm leading-6 overflow-auto'>{Object.values(c)}</ScrollArea>
            </div>
          ))}
        </div>
      }
    </div>
  )
}

