import * as React from 'react'
import { clusterApiUrl, ConfirmedSignatureInfo, Connection, PublicKey } from '@solana/web3.js'
import { getRecentTransactions, getWalletTokens, TokenAccount } from '~/libs/tokens'
import { ENV, TokenInfo, TokenListProvider } from '@solana/spl-token-registry'
import { useQuery } from 'react-query'

const connection = new Connection(clusterApiUrl('mainnet-beta'))
const MAIN_PUBLIC_KEY = new PublicKey('9zg3seAh4Er1Nz8GAuiciH437apxtzgUWBT8frhudevR')
interface Web3Props {
  connection: Connection
  tokenAccounts: TokenAccount[] | undefined
  transactions: ConfirmedSignatureInfo[] | undefined
  tokenMap: Map<string, TokenInfo>
}

const useWeb3 = (wallet: PublicKey | undefined = MAIN_PUBLIC_KEY): Web3Props => {
  const [tokenAccounts, setTokenAccounts] = React.useState<TokenAccount[]>()
  const [clusterConnection] = React.useState<Connection>(connection)
  const [tokenMap, setTokenMap] = React.useState<Map<string, TokenInfo>>(new Map())
  const { data: transactions = [] } = useQuery<ConfirmedSignatureInfo[]>(
    `${wallet.toString()}-transactions`,
    async () => {
      return getRecentTransactions(connection, wallet)
    }
  )

  const getTokensMap = React.useCallback(async () => {
    const tokens = await new TokenListProvider().resolve()
    const tokenList = tokens.filterByChainId(ENV.MainnetBeta).getList()

    setTokenMap(
      tokenList.reduce((map, item) => {
        map.set(item.address, item)
        return map
      }, new Map())
    )
  }, [setTokenMap])

  const retrieveWalletTokens = React.useCallback(async () => {
    setTokenAccounts(await getWalletTokens(connection, wallet))
  }, [])

  React.useEffect(() => {
    retrieveWalletTokens()
  }, [retrieveWalletTokens])

  React.useEffect(() => {
    getTokensMap()
  }, [getTokensMap])

  return { connection: clusterConnection, tokenAccounts, transactions, tokenMap }
}

export default useWeb3
