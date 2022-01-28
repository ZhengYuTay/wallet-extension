import * as React from 'react'
import { MENU } from '~/constants/menu'
import BottomNavigation from '~/components/BottomNavigation'
import { Route, Routes as RRRoutes } from 'react-router-dom'
import Wallet from '~/pages/wallet'
import History from '~/pages/history'
import Collection from '~/pages/collection'
import Swap from '~/pages/swap'
import Token from '~/pages/token'
import Send from '~/pages/send'
import SendToken from '~/pages/sendToken'

const Routes: React.FunctionComponent = () => {
  return (
    <BottomNavigation menu={MENU}>
      <RRRoutes>
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/history" element={<History />} />

        {/* other pages */}
        <Route path="/send" element={<Send />} />
        {/* TODO: maybe can set as nested routes */}
        <Route path="/wallet/:id" element={<Token />} />
        <Route path="/send/:id" element={<SendToken />} />
      </RRRoutes>
    </BottomNavigation>
  )
}

export default Routes
