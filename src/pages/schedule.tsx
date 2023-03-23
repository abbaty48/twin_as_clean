import { useEffect, useState } from 'react'
import { ReactSVG } from 'react-svg'
import Steps from '@components/steps'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, InputNumber, Select } from 'antd'

import CloseSVG from '@svgs/x.svg'
import CallSVG from '@svgs/call.svg'
import MapPinSVG from '@svgs/map-pin.svg'
import BackArrowSVG from '@svgs/arrow-left.svg'

interface ISchedule {
   phoneNumber: string
   location: string
   cloths: {
      name: string
      quantity: number
   }[]
}

const PhoneNumberPhase = (props: { setValue: (key: string, value: any) => void }) => {

   const [value, setValue] = useState('')

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value: inputValue } = e.target;
      if (/^[0-9]*$/.test(inputValue)) {
         setValue(inputValue)
      }
   }

   return (
      <>
         <div className={'space-y-6 my-3 w-11/12 m-auto animate-fadeOut'}>
            <h1 className={'text-[32px] leading-10 font-medium'}>Let's start with your number</h1>
            <p className={'text-lg leading-[132.2%]'}>Select your pick options</p>
            <Input type={'text'} size='large' prefix={<ReactSVG src={CallSVG} />}
               placeholder='Phone Number'
               onChange={handleChange}
               value={value}
               className={'my-4 rounded-2xl py-2 px-4 w-full h-[56px] border border-[#E1DFDD] placeholder:text-[#919EAB]'} />
         </div>
      </>
   )
}

const LocationPhase = (props: { setValue: (key: string, value: any) => void }) => {
   return (
      <div className={'space-y-6 my-3 w-11/12 m-auto animate-fadeOut'}>
         <h1 className={'text-[32px] leading-10 font-medium'}>Where do we pick up?</h1>
         <p className={'text-lg leading-[132.2%]'}>Enter your pickup location.</p>
         <Input type={'text'} size='large' prefix={<ReactSVG src={MapPinSVG} />} placeholder='Location'
            className={'my-4 rounded-2xl py-2 px-4 w-full h-[56px] border border-[#E1DFDD] placeholder:text-[#919EAB]'}
            onChange={e => props.setValue('location', e.target.value)} />
      </div>
   )
}

const SelectItemsPhase = (props: { setValue: (key: string, value: any) => void }) => {
   const { setValue } = props
   return (
      <div className={'flex flex-col justify-between space-y-2 my-1 m-auto w-11/12 animate-fadeOut'}>
         <h1 className={'text-[32px] leading-10 font-medium'}>Select Items</h1>
         <p className={'text-lg leading-[132.2%]'}>Select cloth type and quantity</p>
         <div className='flex flex-nowrap my-1 mx-3 justify-between space-x-2'>
            <Select size='large' placeholder='Cloth Type'
               className={'my-3 rounded-2xl py-2 px-4 w-2/4 h-[56px] border border-[#E1DFDD] bg-white  placeholder:text-[#919EAB]'} />
            <InputNumber size='large' min={1} placeholder={'Quantity'} className={'my-3 rounded-2xl py-2 px-4 flex-1 h-[56px] border border-[#E1DFDD] placeholder:text-[#919EAB]'} />
         </div>
         <div className='flex flex-nowrap my-1 mx-3 justify-between space-x-2'>
            <Select size='large' placeholder='Cloth Type'
               className={'my-3 rounded-2xl py-2 px-4 w-2/4 h-[56px] border border-[#E1DFDD] bg-white placeholder:text-[#919EAB]'} />
            <InputNumber size='large' min={1} placeholder={'Quantity'} className={'my-3 rounded-2xl py-2 px-4 flex-1 h-[56px] border border-[#E1DFDD] placeholder:text-[#919EAB]'} />
         </div>
         <div className={'flex flex-row items-center justify-between w-full py-3 px-2 rounded-2xl bg-[#f1f1f1]'}>
            <p className={'text-[18px]'}>Amount</p>
            <strong className={'text-[24px] font-semibold'}>10,000</strong>
         </div>
      </div>
   )
}

const SummaryPhase = (props: { scheduleValue: ISchedule }) => {

   const { phoneNumber, location, cloths } = props.scheduleValue

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
            Pay Now (N30,000)
         </button>
         <button type='button' className={'rounded-2xl border border-secondary-color py-4 text-secondary-color text-[16px] w-11/12 place-self-center'}>
            Pay On Pickup (N32,000)
         </button>
      </div>
   )
}

const Schedule = () => {

   const _initialValues: ISchedule = {
      phoneNumber: '081 23 23 4433',
      location: 'Abaacha street, Lokogoma, Abuja',
      cloths: [{
         name: 'Trouser', quantity: 3
      }, { name: 'Kaftan', quantity: 3 }]
   }


   const [scheduleValue, setScheduleValue] = useState<ISchedule>(_initialValues)
   const navigate = useNavigate()
   const [step, setStep] = useState({
      nextKey: '1',
      currentKey: '0',
      previousKey: '0',
   })

   const SetValue = (key: string, value: any) => {
      setScheduleValue(_value => ({
         ..._value,
         [key]: value
      }))
   }

   const prevStep = () => {
      setStep(_step => ({
         ..._step,
         currentKey: _step.previousKey
      }))
   }

   return (
      <div className={'relative h-full flex justify-center items-center object-center my-3 '}>
         {/*  */}
         <div className='flex flex-col justify-between items rounded-3xl px-4 py-3 space-y-6  md:w-[40%] w-full border'>
            {/* TOPBAR */}
            <div className="flex flex-nowrap justify-between">
               <Button type='text' onClick={prevStep} className={'hover:bg-transparent hover:animate-pulse flex items-center'} icon={<ReactSVG src={BackArrowSVG} />} />
               <Button type='text' onClick={() => navigate('/')} className={'hover:bg-transparent hover:animate-pulse flex items-center'} icon={<ReactSVG src={CloseSVG} />} />
            </div>
            {/* TAB */}
            <Steps activeKey={step.currentKey}
               onStepChange={(currentKey, previousKey, nextKey) =>
                  setStep({ currentKey, previousKey, nextKey })
               }
               items={[
                  {
                     key: '0',
                     active: true,
                     children: <PhoneNumberPhase setValue={SetValue} />
                  },
                  {
                     key: '1',
                     active: false,
                     children: <LocationPhase setValue={SetValue} />
                  },
                  {
                     key: '2',
                     active: false,
                     children: <SelectItemsPhase setValue={SetValue} />
                  },
                  {
                     key: '3',
                     active: false,
                     children: <SummaryPhase scheduleValue={scheduleValue} />
                  },
               ]} />
            {/* PRICELIST */}
            <Link to={'/'} className={'w-auto underline underline-offset-2 text-center font-medium text-black hover:text-secondary-color'}>See our price list</Link>
         </div>
      </div>
   )
}

export default Schedule