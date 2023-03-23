import { ReactSVG } from 'react-svg'
import VechileSVG from '@svgs/vechile.svg'

const Completion = () => {
   return (
      <div className={'flex flex-col space-y-3 my-1 m-auto w-11/12 text-base'}>
         <h1 className={'text-[32px] leading-10 font-medium'}>Thanks for your patronage</h1>
         <h2 className={'text-secondary-color text-[32px]'}>We're On Our Way</h2>
         <p>Abaacha Streeet, Lokogoma, Abuja</p>

         <ReactSVG src={VechileSVG} className={'flex-1 my-2'} />
         <div className={'my-2 text-center'}>
            <p>Your Request Number</p>
            <strong className={'uppercase text-secondary-color'}>TWAC101</strong>
         </div>
         <button type='button' className={'flex flex-row justify-center items-center gap-2 rounded-2xl bg-secondary-color py-4 text-[white_16px] w-full place-self-center'}>
            <strong className={'text-white'}>Close</strong>
         </button>
      </div>
   )
}

export default Completion