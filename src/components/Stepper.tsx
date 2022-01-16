import React from 'react'
import cn from 'classnames'

interface RefProps {
  setStep: (step: Number) => void
}

interface Props {
  steps: Number
  initialStep?: Number
  className?: string
}

const Stepper = React.forwardRef<RefProps, Props>(({ className, steps, initialStep }, ref) => {
  const [currentStep, setCurrentStep] = React.useState<Number>(initialStep ?? 0)

  React.useImperativeHandle(ref, () => ({
    setStep(step: Number): void {
      setCurrentStep(step)
    }
  }))

  return (
    <div className={cn('flex flex-row', className)}>
      {[...new Array(steps)].map((_, index) => (
        <div
          key={`step_${index}`}
          className={cn('rounded-full mx-1.5 w-3 h-3', {
            'bg-primary': currentStep >= index,
            'bg-slate-500': currentStep < index
          })}
        />
      ))}
    </div>
  )
})

export default Stepper
