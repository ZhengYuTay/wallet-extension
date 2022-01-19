import * as React from 'react'
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js'
import { getWalletTokens, TokenAccount } from '~/libs/tokens'

const connection = new Connection(clusterApiUrl('mainnet-beta'))

const useWeb3 = () => {
  const [tokenAccounts, setTokenAccounts] = React.useState<TokenAccount[]>()
  const [clusterConnection] = React.useState<Connection>(connection)

  const retrieveWalletTokens = React.useCallback(async () => {
    setTokenAccounts(await getWalletTokens(connection, new PublicKey('9zg3seAh4Er1Nz8GAuiciH437apxtzgUWBT8frhudevR')))
  }, [])

  React.useEffect(() => {
    retrieveWalletTokens()
  }, [])

  return { connection: clusterConnection, tokenAccounts }
}

export default useWeb3
