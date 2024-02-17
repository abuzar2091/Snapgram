import React from 'react'
import  { PopoverTrigger
} from "@/components/ui/popover";
function ViewButton() {
  return (
    <PopoverTrigger>
    <div className="flex flex-col ">
      <img
        src="/assets/icons/comment-regular.svg"
        width={22}
        height={22}
        className="ml-5 bg-slate-50 cursor-pointer mt-4"
      />
    </div>
  </PopoverTrigger>
  )
}

export default ViewButton