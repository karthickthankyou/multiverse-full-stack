import { StoriesQuery, StoryQuery } from '@multiverse-org/network/src/generated'
import Link from 'next/link'
import Image from 'next/image'

export interface IMyStoryCardProps {
  story: StoriesQuery['stories'][0]
}

export const MyStoryCard = ({ story }: IMyStoryCardProps) => {
  return (
    <div key={story.id} className="space-y-2">
      <Image
        src={story.image}
        alt=""
        width={200}
        height={200}
        className="w-full aspect-square"
      />
      <div className="text-lg">{story.title}</div>
      <Link
        className="text-xs underline underline-offset-4 text-gray"
        href={`/connect-nodes?storyId=${story.id}`}
      >
        Modify
      </Link>
    </div>
  )
}
