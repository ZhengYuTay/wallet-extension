import { ASSOCIATED_TOKEN_PROGRAM_ID, Token, TOKEN_PROGRAM_ID, u64 } from '@solana/spl-token'
import { PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js'
import { connect } from 'http2'
import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Coin from '~/components/Coin'
import Header from '~/components/Header'
import Input from '~/components/Input'
import useWallet from '~/hooks/useWallet'
import useWeb3, { TokenInfoAccount } from '~/hooks/useWeb3'
import { tokenAccountParser } from '~/libs/tokens'

const SendToken: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { selectedWallet } = useWallet()
  const { connection, tokenInfoAccounts } = useWeb3(selectedWallet?.publicKey)

  const [recipient, setRecipient] = React.useState<string>()
  const [amount, setAmount] = React.useState<string>()
  const [tokenAccount, setTokenAccount] = React.useState<TokenInfoAccount>()

  const goBack = React.useCallback(() => {
    navigate(-1)
  }, [navigate])

  React.useEffect(() => {
    setTokenAccount(tokenInfoAccounts?.find((tokenInfoAccount) => tokenInfoAccount.info.mint.toBase58() === id))
  }, [id, tokenInfoAccounts])

  const gotToSendConfirm = React.useCallback((mint) => {
    navigate(`/send-confirm/${mint}`)
  }, [])

  return (
    <div className="flex flex-col h-full">
      <Header title={`Send ${tokenAccount?.token?.symbol}`} style={{ flex: '0 0' }} back />
      <div className="flex flex-col  p-4 pt-2 h-full">
        <div className="flex flex-col space-y-6 items-center">
          <Coin icon={tokenAccount?.token?.logoURI} size={20} />
          <Input
            onChange={(e) => setRecipient(e.target.value)}
            placeholder={`Recipient's ${tokenAccount?.token?.symbol ?? 'N/A'} address`}
            className="w-full"
          />
          <Input
            type="number"
            placeholder="Amount"
            className="w-full"
            onChange={(e) => setAmount(e.target.value)}
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
          <button
            className="btn btn-primary w-[45%]"
            disabled={!amount && !recipient}
            onClick={async () => {
              if (!selectedWallet || !tokenAccount || !recipient || !amount) return
              // Recipient should be in most cases a system program account
              // /!\ Potentially recipient can be a token account directly, but we ignore that for now
              const recipientPublickey = new PublicKey(recipient)
              const mint = tokenAccount.info.mint
              const destination = await Token.getAssociatedTokenAddress(
                ASSOCIATED_TOKEN_PROGRAM_ID,
                TOKEN_PROGRAM_ID,
                mint,
                recipientPublickey
              )
              const instructions: TransactionInstruction[] = []

              const accountInfo = await connection.getAccountInfo(destination)
              if (accountInfo) {
                const recipientAta = tokenAccountParser(destination, accountInfo)
                if (recipientAta.info.owner.equals(recipientPublickey)) {
                  throw new Error('ATA owner is not the recipient')
                }
              } else {
                instructions.push(
                  Token.createAssociatedTokenAccountInstruction(
                    ASSOCIATED_TOKEN_PROGRAM_ID,
                    TOKEN_PROGRAM_ID,
                    mint,
                    destination,
                    recipientPublickey,
                    selectedWallet.publicKey
                  )
                )
              }

              instructions.push(
                Token.createTransferCheckedInstruction(
                  TOKEN_PROGRAM_ID,
                  tokenAccount.pubkey,
                  mint,
                  destination,
                  selectedWallet.publicKey,
                  [],
                  new u64(amount),
                  tokenAccount.token?.decimals ?? 0
                )
              )

              const tx = new Transaction({ feePayer: selectedWallet.publicKey })
              tx.instructions = instructions
              tx.recentBlockhash = (await connection.getRecentBlockhash()).blockhash
              selectedWallet.signTransaction(tx)
              const signature = await connection.sendRawTransaction(tx.serialize())
              console.log('Sent token transfer, signature:', signature)
              // TODO: Go to monitor transaction
            }}
          >
            {/* TODO: Flow to send confirm */}
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default SendToken
