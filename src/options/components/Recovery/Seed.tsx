import React from 'react'
import Title from '../Title'

interface SeedProps {
  onNext: () => void
}

const Seed: React.FC<SeedProps> = ({ onNext }) => {
  return (
    <>
      <Title title="Secret Recovery Phrase" caption='Restore an existing wallet with your 12 or 24-word secret recovery phrase' />
      <textarea className="textarea text w-full mt-4" placeholder="Secret phrase" rows={3} />
      <button className="btn btn-block btn-primary mt-auto" onClick={onNext}>
        Import Secret recovery phrase
      </button>
    </>
  )
}

export default Seed
