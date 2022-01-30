import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '~/components/Header'
import useWeb3, { TokenInfoAccount } from '~/hooks/useWeb3'

const ConfirmSend: React.FC = () => {
  const { id: mintAddress } = useParams()
  const navigate = useNavigate()
  // const { tokenInfoAccounts } = useWeb3()

  // const [tokenAccount, setTokenAccount] = React.useState<TokenInfoAccount>()

  const goBack = React.useCallback(() => {
    navigate(-1)
  }, [navigate])

  // React.useEffect(() => {
  //   setTokenAccount(
  //     tokenInfoAccounts?.find((tokenInfoAccount) => tokenInfoAccount.info.mint.toBase58() === mintAddress)
  //   )
  // }, [mintAddress, tokenInfoAccounts])

  return (
    <div className="flex flex-col h-full">
      {/* <Header title={`Send ${tokenAccount?.token?.symbol}`} style={{ flex: '0 0' }} back /> */}
      {/* Add missing confirmation page bits */}
      <div className="flex flex-col  p-4 pt-2 h-full">
        <div className="flex flex-row justify-between mt-auto">
          <button className="btn w-[45%]" onClick={goBack}>
            Cancel
          </button>
          <button className="btn btn-primary w-[45%]">Send</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmSend
