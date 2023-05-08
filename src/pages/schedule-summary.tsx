import { useContext } from "react"
import { StoreContext } from "@/src/states/scheduleState"

export const SummaryPhase = () => {

   const { state } = useContext(StoreContext)

   return (
      <div className={'flex flex-col space-y-3 my-1 m-auto w-11/12 animate-fadeOut'}>
         <h1 className={'text-[32px] leading-10 font-medium'}>Summary</h1>
         <div className={'flex flex-wrap justify-between space-y-1'}>
            <strong className={'text-2xl'}>{state.phoneNumber}</strong>
            <p className={'text-base leading-[21.15px]'}>{state.location}</p>
         </div>
         <div className={'my-2 px-2 max-h-48 overflow-hidden overflow-y-auto'}>
            {
               state.selectedMaterials.map(_cloths => {
                  return <p key={_cloths.name} className='flex flex-nowrap justify-between items-center my-1 font-normal text-lg border-b py-2'>
                     {_cloths.name}
                     <strong className="">{_cloths.quantity}</strong>
                  </p>
               })
            }
         </div>
         <button type='button' className={'relative rounded-2xl bg-secondary-color py-4 text-white text-[16px] w-11/12 place-self-center hover:bg-opacity-75'}>
            <span className='absolute -top-2 right-8 p-1 px-2 rounded-full bg-[#EAF7FF] text-[9px] text-black font-semibold'>Online</span>
            Pay Now <strong>
               ({state.totalAmountOnline?.toLocaleString('en-NG', { currency: 'NGN', style: 'currency' })})
            </strong>
         </button>
         <button type='button' className={'rounded-2xl border border-secondary-color py-4 text-secondary-color text-[16px] w-11/12 place-self-center hover:bg-gray-100 hover:bg-opacity-75'}>
            Pay On Pickup <strong>
               ({state.totalAmountOnPickup?.toLocaleString('en-NG', { currency: 'NGN', style: 'currency' })})
            </strong>
         </button>
      </div>
   )
}