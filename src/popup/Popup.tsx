import Drawer from '~/components/Drawer'
import { NavigationProvider } from '~/contexts/navigation'
import Routes from './routes'

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
        <Drawer />
        <Routes />
      </div>
    </Providers>
  )
}
