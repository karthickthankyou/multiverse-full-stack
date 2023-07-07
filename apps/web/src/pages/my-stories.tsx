import Head from 'next/head'
import { MyStories } from '@multiverse-org/ui/src/components/templates/MyStories'
import { Container } from '@multiverse-org/ui/src/components/atoms/Container'

export default function MyStoriesPage() {
  return (
    <>
      <Head>
        <title>My Stories | Karthick Ragavendran</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <MyStories />
        </Container>
      </main>
    </>
  )
}
