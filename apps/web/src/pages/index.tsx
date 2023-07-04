import { Inter } from 'next/font/google'
import { SearchStories } from '@multiverse-org/ui/src/components/templates/SearchStories'
import { Container } from '@multiverse-org/ui/src/components/atoms/Container'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={` ${inter.className}`}>
      <Container>
        <SearchStories />
      </Container>
    </main>
  )
}
