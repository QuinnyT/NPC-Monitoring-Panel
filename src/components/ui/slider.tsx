// index.jsx
import * as React from "react"
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
    React.ElementRef<typeof SliderPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, value, defaultValue, step, ...props }, ref) => (
    <SliderPrimitive.Root
        className={cn("w-44 h-1 select-none flex items-center relative", className)}
        defaultValue={defaultValue}
        orientation="horizontal"
        value={value}
        step={step}
        {...props}
        ref={ref}
    >
        <SliderPrimitive.Track className="block relative rounded-full h-full w-full bg-[#636363]">
            <SliderPrimitive.Range className="block absolute bg-white rounded-full h-full" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block w-4 h-4 bg-white rounded-full outline-none" />
    </SliderPrimitive.Root>
));

export { Slider }