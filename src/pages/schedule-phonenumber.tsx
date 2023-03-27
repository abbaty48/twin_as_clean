import { App, Input } from "antd"
import { ReactSVG } from "react-svg"
import { useRecoilState } from "recoil"
import { ScheduleSelector } from "@recoil/selectors/scheduleSelector"

import CallSVG from '@svgs/call.svg'

export const PhoneNumberPhase = () => {

   const key = 'phoneNumberKey'
   const { message } = App.useApp()
   const [getSchedule, setSchedule] = useRecoilState(ScheduleSelector)

   return (
      <>
         <div className={'space-y-6 my-3 w-11/12 m-auto'}>
            <h1 className={'text-[32px] leading-10 font-medium'}>Let's start with your number</h1>
            <p className={'text-lg leading-[132.2%]'}>Select your pick options</p>
            <Input type={'text'} size='large' prefix={<ReactSVG src={CallSVG} />}
               required autoFocus placeholder='Phone Number'
               onChange={(e) => {
                  if (/^[0-9]*$/.test(e.target.value)) {
                     setSchedule((_preStates) => ({
                        ..._preStates,
                        phoneNumber: e.target.value
                     }))
                  } else {
                     message.warning({ key, content: 'Only a number is allowed.' })
                  }
               }}
               value={getSchedule.phoneNumber}
               className={'my-4 rounded-2xl py-2 px-4 w-full h-[56px] border border-[#E1DFDD] placeholder:text-[#919EAB]'} />
         </div>
      </>
   )
}