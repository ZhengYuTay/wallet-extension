import { NavigationProvider } from '~/contexts/navigation'
import Navigation from '~/popup/navigation'

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
        <Navigation />
      </div>
    </Providers>
  )
}
