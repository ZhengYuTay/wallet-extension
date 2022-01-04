import BottomNavigation from '~/popup/components/BottomNavigation'
import { NavigationProvider } from '~/popup/contexts/navigation'
import { MENU } from '~/constants/menu'
import Wallet from '~/popup/pages/wallet'
import History from '~/popup/pages/history'

const Providers: React.FC = ({ children }) => {
  return <NavigationProvider>{children}</NavigationProvider>
}

export const Popup = () => {
  return (
    <Providers>
      <div className="w-80 h-96">
        <BottomNavigation menu={MENU}>
          <Wallet name="Home" />
          <History name="History" />
        </BottomNavigation>
      </div>
    </Providers>
  )
}
