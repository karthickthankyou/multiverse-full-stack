import { StoryQuery } from '@multiverse-org/network/src/generated'
import Image from 'next/image'

export interface IStoryDescriptionProps {
  story?: StoryQuery['story']
}

export const StoryDescription = ({ story }: IStoryDescriptionProps) => {
  if (!story) return null
  return (
    <div className="space-y-2">
      {story.image ? (
        <Image
          className="object-cover w-full shadow-xl aspect-square"
          width={200}
          height={200}
          src={story.image || ''}
          alt=""
        />
      ) : null}
      <div className="mt-1 text-2xl font-light">{story.title}</div>
      <div className="mt-2 text-xs text-gray">{story.description}</div>
    </div>
  )
}
