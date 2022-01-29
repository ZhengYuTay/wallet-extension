import { PublicKey } from '@solana/web3.js'
import { formatDistanceToNowStrict } from 'date-fns'
import * as React from 'react'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Line, LineChart, ResponsiveContainer } from 'recharts'
import Coin from '~/components/Coin'
import ListItem from '~/components/ListItem'
import TransactionIcon from '~/components/TransactionIcon'
import useWeb3 from '~/hooks/useWeb3'
import { truncateAddress } from '~/utils/coin'

const GRAPH_DATA = [
  {
    uv: 1000,
    pv: 2400,
    amt: 2400
  },
  {
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    uv: 1090,
    pv: 4800,
    amt: 2181
  },
  {
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
]

const Token: React.FunctionComponent = () => {
  const { id } = useParams()

  if (!id) {
    return <div className="flex flex-col">Something went wrong!</div>
  }

  const pk = useMemo(() => new PublicKey(id), [id])
  const { transactions, tokenMap } = useWeb3(pk)

  const tokenInfo = React.useMemo(() => tokenMap.get(id), [tokenMap, id])

  return (
    <div className="flex flex-col px-6 py-8 pt-2 h-full overflow-y-auto">
      <div className="flex flex-row items-center">
        <Coin icon={tokenInfo?.logoURI} size={8} />
        <div className="text-lg ml-2">{tokenInfo?.symbol}</div>
        <div className="flex-1" />
        <div className="text-[0.6rem] rounded-lg bg-slate-50/20 text-slate-100 px-2 py-[0.1rem]">24H</div>
      </div>
      <div className="flex flex-row items-center justify-between mt-1">
        <div className="text-4xl font-semibold">$52,423.85</div>
        <div className="text-[1rem] text-green-500">+9.23%</div>
      </div>
      <ResponsiveContainer height={200} width="100%" className="mt-2">
        <LineChart data={GRAPH_DATA}>
          <Line type="monotone" dataKey="uv" stroke="#6CCDE2" dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <div className="text-[1rem] text-slate-300 mt-2">Recent Activity</div>
      <div className="flex flex-col">
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

export default Token
