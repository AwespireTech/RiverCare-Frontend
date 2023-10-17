import Image from "next/image"
import Button from "../button"
import { Event } from "@/interfaces/event.interface"
import Stewardship from "@/../public/images/stewardship.svg"
import Approval from "@/../public/images/approval.svg"
import Progress from "../progress"

const EventInfo = ({ event, stewardsCount }: { event: Event; stewardsCount: number }) => {
  return (
    <div className="flex flex-col justify-between">
      <div className="mx-auto p-4 pb-0 text-left">
        <div className="mb-4 mt-2 text-lg text-[#595959]">{event.description}</div>
        <div className="my-2 font-semibold">Created time: {event.createdTime}</div>
        <div className="my-2 font-semibold">Created by: {event.host}</div>
        <div className="my-2 font-semibold">Editions: {event.editions}</div>
      </div>
      <div className="p-4 pt-0 text-left">
        <div className="my-4 flex items-center text-lg text-action">
          <Image src={Stewardship} alt="" className="mr-4" width={28} />
          Participants: <span className="font-bold">&nbsp;{event.participantsCount}</span>
        </div>
        {event.participants.length > 0 && (
          <div className="my-2 max-h-[120px] overflow-y-scroll border p-4 text-xs">
            {event.participants.map((address, i) => (
              <div key={i}>{address}</div>
            ))}
          </div>
        )}
        <div className="my-4 flex items-center text-lg text-primary">
          <Image src={Approval} alt="" className="mr-4" width={28} />
          Approval rate:{" "}
          <span className="font-bold">&nbsp;{(event.approvalCount / stewardsCount) * 100}%</span>
        </div>
        <Progress value={event.approvalCount} total={stewardsCount} />
      </div>
    </div>
  )
}
export default EventInfo
