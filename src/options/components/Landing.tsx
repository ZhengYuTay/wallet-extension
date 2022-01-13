import React from 'react'
import { useNavigate } from 'react-router-dom'

const Landing: React.FC = () => {
  const navigate = useNavigate()

  const goToOnboard = React.useCallback(() => {
    navigate('/onboard')
  }, [navigate])

  return (
    <div className="card-body h-full flex flex-col justify-between">
      <div className="card-title flex flex-1 flex-col justify-center items-center space-y-3 mt-10">
        <img
          src="https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/BSV.png"
          className="h-20 w-20"
        />
        <div className="text-2xl">Title</div>
        <div className="text-base text-center text-slate-400">
          Id est et Lorem exercitation sit adipisicing id ipsum proident.
        </div>
      </div>
      <div className="card-actions">
        <button className="btn btn-primary btn-block" onClick={goToOnboard}>
          Create New Wallet
        </button>
        <button className="btn btn-block">Use Secret Recovery Phrase</button>
      </div>
    </div>
  )
}

export default Landing
