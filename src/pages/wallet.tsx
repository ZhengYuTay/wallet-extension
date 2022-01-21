import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import Coin from '~/components/Coin'
import ListItem from '~/components/ListItem'
import useWeb3 from '~/hooks/useWeb3'
import { tokenAmountToUiTokenAmount } from '~/utils/coin'

const Wallet: React.FunctionComponent = () => {
  const navigate = useNavigate()
  const { tokenInfoAccounts } = useWeb3()

  const goToSend = React.useCallback(() => {
    navigate('/send')
  }, [])

  const goToToken = React.useCallback((mint) => {
    navigate(`/wallet/${mint}`)
  }, [])

  return (
    <div className="flex flex-col text-center align-center h-full pt-4">
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
        {tokenInfoAccounts?.map((tokenInfo, index) => {
          const decimals = tokenInfo.token?.decimals ?? 0

          return (
            <ListItem
              key={`token_${index}`}
              title={tokenInfo.token?.symbol ?? 'N/A'}
              caption={tokenAmountToUiTokenAmount(tokenInfo.info.amount ?? 0, decimals)}
              icon={<Coin icon={tokenInfo?.token?.logoURI} />}
              onClick={() => goToToken(tokenInfo.info.mint.toBase58())}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Wallet
