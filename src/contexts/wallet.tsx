import { PublicKey, Transaction } from '@solana/web3.js'
import { createContext, ReactChild, useCallback, useEffect, useMemo, useState } from 'react'
import { getKeypairFromSeed, loadMnemonic, menomonicToSeed } from '~/libs/cryptography/wallet-seed'

interface Wallet {
  name: string
  publicKey: PublicKey
  signTransaction: (transaction: Transaction) => void
  // ...
}

type WalletContextState = {
  wallets: Wallet[]
  selectedWallet: Wallet | undefined
  setSelectedWalletByIndex: (index: number) => void
}

export const WalletContext = createContext<WalletContextState>({
  wallets: [],
  selectedWallet: undefined,
  setSelectedWalletByIndex: () => {}
})

export const WalletProvider = ({ children }: { children: ReactChild }) => {
  const [seed, setSeed] = useState<string>()
  const [selectedWallet, setSelectedWallet] = useState<Wallet>()

  useEffect(() => {
    loadMnemonic().then(async (mnemonic) => {
      if (!mnemonic) {
        throw new Error('Mnemonic must be set first through options flow for now')
      }
      setSeed(await menomonicToSeed(mnemonic))
    })
  })

  const wallets = useMemo(() => {
    if (!seed) return []
    return [...Array(5).keys()].map((index) => {
      const walletKeypair = getKeypairFromSeed(seed, index)
      const signTransaction = (transaction: Transaction) => {
        transaction.partialSign(walletKeypair)
      }

      return {
        name: `Wallet ${index + 1}`,
        publicKey: walletKeypair.publicKey,
        signTransaction
      }
    })
  }, [seed])

  useEffect(() => {
    setSelectedWallet(wallets[0])
  }, [wallets])

  const setSelectedWalletByIndex = useCallback(
    (index: number) => {
      setSelectedWallet(wallets[index])
    },
    [wallets]
  )

  return (
    <WalletContext.Provider value={{ wallets, selectedWallet, setSelectedWalletByIndex }}>
      {children}
    </WalletContext.Provider>
  )
}
