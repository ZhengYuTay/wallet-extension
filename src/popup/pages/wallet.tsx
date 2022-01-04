const DUMMY_COINS = [
  {
    name: 'USDC',
    amount: '1,87055418 USDC'
  },
  {
    name: 'USDC',
    amount: '1,87055418 USDC'
  },
  {
    name: 'USDC',
    amount: '1,87055418 USDC'
  },
  {
    name: 'USDC',
    amount: '1,87055418 USDC'
  }
]

interface WalletProps {
  name: string
}

const Wallet: React.FunctionComponent<WalletProps> = ({ name }) => {
  return (
    <div className="flex flex-col text-center align-center pt-10">
      <div className="px-10 flex flex-col">
        <span className="text-2xl">$3,575.24</span>
        <span className="text-red-700 text-base mt-2">-229.23</span>
        <div className="flex flex-row justify-center my-4">
          <button className="btn px-6 mx-2">Receive</button>
          <button className="btn px-6 mx-2">Send</button>
        </div>
      </div>
      <div className="flex flex-col mx-2 overflow-y-auto">
        {DUMMY_COINS.map((coin) => (
          <div key={coin.name} className="flex flex-row px-6 py-4 my-1 rounded-md bg-slate-800">
            <div className="avatar mr-4">
              <div className="rounded-full w-10 h-10">
                <img src="http://daisyui.com/tailwind-css-component-profile-1@94w.png" />
              </div>
            </div>
            <div className="flex flex-col justify-between items-start">
              <span className="text-base font-semibold">{coin.name}</span>
              <span className="text-xs">{coin.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wallet
