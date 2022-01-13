import React from 'react'

interface SeedProps {
  onNext: () => void
}

const Seed: React.FC<SeedProps> = ({ onNext }) => {
  return (
    <>
      <div className="text-2xl text-semibold">Secret Recovery Phrase</div>
      <div className="text-base text-slate-400 mt-2">
        This is the only way you will be able to recover your account. Please store it somewhere safe!
      </div>
      <div className="bg-slate-500 p-4 relative rounded-md mt-6">
        <div className="text-lg">drip marriage celery half squirrel abuse music ceiling hand diesel evolve someone</div>
        <button className="btn btn-secondary btn-xs rounded-2 absolute right-4 -bottom-3">Copy</button>
      </div>
      <button className="btn btn-primary w-full self-end mt-auto" onClick={onNext}>
        OK, I saved it somewhere
      </button>
    </>
  )
}

export default Seed
