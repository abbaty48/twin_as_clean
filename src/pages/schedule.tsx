import { useState } from 'react'
import { ReactSVG } from 'react-svg'
import Steps from '@components/steps'
import { Link } from 'react-router-dom'
import { Button, Input, InputNumber, Select } from 'antd'

import CloseSVG from '@svgs/x.svg'
import CallSVG from '@svgs/call.svg'
import MapPinSVG from '@svgs/map-pin.svg'
import BackArrowSVG from '@svgs/arrow-left.svg'

const PhoneNumberPhase = () => {

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value: inputValue } = e.target;
      if (/^-?\d*(\.\d*)?$/.test(inputValue) || inputValue === '' || inputValue === '-') {
         return
      }
   }

   return (
      <>
         <div className={'space-y-6 my-3 w-11/12 m-auto'}>
            <h1 className={'text-[32px] leading-10 font-medium'}>Let's start with your number</h1>
            <p className={'text-lg leading-[132.2%]'}>Select your pick options</p>
            <Input type={'text'} size='large' prefix={<ReactSVG src={CallSVG} />} placeholder='Phone Number' onChange={handleChange}
               className={'my-4 rounded-2xl py-2 px-4 w-full h-[56px] border border-[#E1DFDD] placeholder:text-[#919EAB]'} />
         </div>
      </>
   )
}

const LocationPhase = () => {
   return (
      <div className={'space-y-6 my-3 w-11/12 m-auto'}>
         <h1 className={'text-[32px] leading-10 font-medium'}>Where do we pick up?</h1>
         <p className={'text-lg leading-[132.2%]'}>Enter your pickup location.</p>
         <Input type={'text'} size='large' prefix={<ReactSVG src={MapPinSVG} />} placeholder='Location'
            className={'my-4 rounded-2xl py-2 px-4 w-full h-[56px] border border-[#E1DFDD] placeholder:text-[#919EAB]'} />
      </div>
   )
}

const SelectItemsPhase = () => {
   return (
      <div className={'flex flex-col justify-between space-y-2 my-1 m-auto w-11/12'}>
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
            <strong className={'text-[24px] font-medium'}>10,000</strong>
         </div>
      </div>
   )
}

const SummaryPhase = () => {
   return (
      <div className={'flex flex-col space-y-3 my-1 m-auto w-11/12'}>
         <h1 className={'text-[32px] leading-10 font-medium'}>Summary</h1>
         <div className={'flex flex-nowrap justify-between'}>
            <div className={'space-y-1'}>
               <strong className={'text-2xl'}>081 23 23 4433</strong>
               <p className={'text-base leading-[21.15px]'}>Abaacha street, Lokogoma, Abuja</p>
            </div>
            <button type='button' className={'bg-secondary-color h-fit py-1 px-3 rounded-3xl text-white text-[13px]'} >Change</button>
         </div>
         <div className={'my-2'}>
            {
               new Array({ name: 'Trouser', quantity: 3 }, { name: 'Kaftan', quantity: 3 }).map(_cloths => {
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

   const [currentStep, setCurrentStep] = useState('0')

   const prevStep = () => {

   }

   return (
      <div className={'relative h-full flex justify-center items-center object-center my-3 '}>
         {/*  */}
         <div className='flex flex-col justify-between items rounded-3xl px-4 py-3 space-y-6  md:w-[40%] w-full  border'>
            {/* TOPBAR */}
            <div className="flex flex-nowrap justify-between">
               <Button type='text' onClick={() => prevStep()} className={'hover:bg-transparent hover:animate-pulse flex items-center'} icon={<ReactSVG src={BackArrowSVG} />} />
               <Button type='text' className={'hover:bg-transparent hover:animate-pulse flex items-center'} icon={<ReactSVG src={CloseSVG} />} />
            </div>
            {/* TAB */}
            <Steps activeKey={currentStep}
               onStepChange={(currentKey, previousKey) => setCurrentStep(previousKey)}
               items={[
                  {
                     key: '0',
                     active: true,
                     children: <PhoneNumberPhase />
                  },
                  {
                     key: '1',
                     active: false,
                     children: <LocationPhase />
                  },
                  {
                     key: '2',
                     active: false,
                     children: <SelectItemsPhase />
                  },
                  {
                     key: '3',
                     active: false,
                     children: <SummaryPhase />
                  },
               ]} />
            {/* PRICELIST */}
            <Link to={'/'} className={'w-auto underline underline-offset-2 text-center font-medium text-black hover:text-secondary-color'}>See our price list</Link>
         </div>
      </div>
   )
}

export default Schedule