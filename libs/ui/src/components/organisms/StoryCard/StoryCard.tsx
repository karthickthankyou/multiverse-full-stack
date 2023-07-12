import { StoriesQuery } from '@multiverse-org/network/src/gql/generated'
import Image from 'next/image'
import Link from 'next/link'

import { PriceCard } from '../PriceCard'
import { UserActions } from '../UserActions'

export interface IStoryCardProps {
  story: StoriesQuery['stories'][0]
  uid?: string
}

export const StoryCard = ({ story, uid }: IStoryCardProps) => {
  return (
    <div>
      <Link
        href={{ pathname: 'play', query: { storyId: story.id } }}
        key={story.id}
      >
        <Image
          className="object-cover w-full border-2 border-white shadow-lg rounded-xl h-96"
          width={200}
          height={200}
          src={story.image}
          alt=""
        />
      </Link>
      <div className="mt-2">
        <div className="font-semibold">{story.title}</div>
        <PriceCard price={story.price} />
        <UserActions story={story} uid={uid} />
      </div>
    </div>
  )
}
