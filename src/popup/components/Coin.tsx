import * as React from 'react'
import cn from 'classnames'

interface CoinProps {
  className?: string
  icon?: string
  size?: Number
}

const Coin: React.FunctionComponent<CoinProps> = ({ icon, className, size = 10 }) => {
  return (
    <div className={cn(`avatar rounded h-${size} w-${size}`, className)}>
      <img src={icon ?? 'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/BSV.png'} />
    </div>
  )
}

export default Coin
