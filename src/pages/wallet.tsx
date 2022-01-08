import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import Coin from '~/components/Coin'
import ListItem from '~/components/ListItem'

const DUMMY_COINS: Array<any> = [...Array(10)].map((_, index) => ({
  id: Math.floor(Math.random() * 100),
  name: 'USDC',
  amount: '1,87055418 USDC'
}))

const Wallet: React.FunctionComponent = () => {
  const navigate = useNavigate()

  const goToSend = React.useCallback(() => {
    navigate('/send')
  }, [])

  const goToToken = React.useCallback((coin) => {
    navigate(`/wallet/${coin.id}`)
  }, [])

  return (
    <div className="flex flex-col text-center align-center pt-10 h-full">
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
        {DUMMY_COINS.map((coin, index) => (
          <ListItem
            key={`coin_${index}`}
            title={coin.name}
            caption={coin.amount}
            icon={<Coin />}
            onClick={() => goToToken(coin)}
          />
        ))}
      </div>
    </div>
  )
}

export default Wallet
