import React from 'react'
import ReactDOM from 'react-dom'
import { Popup } from './Popup'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import '../styles'

import 'virtual:svg-icons-register'

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/wallet']}>
        <Popup />
      </MemoryRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
