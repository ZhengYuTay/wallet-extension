import { Route, Routes as RRRoutes } from 'react-router-dom'
import Onboard from '~/options/components/Onboard'
import Landing from '~/options/components/Landing'

const OptionsApp = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-[22rem] h-[32rem] card card-normal shadow-2xl bg-slate-800">
        <RRRoutes>
          <Route path="/" element={<Landing />} />
          <Route path="/onboard" element={<Onboard />} />
        </RRRoutes>
      </div>
    </div>
  )
}

export default OptionsApp
