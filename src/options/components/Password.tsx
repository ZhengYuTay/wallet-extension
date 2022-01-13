import React from 'react'
import Checkbox from '~/components/Checkbox'
import Input from '~/components/Input'

interface PasswordProps {
  onNext: () => void
}

const Password: React.FC<PasswordProps> = ({ onNext }) => {
  return (
    <>
      <div className="text-2xl text-semibold">Create a password</div>
      <div className="text-base text-slate-400 mt-2">You will use this to unlock your wallet</div>
      <div className="space-y-2 w-full mt-4">
        <Input className="w-full self-center" placeholder="Password" secureEntry />
        <Input className="w-full self-center" placeholder="Confirm Password" secureEntry />
      </div>
      <div className="flex flex-col mt-auto w-full">
        <Checkbox
          label={
            <span className="text-xs">
              I agree to the <a className="link link-hover text-xs">Terms of Service</a>
            </span>
          }
        />
        <button className="btn btn-primary w-full mt-2" onClick={onNext}>
          Continue
        </button>
      </div>
    </>
  )
}

export default Password
