import Head from 'next/head'
import { UserStories } from '@multiverse-org/ui/src/components/templates/UserStories'
import { UserStoryType } from '@multiverse-org/network/src/gql/generated'
import { Container } from '@multiverse-org/ui/src/components/atoms/Container'

export default function WishlistPage() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <UserStories type={UserStoryType.Wishlisted} />
        </Container>
      </main>
    </>
  )
}
