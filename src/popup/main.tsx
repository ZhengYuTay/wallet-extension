import '../styles'
import React from 'react'
import ReactDOM from 'react-dom'
import { Popup } from './Popup'
import { MemoryRouter } from 'react-router-dom'

import 'virtual:svg-icons-register'

ReactDOM.render(
  <React.StrictMode>
    <MemoryRouter initialEntries={['/wallet']}>
      <Popup />
    </MemoryRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
