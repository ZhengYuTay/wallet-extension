import React from 'react'
import ReactDOM from 'react-dom'
import Options from './Options'
import '../styles'

import 'virtual:svg-icons-register'
import { MemoryRouter } from 'react-router-dom'

;(() => {
  const url = new URL(window.location.href);
  const params = url.searchParams.get("popup");
  const initialEntries = params === 'true' ? '/connect' : '/';

  ReactDOM.render(
    <React.StrictMode>
      <MemoryRouter initialEntries={[initialEntries]}>
        <Options />
      </MemoryRouter>
    </React.StrictMode>,
    document.getElementById('root')
  )
})()
