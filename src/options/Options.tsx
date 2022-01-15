import { Route, Routes as RRRoutes } from 'react-router-dom'
import Onboard from '~/options/components/Onboarding'
import Landing from '~/options/components/Landing'
import Recovery from '~/options/components/Recovery'

const OptionsApp = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-[24rem] h-[32rem] card card-normal shadow-2xl bg-slate-800">
        <RRRoutes>
          <Route path="/" element={<Landing />} />
          <Route path="/onboard" element={<Onboard />} />
          <Route path="/recovery" element={<Recovery />} />
        </RRRoutes>
      </div>
    </div>
  )
}

export default OptionsApp
