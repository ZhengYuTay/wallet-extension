import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import Coin from '~/components/Coin'
import ListItem from '~/components/ListItem'
import { ENV, TokenInfo, TokenListProvider } from '@solana/spl-token-registry'
import useWeb3 from '~/hooks/useWeb3'
import { tokenAmountToUiTokenAmount } from '~/utils/coin'

const Wallet: React.FunctionComponent = () => {
  const navigate = useNavigate()
  const { tokenAccounts } = useWeb3()

  const [tokenMap, setTokenMap] = React.useState<Map<string, TokenInfo>>()

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

  const goToSend = React.useCallback(() => {
    navigate('/send')
  }, [])

  const goToToken = React.useCallback((coin) => {
    navigate(`/wallet/${coin.id}`)
  }, [])

  React.useEffect(() => {
    getTokensMap()
  }, [getTokensMap])

  return (
    <div className="flex flex-col text-center align-center h-full">
      <div className="px-10 flex flex-col space-y-2 mb-4">
        <span className="text-md">Account 1</span>
        <span className="text-4xl">$3,575.24</span>
        <span className="text-red-700 text-base">-229.23</span>
        <div className="flex flex-row justify-center">
          <button className="btn px-6 mx-2">Receive</button>
          <button className="btn px-6 mx-2" onClick={goToSend}>
            Send
          </button>
        </div>
      </div>
      <div className="flex flex-col mx-2 overflow-y-auto flex-1">
        {tokenMap &&
          tokenAccounts?.map(({ info: { mint, amount } }, index) => {
            const tokenInfo = tokenMap.get(mint.toBase58())!
            const decimals = tokenInfo?.decimals ?? 0

            return (
              <ListItem
                key={`token_${index}`}
                title={tokenInfo?.symbol}
                caption={tokenAmountToUiTokenAmount(amount, decimals)}
                icon={<Coin icon={tokenInfo?.logoURI} />}
                onClick={() => goToToken(mint)}
              />
            )
          })}
      </div>
    </div>
  )
}

export default Wallet
