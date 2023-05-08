import { useContext } from 'react'
import { ReactSVG } from 'react-svg'
import ArrowRight from '@svgs/arrow-right.svg'
import { StoreContext } from '@states/scheduleState'

export const ValidateStepButton = (prop: {
   onStepChange: () => {
      currentIndex: number;
      previousIndex: number;
      nextIndex: number;
   }, nextStep: () => void
}) => {

   const { state } = useContext(StoreContext)
   const { nextStep, onStepChange } = prop

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
      <button type='button' disabled={isValidateStep()} onClick={nextStep}
         className={'flex flex-row justify-center items-center gap-2 rounded-2xl bg-secondary-color py-4 text-[white_16px] w-full place-self-center font-black text-black disabled:bg-opacity-70 disabled:cursor-not-allowed'}>
         <strong className={'text-white'}>Next</strong>
         <ReactSVG src={ArrowRight} />
      </button>
   )
}
