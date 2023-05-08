import React from 'react'
import { Button } from 'antd'
import { ReactSVG } from 'react-svg'
import { useSteps } from '@/src/hooks/useSteps'
import { Link, useNavigate } from 'react-router-dom'
import { SummaryPhase } from '@pages/schedule-summary'
import { LocationPhase } from '@pages/schedule-location'
import { PhoneNumberPhase } from '@pages/schedule-phonenumber'
import SelectItemsPhase from '@pages/schedule-selectMaterials'
import { ValidateStepButton } from '@components/validateStepButton'

import CloseSVG from '@svgs/x.svg'
import BackArrowSVG from '@svgs/arrow-left.svg'

const Schedule: React.FC = () => {

   const navigate = useNavigate()
   const { nextStep, prevStep, onStepChange, Steps } = useSteps()

   return (
      <div className={'relative h-full flex justify-center items-center object-center my-3 '}>
         {/*  */}
         <div className='flex flex-col justify-between items rounded-3xl px-4 py-3 space-y-6  md:w-[40%] w-full border'>
            {/* TOPBAR */}
            <div className="flex flex-nowrap justify-between">
               <Button type='text' onClick={prevStep} className={'hover:bg-transparent hover:animate-pulse flex items-center'} icon={<ReactSVG src={BackArrowSVG} />} />
               <Button type='text' onClick={() => navigate('/')} className={'hover:bg-transparent hover:animate-pulse flex items-center'} icon={<ReactSVG src={CloseSVG} />} />
            </div>
            {/* STEPS */}
            <Steps
               showIndicator={true}
               items={[
                  {
                     key: 'phoneNumberPhase',
                     children: <PhoneNumberPhase />
                  },
                  {
                     key: 'locationPhase',
                     children: <LocationPhase />
                  },
                  {
                     key: 'seletionPhase',
                     children: <SelectItemsPhase />
                  },
                  {
                     key: 'summaryPhase',
                     children: <SummaryPhase />
                  },
               ]} />
            {/* NEXT BUTTON */}
            <ValidateStepButton nextStep={nextStep} onStepChange={onStepChange} />
            {/* PRICELIST */}
            <Link to={'/'} className={'w-auto underline underline-offset-2 text-center font-medium text-black hover:text-secondary-color'}>See our price list</Link>
         </div>
      </div>
   )
}

export default React.memo(() => <Schedule />)