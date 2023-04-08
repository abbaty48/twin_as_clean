import { Input } from "antd"
import { useContext } from 'react'
import { ReactSVG } from "react-svg"
import { Context, StateActions } from "@stores/store"

import MapPinSVG from '@svgs/map-pin.svg'

export const LocationPhase = () => {

   const [state, dispatch] = useContext(Context)!

   return (
      <div className={'space-y-6 my-3 w-11/12 m-auto'}>
         <h1 className={'text-[32px] leading-10 font-black text-black'}>Where do we pick up?</h1>
         <p className={'text-lg leading-[132.2%]'}>Enter your pickup location.</p>
         <Input type={'text'} size='large' prefix={<ReactSVG src={MapPinSVG} />} autoFocus placeholder='Location'
            className={'my-4 rounded-2xl py-2 px-4 w-full h-[56px] border border-[#E1DFDD] placeholder:text-[#919EAB]'}
            value={state.location}
            onChange={e =>
               dispatch({ type: StateActions.SET_LOCATION, payload: e.target.value })
            }
         />
      </div>
   )
}