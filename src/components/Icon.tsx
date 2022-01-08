import * as React from 'react'

interface IconProps {
  name: string
  color?: string
  colorFn?: Function
  [x: string]: any
}

const Icon: React.FunctionComponent<IconProps> = ({ name, color, colorFn, height, width, size = 20, ...props }) => {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <svg
      aria-hidden
      width={width ?? size}
      height={height ?? size}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <use href={`#icon-${name}`} fill={colorFn?.({ hover: isHovered }) ?? color ?? 'black'} />
    </svg>
  )
}

export default Icon
