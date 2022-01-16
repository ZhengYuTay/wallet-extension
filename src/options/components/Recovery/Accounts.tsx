import React from 'react'
import Checkbox from '~/components/Checkbox'
import { truncateAddress } from '~/utils/coin'
import Title from '../Title'

const ACCOUNTS = [...new Array(10)].map(() => ({
  address: 'bc1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3qccfmv3',
  balance: Math.round(Math.random() * 10)
}))

interface AccountProps {
  onNext: () => void
}

const Account: React.FC<AccountProps> = ({ onNext }) => {
  return (
    <>
      <Title title="Import Accounts" caption="Choose wallet accounts to import" />
      <div className="flex flex-col bg-slate-700 rounded-md w-full p-2 space-y-4 h-56 overflow-y-auto mt-4">
        {ACCOUNTS.map((account, index) => (
          <div className="flex flex-row justify-between" key={`account_${index}`}>
            <Checkbox label={truncateAddress(account.address)} />
            <div className="text-base text-slate-500">{account.balance} SOL</div>
          </div>
        ))}
      </div>
      <button className="btn btn-primary btn-block mt-auto" onClick={onNext}>
        Import Selected Accounts
      </button>
    </>
  )
}

export default Account
