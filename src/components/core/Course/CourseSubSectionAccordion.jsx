import React, { useEffect, useRef, useState } from "react"
import { AiOutlineDown } from "react-icons/ai"
import { HiOutlineVideoCamera } from "react-icons/hi"

function CourseSubSectionAccordion({ subSec }) {
  return (
    <div>
      <div className="flex justify-between py-2">
        <div className={`flex items-center gap-2 cursor-pointer`}>
          <span>
            <HiOutlineVideoCamera />
          </span>
          <p>{subSec?.subSectionName}</p>
        </div>
      </div>
    </div>
  )
}

export default CourseSubSectionAccordion