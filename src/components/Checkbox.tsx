import React from 'react'
import classnames from 'classnames'

interface Props {
  className?: string
  label?: string | React.ReactNode
  [x: string]: any
}

const Checkbox: React.FC<Props> = ({ className, label, ...props }) => {
  return (
    <div className={classnames('flex flex-row items-center', className)}>
      <input type="checkbox" className="checkbox" {...props} />
      {label && <div className="text-base ml-2">{label}</div>}
    </div>
  )
}

export default Checkbox
