import React from 'react'
import Checkbox from '~/components/Checkbox'
import Input from '~/components/Input'
import Title from './Title'

interface PasswordProps {
  onNext: () => void
}

const Password: React.FC<PasswordProps> = ({ onNext }) => {
  return (
    <>
      <Title title="Create a password" caption="You will use this to unlock your wallet" />
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
