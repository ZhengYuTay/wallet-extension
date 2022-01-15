import React from 'react'
import classnames from 'classnames'

interface Props {
  className?: string
  title: string
  caption?: string
}

const Title: React.FC<Props> = ({ className, title, caption }) => {
  return (
    <div className={classnames('flex flex-col', className)}>
      <div className="text-2xl text-center text-semibold">{title}</div>
      <div className="text-lg text-slate-400 mt-2 text-center">{caption}</div>
    </div>
  )
}

export default Title
