import React from 'react'
import ClipboardJS from 'clipboard'
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

  return (
    <>
      <div className="text-2xl text-semibold">Secret Recovery Phrase</div>
      <div className="text-base text-slate-400 mt-2">
        This is the only way you will be able to recover your account. Please store it somewhere safe!
      </div>
      <div className="bg-slate-500 p-4 relative rounded-md mt-6">
        <div className="text-lg" id="seed">
          drip marriage celery half squirrel abuse music ceiling hand diesel evolve someone
        </div>
        <button
          className="btn btn-secondary btn-xs rounded-2 absolute right-4 -bottom-3"
          data-clipboard-target="#seed"
          onClick={onCopy}
        >
          {isCopied ? 'copied!' : 'copy'}
        </button>
      </div>
      <button className="btn btn-primary w-full mt-auto" onClick={onNext}>
        OK, I saved it somewhere
      </button>
    </>
  )
}

export default Seed
