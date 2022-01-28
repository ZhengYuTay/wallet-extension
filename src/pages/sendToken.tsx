import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Coin from '~/components/Coin'
import Header from '~/components/Header'
import Input from '~/components/Input'
import useWeb3, { TokenInfoAccount } from '~/hooks/useWeb3'

const SendToken: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { tokenInfoAccounts } = useWeb3()

  const [tokenAccount, setTokenAccount] = React.useState<TokenInfoAccount>()

  const goBack = React.useCallback(() => {
    navigate(-1)
  }, [navigate])

  React.useEffect(() => {
    setTokenAccount(tokenInfoAccounts?.find((tokenInfoAccount) => tokenInfoAccount.info.mint.toBase58() === id))
  }, [id, tokenInfoAccounts])

  return (
    <div className="flex flex-col h-full">
      <Header title={`Send ${tokenAccount?.token?.symbol}`} style={{ flex: '0 0' }} back />
      <div className="flex flex-col  p-4 pt-2 h-full">
        <div className="flex flex-col space-y-6 items-center">
          <Coin icon={tokenAccount?.token?.logoURI} size={20} />
          <Input placeholder={`Recipient's ${tokenAccount?.token?.symbol ?? 'N/A'} address`} className="w-full" />
          <Input
            type="number"
            placeholder="Amount"
            className="w-full"
            suffix={
              <div className="flex flex-row items-center space-x-2">
                <span className="text-base text-slate-600">{tokenAccount?.token?.symbol}</span>
                <button className="btn btn-xs rounded-md">Max</button>
              </div>
            }
          />
        </div>
        <div className="flex flex-row justify-between mt-auto">
          <button className="btn w-[45%]" onClick={goBack}>
            Cancel
          </button>
          <button className="btn btn-primary w-[45%]">Next</button>
        </div>
      </div>
    </div>
  )
}

export default SendToken
