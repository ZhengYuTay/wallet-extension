import BottomNavigation from '~/popup/components/BottomNavigation'
import { NavigationProvider } from '~/popup/contexts/navigation'
import { MENU } from '~/constants/menu'
import Wallet from '~/popup/pages/wallet'
import History from '~/popup/pages/history'
import Token from '~/popup/pages/token'
import { Route, Routes } from 'react-router-dom'

interface ProviderProps {
  children: React.ReactElement
}

const Providers: React.FC<ProviderProps> = ({ children }) => {
  return <NavigationProvider>{children}</NavigationProvider>
}

export const Popup = () => {
  return (
    <Providers>
      <div className="w-[22rem] h-[32rem]">
        <BottomNavigation menu={MENU}>
          <Routes>
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/wallet/:id" element={<Token />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </BottomNavigation>
      </div>
    </Providers>
  )
}
