import * as React from 'react'
import { useParams } from 'react-router-dom'
import Coin from '~/popup/components/Coin'
import ListItem from '~/popup/components/ListItem'
import { truncateAddress } from '~/utils/coin'

const ACTIVITIES = [...new Array(10)].map((_, index) => ({
  title: 'Swap via Jupiter',
  address: 'bc1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3qccfmv3',
  timestamp: 1640846697
}))

const Token: React.FunctionComponent = () => {
  const { id } = useParams()
  console.log('🚀 ~ file: token.tsx ~ line 7 ~ id', id)

  return (
    <div className="flex flex-col px-6 py-8 h-full overflow-y-auto">
      <div className="flex flex-row items-center">
        <Coin size={6} />
        <div className="text-lg ml-2">BTC</div>
        <div className="flex-1" />
        <div className="text-[0.6rem] rounded-lg bg-slate-50/20 text-slate-100 px-2 py-[0.1rem]">24H</div>
      </div>
      <div className="flex flex-row items-center justify-between mt-1">
        <div className="text-4xl">$52,423.85</div>
        <div className="text-lg text-green-500">+9.23%</div>
      </div>
      <div className="flex">Graph</div>
      <div className="text-lg text-slate-500">Recent Activity</div>
      <div className="flex flex-col">
        {ACTIVITIES.map((activity, index) => (
          <ListItem
            key={`activity_${index}`}
            title={activity.title}
            caption={truncateAddress(activity.address)}
            rightSide={<div className="text-right">{activity.timestamp}</div>}
          />
        ))}
      </div>
    </div>
  )
}

export default Token
