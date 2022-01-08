import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import Token from '~/pages/token'
import Send from '~/pages/send'

const SubMain: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/wallet/:id" element={<Token />} />
      <Route path="/send" element={<Send />} />
    </Routes>
  )
}

export default SubMain
