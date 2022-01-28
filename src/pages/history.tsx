import { PublicKey } from '@solana/web3.js'
import { formatDistanceToNowStrict } from 'date-fns'
import * as React from 'react'
import ListItem from '~/components/ListItem'
import TransactionIcon from '~/components/TransactionIcon'
import useWeb3 from '~/hooks/useWeb3'
import { truncateAddress } from '~/utils/coin'

const DUMMY_PUBLIC_KEY = new PublicKey('9zg3seAh4Er1Nz8GAuiciH437apxtzgUWBT8frhudevR')

const History: React.FunctionComponent = () => {
  const { transactions } = useWeb3(DUMMY_PUBLIC_KEY)

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="text-[1rem] font-semibold text-slate-300 text-center pt-6 pb-10">Transaction History</div>
      <div className="flex flex-col px-4">
        {transactions?.map((transaction) => (
          <a
            key={transaction.signature}
            href={`https://solscan.io/tx/${transaction.signature}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ListItem
              icon={<TransactionIcon type={transaction.err ? 'fail' : 'success'} />}
              title={truncateAddress(transaction.signature)}
              rightSide={
                <div className="text-right text-md text-slate-400">
                  {transaction.blockTime ? formatDistanceToNowStrict(transaction.blockTime * 1000) : '-'}
                </div>
              }
            />
          </a>
        ))}
      </div>
    </div>
  )
}

export default History
