import { validateMnemonic } from 'bip39'
import React, { useMemo, useState } from 'react'
import { storeMnemonic } from '~/libs/cryptography/wallet-seed'
import Title from '../Title'

interface SeedProps {
  onNext: () => void
}

const Seed: React.FC<SeedProps> = ({ onNext }) => {
  const [mnemonic, setMnemonic] = useState('')
  const mnemonicValid = useMemo(() => validateMnemonic(mnemonic), [mnemonic])

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
      <button
        className="btn btn-block btn-primary mt-auto"
        disabled={!mnemonicValid}
        onClick={async () => {
          await storeMnemonic(mnemonic)
          onNext()
        }}
      >
        Import Secret recovery phrase
      </button>
    </>
  )
}

export default Seed
