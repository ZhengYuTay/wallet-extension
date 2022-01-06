import * as React from 'react'
import cn from 'classnames'
import Icon from '~/popup/components/Icon'

interface HeaderProps {
  title: string
  back?: Boolean
  className?: string
  textClassName?: string
  [x: string]: any
}

const Header: React.FunctionComponent<HeaderProps> = ({
  title,
  back = false,
  className,
  textClassName,
  children,
  ...props
}) => {
  return (
    <div className="flex flex-col" {...props}>
      <div className={cn('flex flex-row px-4 py-6', className)}>
        {back && (
          <Icon
            name="back"
            className="absolute cursor-pointer"
            colorFn={({ hover }: { hover: Boolean }) => (hover ? 'white' : 'grey')}
          />
        )}
        <div className={cn('text-[1rem] text-semibold text-slate-300 w-full text-center', textClassName)}>{title}</div>
      </div>
      {children}
    </div>
  )
}

export default Header
