import * as React from 'react'
import Header from '~/popup/components/Header'
import Input from '~/popup/components/Input'
import Icon from '~/popup/components/Icon'
import ListItem from '~/popup/components/ListItem'

const FUNDS = [...new Array(10)].map((fund) => ({
  icon: null,
  name: 'Bitcoin',
  balance: '12,345',
  unit: 'BTC'
}))

const Send: React.FunctionComponent = () => {
  return (
    <div className="flex flex-col h-full">
      <Header title="Send" style={{ flex: '0 0' }} back>
        <Input
          className="w-11/12 self-center"
          prefix={<Icon name="search" color="grey" />}
          onChange={console.log}
          placeholder="Search"
        />
      </Header>
      <div className="flex flex-col mt-6 mx-2 overflow-y-auto" style={{ flex: '1 1' }}>
        <div className="text-[1rem] text-slate-300">Your Funds</div>
        <div className="flex flex-col mt-2">
          {FUNDS.map((fund, index) => (
            <ListItem
              key={`fund${index}`}
              title={fund.name}
              rightSide={<div className="text-right text-md text-slate-400">{`${fund.balance} ${fund.unit}`}</div>}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Send
