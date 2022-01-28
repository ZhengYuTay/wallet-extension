import { validateMnemonic, wordlists } from 'bip39'
import React, { useMemo, useState } from 'react'
import Title from '../Title'

interface SeedProps {
  onNext: () => void
}

const Seed: React.FC<SeedProps> = ({ onNext }) => {
  const [mnemonic, setMnemonic] = useState('')
  const mnemonicValid = useMemo(() => {
    console.log(wordlists.english)
    const res = validateMnemonic(mnemonic, wordlists.english)
    console.log(mnemonic, res)
    return res
  }, [mnemonic])

  return (
    <>
      <Title
        title="Secret Recovery Phrase"
        caption="Restore an existing wallet with your 12 or 24-word secret recovery phrase"
      />
      <textarea
        className="textarea text w-full mt-4"
        placeholder="Secret phrase"
        onChange={(e) => setMnemonic(e.target.value)}
        rows={3}
      />
      <button className="btn btn-block btn-primary mt-auto" disabled={!mnemonicValid} onClick={onNext}>
        Import Secret recovery phrase
      </button>
    </>
  )
}

export default Seed
