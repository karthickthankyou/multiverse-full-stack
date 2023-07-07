import { StoryQuery } from '@multiverse-org/network/src/gql/generated'
import Image from 'next/image'

export interface IStoryDescriptionProps {
  story?: StoryQuery['story']
}

export const StoryDescription = ({ story }: IStoryDescriptionProps) => {
  if (!story) return null
  return (
    <div>
      {story.image ? (
        <Image
          className="object-cover w-64 h-64 shadow-xl"
          width={200}
          height={200}
          src={story.image || ''}
          alt=""
        />
      ) : null}
      <div className="mt-1 text-xl font-light">{story.title}</div>
      <div className="mt-2 text-sm text-gray">{story.description}</div>
    </div>
  )
}
