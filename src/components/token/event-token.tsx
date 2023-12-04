"use client"

import { Event } from "@/interfaces/event.interface"
import EventTokenSrc from "@/../public/images/event-token.png"
import Copy from "@/../public/images/copy.svg"
import Download from "@/../public/images/download.svg"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import * as htmlToImage from "html-to-image"
import QRCodeContainer from "../qrcode-container"
import { BASE_URL } from "@/constants"
import { Language } from "@/utils/language"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const EventToken = ({ event, isHost }: { event: any; isHost?: boolean }) => {
  const { data: eventData } = useSWR(
    event.eventId ? `${BASE_URL}/api/events/${event.eventId}` : null,
    fetcher
  )
  if (eventData !== undefined && !eventData?.error) {
    event = eventData
  }

  let claimUrl = `${BASE_URL}/event/${event.uid}`
  const lang = Language()
  const [isCopied, setIsCopied] = useState(false)
  const copyUrl = () => {
    setIsCopied(true)
    navigator.clipboard.writeText(claimUrl)
    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  const downloadQR = (name: string) => {
    const svg = document.getElementById("qrcode")
    if (svg === null) return

    const a = document.createElement("a")
    const e = new MouseEvent("click")
    a.download = `${name}.png`
    htmlToImage.toPng(svg).then(function (dataUrl) {
      a.href = dataUrl
      a.dispatchEvent(e)
    })
  }

  return (
    <div className="m-8 border bg-white px-4 py-1 text-left">
      <Link href={``}>
        <Image className="mx-auto" src={EventTokenSrc} alt="" width={200} height={200} />
      </Link>
      <div className="">{event.name}</div>
      <div className="">
        {lang.eventInfo.total} {event.editions}
      </div>
      <div className="mb-4">
        {lang.eventInfo.participants} {event.participantsCount}
      </div>
      {isHost && (
        <>
          <div className="border-2"></div>
          <div className="mx-auto my-4 h-32 w-32">
            <QRCodeContainer href={""} margin={false} customClass="m-1 xl:m-2" />
          </div>

          <button onClick={copyUrl} className="relative my-3 flex flex-row items-center gap-4">
            <div className="h-6 w-6">
              <Image src={Copy} alt="COPY" />
            </div>
            <div>{lang.eventInfo.copy}</div>
            {isCopied && (
              <div className="bg-secondary absolute right-[-80%] animate-pulse whitespace-nowrap rounded-md bg-primary px-2 text-sm text-white">
                {`- copied -`}
              </div>
            )}
          </button>

          <div className="my-3 flex w-full flex-row items-center gap-4">
            <div className="h-6 w-6">
              <Image src={Download} alt="DOWNLOAD" />
            </div>
            <button className="" onClick={(e) => downloadQR("qrcode")}>
              {lang.eventInfo.qrcodeDownload}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
export default EventToken
