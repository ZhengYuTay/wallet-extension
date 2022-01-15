import React from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '~/components/Icon'
import Stepper from '~/components/Stepper'
import Complete from '../Complete'
import Account from './Accounts'
import Password from '../Password'
import Seed from './Seed'

const Recovery: React.FC = () => {
  const navigate = useNavigate()

  const stepperRef = React.useRef<any>()

  const [step, setStep] = React.useState(0)

  const goBack = React.useCallback(() => {
    if (step === 0) {
      navigate(-1)
      return
    }

    setStep((prevStep) => prevStep - 1)
  }, [step, navigate])

  const onNext = React.useCallback(() => {
    setStep((prevStep) => prevStep + 1)
  }, [])

  React.useEffect(() => {
    stepperRef.current.setStep(step)
  }, [step])

  return (
    <>
      <div className="flex flex-row justify-center items-center relative h-14">
        <Icon
          name="back"
          className="absolute left-4 cursor-pointer"
          colorFn={({ hover }: { hover: Boolean }) => (hover ? 'white' : 'grey')}
          onClick={goBack}
        />
        <Stepper steps={4} ref={stepperRef} />
      </div>
      <div className="p-8 flex flex-col items-center h-full">
        {step === 0 && <Seed onNext={onNext} />}
        {step === 1 && <Account onNext={onNext} />}
        {step === 2 && <Password onNext={onNext} />}
        {step === 3 && <Complete onNext={onNext} />}
      </div>
    </>
  )
}

export default Recovery
