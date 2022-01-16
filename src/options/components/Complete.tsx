import React from 'react'

interface CompleteProps {
  onNext: () => void
}

const Complete: React.FC<CompleteProps> = ({ onNext }) => {
  const onFinish = React.useCallback(() => {
    onNext?.()
    window.close()
  }, [])

  return (
    <>
      <div className="text-2xl">You're all done!</div>
      <div className="text-lg text-center text-slate-400 mt-2">
        Sit irure officia labore eiusmod excepteur voluptate duis qui reprehenderit sit minim.
      </div>
      <button className="btn btn-primary w-full mt-auto" onClick={onFinish}>
        Finish
      </button>
    </>
  )
}

export default Complete
