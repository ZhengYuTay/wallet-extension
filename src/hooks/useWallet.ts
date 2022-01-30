import { useContext } from 'react'
import { WalletContext } from '~/contexts/wallet'

const useWallet = () => useContext(WalletContext)

export default useWallet
