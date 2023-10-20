"use client"

import { useState } from "react"
import { FlipArrow } from "./flip-arrow"
import { Language } from "@/utils/language"

const Dropdown = ({
  type,
  onChange,
  currRoute
}: {
  type: string
  onChange: any
  currRoute?: string
}) => {
  const lang = Language()
  let options =
    type === "sorting" ? lang.sortMethod : type === "myPage" ? lang.myPage : lang.riverNav

  let defaultInd = options.findIndex((item) => item.route === currRoute)
  if (defaultInd === -1) defaultInd = 0

  const [showMenu, setShowMenu] = useState(false)
  const [ind, setInd] = useState<number>(defaultInd)

  return (
    <div
      className="mx-auto my-4 flex w-full flex-col font-bold"
      onClick={(e) => setShowMenu(!showMenu)}
    >
      <div className="mx-auto flex w-3/4 max-w-[300px] items-center justify-between border px-2 py-1">
        <div>{options[ind].option}</div>
        <FlipArrow opened={showMenu} />
      </div>
      <div
        className={`${
          !showMenu && "hidden"
        } mx-auto flex w-3/4 max-w-[300px] flex-col bg-gray px-2 py-2 transition`}
      >
        {options.map((item, i) => (
          <button
            key={i}
            className="text-left hover:underline"
            onClick={(e) => {
              setInd(i)
              onChange(item)
            }}
          >
            {options[i].option}
          </button>
        ))}
      </div>
    </div>
  )
}
export default Dropdown
