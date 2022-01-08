import * as React from 'react'
import ListItem from '~/components/ListItem'
import { truncateAddress } from '~/utils/coin'

const TRANSACTIONS = [...new Array(10)].map((_, index) => ({
  title: 'Swap via Jupiter',
  address: 'bc1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3qccfmv3',
  timestamp: '35m'
}))

const History: React.FunctionComponent = () => {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="text-[1rem] font-semibold text-slate-300 text-center pt-6 pb-10">Transaction History</div>
      <div className="flex flex-col px-4">
        {TRANSACTIONS.map((transaction, index) => (
          <ListItem
            key={`transaction_${index}`}
            title={transaction.title}
            caption={truncateAddress(transaction.address)}
            rightSide={<div className="text-right text-md text-slate-400">{transaction.timestamp}</div>}
          />
        ))}
      </div>
    </div>
  )
}

export default History
