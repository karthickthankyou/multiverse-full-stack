import { useStoriesQuery } from '@multiverse-org/network/src/gql/generated'
import { ShowData } from '../../organisms/ShowData'
import { useTakeSkip } from '@multiverse-org/hooks'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useDebouncedValue } from '@multiverse-org/hooks/src/async'

export interface ISearchStoriesProps {}

export const SearchStories = ({}: ISearchStoriesProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 300)
  const { data, loading } = useStoriesQuery({
    variables: { where: { title: { contains: debouncedSearchTerm } } },
  })
  const { setSkip, setTake, skip, take } = useTakeSkip()
  return (
    <div>
      <div className="flex justify-center my-4">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search stories"
          className="w-full max-w-xl p-4 border rounded-full shadow-xl"
        />
      </div>
      <ShowData
        loading={loading}
        pagination={{
          resultCount: data?.stories.length,
          totalCount: data?.storiesCount.count,
          setSkip,
          setTake,
          skip,
          take,
        }}
        title={undefined}
      >
        {data?.stories.map((story) => (
          <Link
            href={{ pathname: 'play', query: { storyId: story.id } }}
            key={story.id}
          >
            <Image
              className="object-cover w-full h-full"
              width={200}
              height={200}
              src={story.image}
              alt=""
            />
            <div>{story.title}</div>
          </Link>
        ))}
      </ShowData>
    </div>
  )
}