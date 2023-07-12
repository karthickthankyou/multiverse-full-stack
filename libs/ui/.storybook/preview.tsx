import '../src/index.css'
import React from 'react'
import { initialize, mswLoader } from 'msw-storybook-addon'
import * as NextImage from 'next/image'

import type { Preview } from '@storybook/react'
import { ApolloProvider } from '@multiverse-org/network/src/config/apollo'

// Initialize MSW
initialize()

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ApolloProvider>
        <Story />
      </ApolloProvider>
    ),
  ],
  loaders: [mswLoader],
}

// Override next/image during Storybook testing
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => {
    return <img {...props} />
  },
})

export default preview
