import { Inter } from 'next/font/google'
import { SearchStories } from '@multiverse-org/ui/src/components/templates/SearchStories'
import { Container } from '@multiverse-org/ui/src/components/atoms/Container'
import { LifeScene } from '@multiverse-org/3d/src/scenes/LifeScene'
import { Button } from '@multiverse-org/ui/src/components/atoms/Button'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={` ${inter.className}`}>
      <div className="relative border-gray-200 shadow-xl">
        <LifeScene />
        <div className="absolute top-0 z-10 max-w-lg p-2 md:p-4 lg:p-8 xl:p-12 ">
          <h1 className="tracking-tighter text-7xl font-extralight">
            Super crazy{' '}
            <span className="whitespace-nowrap">text-adventure</span> stories.
          </h1>
          <Button
            className="mt-8"
            onClick={() => {
              const element = document.getElementById('search-stories')
              element?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Explore now.
          </Button>
        </div>
      </div>
      <Container className="mt-24">
        <div id="search-stories" className="min-h-[60rem]">
          <SearchStories />
        </div>
      </Container>
    </main>
  )
}
