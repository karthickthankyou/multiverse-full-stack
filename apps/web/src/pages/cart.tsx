import Head from 'next/head'
import { Cart } from '@multiverse-org/ui/src/components/templates/Cart'
import { SaveForLater } from '@multiverse-org/ui/src/components/templates/SaveForLater'
import { UserStoryType } from '@multiverse-org/network/src/generated'
import { Container } from '@multiverse-org/ui/src/components/atoms/Container'
import { HeaderText } from '@multiverse-org/ui/src/components/molecules/HeaderText'

export default function CartPage() {
  return (
    <>
      <Head>
        <title>Multiverse | Cart | Karthick Ragavendran</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container className="space-y-12">
          <Cart />
          <SaveForLater />
        </Container>
      </main>
    </>
  )
}
