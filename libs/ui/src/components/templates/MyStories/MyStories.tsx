import { useUserStore } from '@multiverse-org/store/user'
import { Loader } from '../../molecules/Loader'
import { AlertSection } from '../../organisms/AlertSection'
import Link from 'next/link'
import { MyStoriesList } from '../MyStoriesList'

export interface IMyStoriesProps {}

export const MyStories = ({}: IMyStoriesProps) => {
  const { uid, loaded } = useUserStore()
  console.log(uid, loaded)
  if (!loaded) {
    return <Loader />
  }
  if (!uid) {
    return (
      <AlertSection>
        <div>You have to be logged in.</div>
        <Link
          href="/login"
          className="font-semibold underline underline-offset-4"
        >
          Login
        </Link>
      </AlertSection>
    )
  }
  return (
    <div>
      <MyStoriesList />
    </div>
  )
}
