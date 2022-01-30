import * as React from 'react'
import { ConfirmedSignatureInfo, PublicKey } from '@solana/web3.js'
import { getRecentTransactions, getWalletTokens, TokenAccount } from '~/libs/tokens'
import { ENV, TokenInfo, TokenListProvider } from '@solana/spl-token-registry'
import { useQuery } from 'react-query'
import { tokenAmountToUiTokenAmount } from '~/utils/coin'
import { useConnection } from './useConnection'

const MAIN_PUBLIC_KEY = new PublicKey('9zg3seAh4Er1Nz8GAuiciH437apxtzgUWBT8frhudevR')

export type TokenInfoAccount = { token: TokenInfo | undefined } & { balance: number } & TokenAccount

interface Web3Props {
  tokenAccounts: TokenAccount[] | undefined
  tokenInfoAccounts: Array<TokenInfoAccount> | undefined
  transactions: ConfirmedSignatureInfo[] | undefined
  tokenMap: Map<string, TokenInfo>
}

const useWeb3 = (wallet: PublicKey | undefined = MAIN_PUBLIC_KEY): Web3Props => {
  const connection = useConnection()
  const [tokenAccounts, setTokenAccounts] = React.useState<TokenAccount[]>()
  const [tokenMap, setTokenMap] = React.useState<Map<string, TokenInfo>>(new Map())
  const { data: transactions = [] } = useQuery<ConfirmedSignatureInfo[]>(
    `${wallet.toString()}-transactions`,
    async () => {
      return getRecentTransactions(connection, wallet)
    }
  )

  const tokenInfoAccounts = React.useMemo(
    () =>
      tokenAccounts?.map((account) => {
        const token = tokenMap.get?.(account.info.mint.toBase58())

        return { token, ...account, balance: tokenAmountToUiTokenAmount(account.info.amount, token?.decimals ?? 0) }
      }) ?? [],
    [tokenAccounts, tokenMap]
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
  }, [connection, wallet])

  React.useEffect(() => {
    retrieveWalletTokens()
  }, [retrieveWalletTokens])

  React.useEffect(() => {
    getTokensMap()
  }, [getTokensMap])

  return { tokenAccounts, tokenInfoAccounts, transactions, tokenMap }
}

export default useWeb3
