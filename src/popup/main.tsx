import React from 'react'
import ReactDOM from 'react-dom'
import { Popup } from './Popup'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { WalletProvider } from '~/contexts/wallet'

import '../styles'

import 'virtual:svg-icons-register'
import { ConnectionProvider } from '~/contexts/connection'

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <MemoryRouter initialEntries={['/wallet']}>
        <ConnectionProvider>
          <WalletProvider>
            <Popup />
          </WalletProvider>
        </ConnectionProvider>
      </MemoryRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
