import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js'
import { useEffect, useState } from 'react'
import { getWalletTokens, TokenAccount } from '~/libs/tokens'

export default function WalletTokens() {
  const [tokenAccounts, setTokenAccounts] = useState<TokenAccount[]>()
  useEffect(() => {
    const connection = new Connection(clusterApiUrl('mainnet-beta'))
    getWalletTokens(connection, new PublicKey('2YbB88p9EBTJijsxAkmaUjenTXJnmrJvp6MRyT5LiBiM')).then(setTokenAccounts)
  }, [])

  return (
    <>
      {tokenAccounts?.map((tokenAccount, idx) => {
        return (
          <div key={idx}>
            {tokenAccount.pubkey.toBase58()} {tokenAccount.info.amount.toString()}
          </div>
        )
      })}
    </>
  )
}
