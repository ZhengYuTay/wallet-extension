import classNames from 'classnames'
import * as React from 'react'
import Icon from './Icon'

interface ITransactionIconProps {
  type: 'success' | 'fail'
}

const TransactionIcon: React.FunctionComponent<ITransactionIconProps> = ({ type = 'success' }) => {
  return (
    <div
      className={classNames('p-2 rounded-full', {
        'bg-[rgba(38,233,126,0.1)]': type === 'success',
        'bg-[rgba(246,74,74,0.1)]': type === 'fail'
      })}
    >
      <Icon
        name="swap"
        colorFn={() => {
          return type === 'success' ? '#26E97E' : '#F64A4A'
        }}
      />
    </div>
  )
}

export default TransactionIcon
