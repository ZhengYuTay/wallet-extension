import React from 'react'
import ClipboardJS from 'clipboard'
import Title from '../Title'
import { generateMnemonic } from 'bip39'
import { storeMnemonic } from '~/libs/cryptography/wallet-seed'
interface SeedProps {
  onNext: () => void
}

const Seed: React.FC<SeedProps> = ({ onNext }) => {
  const [isCopied, setIsCopied] = React.useState(false)

  const resetCopy = React.useRef<NodeJS.Timeout>()

  const onCopy = React.useCallback(() => {
    if (resetCopy.current) clearTimeout(resetCopy.current)
    setIsCopied(true)

    resetCopy.current = setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }, [])

  React.useEffect(() => {
    new ClipboardJS('.btn')
  }, [])

  const mnemonic = React.useMemo(() => generateMnemonic(), [])

  return (
    <>
      <Title
        title="Secret Recovery Phrase"
        caption="This is the only way you will be able to recover your account. Please store it somewhere safe!"
      />
      <div className="bg-slate-500 p-4 relative rounded-md mt-6">
        <div className="text-lg" id="seed">
          {mnemonic}
        </div>
        <button
          className="btn btn-secondary btn-xs rounded-2 absolute right-4 -bottom-3"
          data-clipboard-target="#seed"
          onClick={onCopy}
        >
          {isCopied ? 'copied!' : 'copy'}
        </button>
      </div>
      <button
        className="btn btn-primary w-full mt-auto"
        onClick={async () => {
          await storeMnemonic(mnemonic)
          onNext()
        }}
      >
        OK, I saved it somewhere
      </button>
    </>
  )
}

export default Seed
