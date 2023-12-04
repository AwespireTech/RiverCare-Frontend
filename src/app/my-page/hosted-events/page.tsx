"use client"

import ConnectHint from "@/components/connect-hint"
import Dropdown from "@/components/dropdown"
import EventToken from "@/components/token/event-token"
import { BASE_URL } from "@/constants"
import { Context } from "@/context"
import { Event } from "@/interfaces/event.interface"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function HostedEvents({ params }: { params: { wallet: string } }) {
  let events: Event[] | null = null

  const { address } = useContext(Context)

  const { data: eventData } = useSWR(
    address ? `${BASE_URL}/api/${address}/hostedEvents` : null,
    fetcher
  )
  if (eventData !== undefined && !eventData?.error) {
    events = eventData
  }

  const router = useRouter()

  const navigate = (item: { route: string }) => {
    router.push(`/my-page/${item.route}`)
  }

  if (!address?.startsWith("tz")) return <ConnectHint />
  return (
    <>
      <Dropdown type="myPage" onChange={navigate} currRoute={"hosted-events"} />
      <main className="m-4 w-auto border bg-white text-left font-monda">
        {events &&
          events.length > 0 &&
          events.map((event: Event, i) => <EventToken key={i} event={event} isHost={true} />)}
      </main>
    </>
  )
}
