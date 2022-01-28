import { u64 } from '@solana/spl-token'
import { ENV, TokenInfo, TokenListProvider } from '@solana/spl-token-registry'
import * as math from 'mathjs'
import { useEffect, useState } from 'react'
import { connection } from '~/constants/connection'
import { DUMMY_PUBLIC_KEY } from '~/constants/wallet'
import { getWalletTokens, TokenAccount } from '~/libs/tokens'

export function tokenAmountToUiTokenAmount(amount: u64, decimals: number) {
  return math.chain(amount.toString()).fix().divide(math.pow(10, decimals)).done()
}

export default function WalletTokens() {
  const [tokenAccounts, setTokenAccounts] = useState<TokenAccount[]>()
  const [tokenMap, setTokenMap] = useState<Map<string, TokenInfo>>(new Map())

  useEffect(() => {
    new TokenListProvider().resolve().then((tokens) => {
      const tokenList = tokens.filterByChainId(ENV.MainnetBeta).getList()

      setTokenMap(
        tokenList.reduce((map, item) => {
          map.set(item.address, item)
          return map
        }, new Map())
      )
    })
  }, [setTokenMap])

  useEffect(() => {
    getWalletTokens(connection, DUMMY_PUBLIC_KEY).then(setTokenAccounts)
  }, [])

  return (
    <>
      {tokenAccounts?.map((tokenAccount, idx) => {
        return (
          <div key={idx}>
            <img src={tokenMap.get(tokenAccount.info.mint.toBase58())?.logoURI} width="30" height="30" />
            {tokenMap.get(tokenAccount.info.mint.toBase58())?.symbol}{' '}
            {tokenAmountToUiTokenAmount(
              tokenAccount.info.amount,
              tokenMap.get(tokenAccount.info.mint.toBase58())?.decimals ?? 0
            )}
          </div>
        )
      })}
    </>
  )
}
