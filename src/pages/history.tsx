import { ConfirmedSignatureInfo } from '@solana/web3.js'
import { formatDistanceToNowStrict } from 'date-fns'
import * as React from 'react'
import { useQuery } from 'react-query'
import ListItem from '~/components/ListItem'
import TransactionIcon from '~/components/TransactionIcon'
import { connection } from '~/constants/connection'
import { DUMMY_PUBLIC_KEY } from '~/constants/wallet'
import { getRecentTransactions } from '~/libs/tokens'
import { truncateAddress } from '~/utils/coin'

const History: React.FunctionComponent = () => {
  // TODO: persistent state
  const { data: transactions = [] } = useQuery<ConfirmedSignatureInfo[]>(
    `${DUMMY_PUBLIC_KEY.toString()}-transactions`,
    async () => {
      return getRecentTransactions(connection, DUMMY_PUBLIC_KEY)
    }
  )

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="text-[1rem] font-semibold text-slate-300 text-center pt-6 pb-10">Transaction History</div>
      <div className="flex flex-col px-4">
        {transactions.map(
          (transaction, index) => (
            console.log({ block: transaction.blockTime }),
            (
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
            )
          )
        )}
      </div>
    </div>
  )
}

export default History
