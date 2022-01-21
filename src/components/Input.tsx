import * as React from 'react'
import cn from 'classnames'

interface InputProps {
  className?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  placeholder?: string
  value?: string
  secureEntry?: Boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  [x: string]: any
}

const Input: React.FunctionComponent<InputProps> = ({
  className,
  prefix,
  suffix,
  placeholder,
  secureEntry = false,
  value,
  onChange,
  ...props
}) => {
  return (
    <div className={cn('flex flex-row px-2 py-4 rounded bg-slate-900', className)}>
      {prefix}
      <input
        type={secureEntry ? 'password' : 'text'}
        className={cn('bg-transparent text-md outline-none w-full', {
          'ml-4': !!prefix,
          'mr-4': !!suffix
        })}
        placeholder={placeholder ?? 'Placeholder here'}
        defaultValue={value ?? ''}
        onChange={onChange}
        {...props}
      />
      {suffix}
    </div>
  )
}

export default Input
