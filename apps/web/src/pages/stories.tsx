import Head from 'next/head'
import { MyStories } from '@multiverse-org/ui/src/components/templates/MyStories'

export default function MyStoriesPage() {
  return (
    <>
      <Head>
        <title>My Stories</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <MyStories />
      </main>
    </>
  )
}
