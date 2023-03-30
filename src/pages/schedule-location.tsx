import { Input } from "antd"
import { ReactSVG } from "react-svg"
import { useStoreActions } from 'easy-peasy'

import MapPinSVG from '@svgs/map-pin.svg'
import { ISchedule } from "../commons/models/interfaces/ischedule"
import { useState } from "react"

export const LocationPhase = () => {

   const saveLocation = useStoreActions<ISchedule>(actions => actions.saveLocation)
   const [value, setValue] = useState('')

   return (
      <div className={'space-y-6 my-3 w-11/12 m-auto'}>
         <h1 className={'text-[32px] leading-10 font-black text-black'}>Where do we pick up?</h1>
         <p className={'text-lg leading-[132.2%]'}>Enter your pickup location.</p>
         <Input type={'text'} size='large' prefix={<ReactSVG src={MapPinSVG} />} autoFocus placeholder='Location'
            className={'my-4 rounded-2xl py-2 px-4 w-full h-[56px] border border-[#E1DFDD] placeholder:text-[#919EAB]'}
            value={value}
            onChange={e =>
               setValue(e.target.value)
               saveLocation(e.target.value)
            }
         />
      </div>
   )
}