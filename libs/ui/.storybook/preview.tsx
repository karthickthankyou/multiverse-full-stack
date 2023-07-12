import '../src/index.css'
import React from 'react'
import { initialize, mswLoader } from 'msw-storybook-addon'
import * as NextImage from 'next/image'

import type { Preview } from '@storybook/react'
import { ApolloProvider } from '@multiverse-org/network/src/config/apollo'
import { ReduxProvider } from '@multiverse-org/store/Provider'
import { RouterContext } from 'next/dist/shared/lib/router-context'
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
    nextRouter: {
      Provider: RouterContext.Provider, // next 13 (using next/router) / next < 12
    },
  },
  decorators: [
    (Story) => (
      <ReduxProvider>
        <ApolloProvider>
          <Story />
        </ApolloProvider>
      </ReduxProvider>
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
