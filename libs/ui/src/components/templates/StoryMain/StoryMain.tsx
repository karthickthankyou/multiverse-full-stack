import {
  UserStoryType,
  useStoryQuery,
} from '@multiverse-org/network/src/gql/generated'
import Link from 'next/link'
import { PlayStory } from '../PlayStory'
import { StickyLayout } from '../../organisms/StickyLayout'
import { LoaderPanel } from '../../molecules/Loader'
import { StoryDescription } from '../../organisms/StoryDescription'
import { AlertSection } from '../../organisms/AlertSection'
import { UnPurchasedStory } from '../../organisms/UnPurchasedStory'

export interface IStoryMainProps {
  storyId: number
}

export const StoryMain = ({ storyId }: IStoryMainProps) => {
  const { data, loading } = useStoryQuery({
    variables: { where: { id: storyId } },
  })

  if (loading) return <LoaderPanel />
  if (!data?.story) {
    return <AlertSection>Something went wrong.</AlertSection>
  }
  return (
    <div>
      <StickyLayout
        classes={{ sidebarWidth: 'md:max-w-sm' }}
        sidebarContent={<StoryDescription story={data?.story} />}
      >
        {data.story.userStory?.type === UserStoryType.Purchased ? (
          <PlayStory story={data.story} />
        ) : data.story.userStory?.type === UserStoryType.InCart ? (
          <Link
            className="mt-2 font-semibold underline underline-offset-4"
            href="/cart"
          >
            Go to cart
          </Link>
        ) : (
          <UnPurchasedStory story={data.story} />
        )}
      </StickyLayout>
    </div>
  )
}
