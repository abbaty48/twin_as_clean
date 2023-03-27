import { useRecoilValue } from "recoil"
import { ScheduleSelector } from "@recoil/selectors/scheduleSelector"

export const SummaryPhase = () => {

   const { phoneNumber, cloths, location, totalAmountOnPickup, totalAmountOnline } = useRecoilValue(ScheduleSelector)

   return (
      <div className={'flex flex-col space-y-3 my-1 m-auto w-11/12 animate-fadeOut'}>
         <h1 className={'text-[32px] leading-10 font-medium'}>Summary</h1>
         <div className={'flex flex-nowrap justify-between'}>
            <div className={'space-y-1'}>
               <strong className={'text-2xl'}>{phoneNumber}</strong>
               <p className={'text-base leading-[21.15px]'}>{location}</p>
            </div>
            <button type='button' className={'bg-secondary-color h-fit py-1 px-3 rounded-3xl text-white text-[13px]'} >Change</button>
         </div>
         <div className={'my-2'}>
            {
               cloths.map(_cloths => {
                  return <p key={_cloths.name} className='flex flex-nowrap justify-between items-center my-1 font-normal text-lg border-b py-2'>
                     {_cloths.name}
                     <strong className="">{_cloths.quantity}</strong>
                  </p>
               })
            }
         </div>
         <button type='button' className={'relative rounded-2xl bg-secondary-color py-4 text-white text-[16px] w-11/12 place-self-center'}>
            <span className='absolute -top-2 right-8 p-1 px-2 rounded-full bg-[#EAF7FF] text-[9px] text-black font-semibold'>Online</span>
            Pay Now (N{totalAmountOnline})
         </button>
         <button type='button' className={'rounded-2xl border border-secondary-color py-4 text-secondary-color text-[16px] w-11/12 place-self-center'}>
            Pay On Pickup (N{totalAmountOnPickup})
         </button>
      </div>
   )
}