import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

import { cn } from "@/lib/utils"

const DropdownMenu = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>
>(({ ...props }) => (
  <DropdownMenuPrimitive.Root
    {...props}
  />
))
DropdownMenu.displayName = DropdownMenuPrimitive.Root.displayName

const DropdownMenuTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Trigger
  ref={ref}
  className={cn(
    className,
    "flex justify-between items-center"
  )}
  {...props}
  />
))
DropdownMenuTrigger.displayName = DropdownMenuPrimitive.Trigger.displayName

const DropdownMenuPortal = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Portal>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Portal>
>(({ ...props }) => (
  <DropdownMenuPrimitive.Portal
    {...props}
  />
))
DropdownMenuPortal.displayName = DropdownMenuPrimitive.Portal.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Content
  ref={ref}
  className={cn(
    "z-[99]",
    className
  )}
  {...props}
  // sideOffset={5}
  />
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
  ref={ref}
  className={cn(
    "flex justify-center hover:bg-black hover:text-white",
    className
  )}
  {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName




export { DropdownMenu, DropdownMenuTrigger, DropdownMenuPortal, DropdownMenuContent, DropdownMenuItem };
