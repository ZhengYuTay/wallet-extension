import React from 'react'
import ReactDOM from 'react-dom'
import Options from './Options'
import '../styles'

import 'virtual:svg-icons-register'
import { MemoryRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <MemoryRouter initialEntries={['/']}>
      <Options />
    </MemoryRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
