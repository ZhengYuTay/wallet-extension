import * as React from 'react'

interface ListItemProps {
  icon?: string | React.ReactNode
  title: string
  caption: string
  rightSide?: React.ReactNode
  [x: string]: any
}

const ListItem: React.FunctionComponent<ListItemProps> = ({ icon = '', title, caption, rightSide, ...props }) => {
  const isIconComponent = React.useMemo(() => typeof icon === 'string', [icon])

  return (
    <div className="flex flex-row p-4 my-1 rounded-md bg-slate-800 cursor-pointer shadow hover:shadow-black" {...props}>
      {isIconComponent ? (
        <div className="avatar">
          <div className="rounded-full w-10">
            <img src={`${icon}` || 'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/BSV.png'} />
          </div>
        </div>
      ) : (
        <>{icon}</>
      )}
      <div className="flex flex-col justify-between items-start ml-4">
        <p className="text-base truncate font-semibold">{title}</p>
        <p className="text-xs truncate text-slate-400">{caption}</p>
      </div>
      <div className="flex flex-1 items-center justify-end">{rightSide}</div>
    </div>
  )
}

export default ListItem
