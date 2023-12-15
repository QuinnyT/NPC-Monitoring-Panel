import { useState } from 'react'
import { cn } from '@/lib/utils'
import { character, categories } from './character'
import { ScrollArea } from "@/components/ui/scroll-area"

export default function CardPage() {
  const [characterArray, setCharacterArray] = useState(character.flat())

  return (
    <div className='p-4'>
      <div className='grid grid-cols-8 gap-4 w-full'>
        <button
          onClick={() => setCharacterArray(character.flat())}
          className={cn(
            `flex items-center text-center text-xs px-2 md:px-4 py-2 md:py-3 rounded-md bg-primary/10 hover:opacity-75 transition`
          )}
        >
          all
        </button>
        {
          categories.map((category, index) => (
            <button
              onClick={() => setCharacterArray(character[index])}
              className={cn(
                `flex items-center text-md md:px-4 md:py-3 rounded-md bg-primary/10 hover:opacity-75 transition`

              )}
            >
              {category}
            </button>
          ))
        }
      </div>
      <div className='grid grid-cols-4 gap-4 mt-10'>
        {
          characterArray.map((c, i) => (
            <div key={i} className='flex flex-col gap-y-4 w-[400px] p-3 bg-zinc-700 rounded-xl'>
              <div className='flex items-center gap-x-2'>
                <div className='w-8 h-8 bg-card rounded-full'></div>
                <p className='text-xl'>{Object.keys(c)}</p>
              </div>
              <ScrollArea className='h-12 text-sm leading-6 overflow-auto'>{Object.values(c)}</ScrollArea>
            </div>
          ))
        }
      </div>
    </div>
  )
}
