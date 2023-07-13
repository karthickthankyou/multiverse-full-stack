import { Inter } from 'next/font/google'
import { MyStories } from '@multiverse-org/ui/src/components/templates/MyStories'
import { Container } from '@multiverse-org/ui/src/components/atoms/Container'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={` ${inter.className}`}>
      <Container>
        <MyStories />
      </Container>
    </main>
  )
}
