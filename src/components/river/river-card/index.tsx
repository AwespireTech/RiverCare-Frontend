import { River } from "@/interfaces/river.interface"
import Button from "../../button"
import RiverInfo from "../river-info"
import Image from "next/image"
import StewardshipTokenSrc from "@/../public/images/stewardship-token.png"

const RiverCard = ({ river }: { river: River }) => {
  return (
    <div className="mx-auto my-2 border bg-white p-4 font-monda">
      {/* <Image
        className="mx-auto"
        src={StewardshipTokenSrc}
        alt={river.name}
        width={100}
        height={100}
      /> */}
      <div className="mx-4 mt-4 text-left font-bold">{river.name}</div>
      <RiverInfo
        createdTime={river.createdTime}
        gen={river.gen}
        status={river.status}
        // ownersCount={river.stewardsCount}
      />
      <div className="mb-6 mt-2">
        <Button href={`/river/${river.id}`}>View</Button>
      </div>
    </div>
  )
}
export default RiverCard
