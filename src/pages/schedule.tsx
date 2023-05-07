import { Button } from 'antd'
import { useContext } from 'react'
import { ReactSVG } from 'react-svg'
import { useSteps } from '@/src/hooks/useSteps'
import { Link, useNavigate } from 'react-router-dom'
import { SummaryPhase } from '@pages/schedule-summary'
import { LocationPhase } from '@pages/schedule-location'
import { StoreContext } from '@/src/states/scheduleState'
import { PhoneNumberPhase } from '@pages/schedule-phonenumber'
import { SelectItemsPhase } from '@pages/schedule-selectMaterials'


import CloseSVG from '@svgs/x.svg'
import ArrowRight from '@svgs/arrow-right.svg'
import BackArrowSVG from '@svgs/arrow-left.svg'

const Schedule = () => {

   const navigate = useNavigate()
   const { state } = useContext(StoreContext)
   const { nextStep, prevStep, onStepChange, Steps } = useSteps()

   /** STEP VALIDATOR */
   const isValidateStep = () => {
      const { currentIndex, nextIndex } = onStepChange()
      switch (currentIndex) {
         case 0: return state.phoneNumber === '' ? !false : !true;
         case 1: return state.location === '' ? !false : !true;
         case 2: return state.materials?.length <= 0 ? !false : !true;
         default: {
            return (currentIndex >= nextIndex) ? false : true
         }
      }
   } // end isValidateStep

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
            {/* <SelectItemsPhase /> */}

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
            <button type='button' disabled={isValidateStep()} onClick={nextStep}
               className={'flex flex-row justify-center items-center gap-2 rounded-2xl bg-secondary-color py-4 text-[white_16px] w-full place-self-center font-black text-black disabled:bg-opacity-70 disabled:cursor-not-allowed'}>
               <strong className={'text-white'}>Next</strong>
               <ReactSVG src={ArrowRight} />
            </button>
            {/* PRICELIST */}
            <Link to={'/'} className={'w-auto underline underline-offset-2 text-center font-medium text-black hover:text-secondary-color'}>See our price list</Link>
         </div>
      </div>
   )
}

export default Schedule