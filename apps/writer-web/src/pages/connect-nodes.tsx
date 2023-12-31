import Head from 'next/head'
import { NodesList } from '@multiverse-org/ui/src/components/templates/NodesList/NodesList'
import { useRouter } from 'next/router'
import { AlertSection } from '@multiverse-org/ui/src/components/organisms/AlertSection'
import { Container } from '@multiverse-org/ui/src/components/atoms/Container'

export default function ConnectNodesPage() {
  const { query } = useRouter()
  const storyId = Number(query.storyId)

  if (isNaN(storyId)) {
    return <AlertSection>(`Invalid storyId: ${query.storyId}`)</AlertSection>
  }

  return (
    <>
      <Head>
        <title>Connect Nodes | Karthick Ragavendran</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <NodesList storyId={storyId} />
        </Container>
      </main>
    </>
  )
}
