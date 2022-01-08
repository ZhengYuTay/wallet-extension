import * as React from 'react'
import { MENU } from '~/constants/menu'
import BottomNavigation from '~/components/BottomNavigation'
import { Route, Routes } from 'react-router-dom'
import Wallet from '~/pages/wallet'
import History from '~/pages/history'
import Collection from '~/pages/collection'
import Swap from '~/pages/swap'

const Main: React.FunctionComponent = () => {
  return (
    <BottomNavigation menu={MENU}>
      <Routes>
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BottomNavigation>
  )
}

export default Main
