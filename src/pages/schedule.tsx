import axios from 'axios'
import { useState } from 'react'
import { Async } from 'react-async'
import { ReactSVG } from 'react-svg'
import { useSteps } from '@/src/hooks/useSteps'
import { Link, useNavigate } from 'react-router-dom'
import { AddMore, AddMoreOrientation } from '@components/addMore'
import { Button, Input, InputNumber, Select, App, Spin, Space } from 'antd'

import CloseSVG from '@svgs/x.svg'
import CallSVG from '@svgs/call.svg'
import MapPinSVG from '@svgs/map-pin.svg'
import ArrowRight from '@svgs/arrow-right.svg'
import BackArrowSVG from '@svgs/arrow-left.svg'
import { DefaultOptionType } from 'antd/es/select'
import { ISchedule } from '@models/interfaces/ischedule'
import { IMaterial } from '@commons/models/interfaces/imaterial'
import { useRecoilState } from 'recoil'


const PhoneNumberPhase = (props: { initialValue: string, setValue: (key: string, value: any) => void }) => {

const PhoneNumberPhase = () => {

   const { initialValue, setValue } = props
   const key = 'phoneNumberKey'
   const { message } = App.useApp()
   const [getSchedule, setSchedule] = useRecoilState(ScheduleSelector)

   return (
      <>
         <div className={'space-y-6 my-3 w-11/12 m-auto animate-fadeOut'}>
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

const LocationPhase = () => {

   const [getSchedule, setSchedule] = useRecoilState(ScheduleSelector)

   return (
      <div className={'space-y-6 my-3 w-11/12 m-auto animate-fadeOut'}>
         <h1 className={'text-[32px] leading-10 font-medium'}>Where do we pick up?</h1>
         <p className={'text-lg leading-[132.2%]'}>Enter your pickup location.</p>
         <Input type={'text'} size='large' prefix={<ReactSVG src={MapPinSVG} />} autoFocus placeholder='Location'
            className={'my-4 rounded-2xl py-2 px-4 w-full h-[56px] border border-[#E1DFDD] placeholder:text-[#919EAB]'}
            value={getSchedule.location}
            onChange={e =>
               setSchedule((_preStates) => ({
                  ..._preStates,
                  location: e.target.value
               }))
            } />
      </div>
   )
}

const SelectItemsPhase = () => {

   const [getSchedule, setSchedule] = useRecoilState(ScheduleSelector)

const SelectItemsPhase = (props: { initialValue: { name: string, quantity: number, subPrice: number }[], setValue: (key: string, value: any) => void }) => {


   // 
   const { initialValue, setValue } = props
   // 
   const { Option } = Select
   // FETCH MATERIALS FROM SERVER
   const loadMaterial = async () => {
      try {
         return (await axios.get<IMaterial[]>('http://18.209.48.108/materials', { headers: { Accept: 'application/json' } })).data
      } catch (error: any) {
         throw new Error(error.message)
      }
   }

   /** MATERIAL COMPONENT */
   const Material = (props: { materials: IMaterial[] }) => {

      const { materials } = props
      //
      const [material, setMaterial] = useState<IMaterial>({
         name: materials[0].name,
         price: materials[0].price,
         quantity: 1,
         subPrice: materials[0].price * 1
      })
      //
      setValue('cloths', [
         ...initialValue,
         { name: material.name, quantity: material.quantity, subPrice: material.subPrice }
      ])

      const onQuantityChange = (quantity: number | null) => {
         setMaterial(_values => ({
            ..._values,
            quantity: quantity!,
            subPrice: _values.price * _values.quantity
         }))
      } // end onQuantityChange

      const onMaterialChange = (value: any, option: DefaultOptionType | DefaultOptionType[]) => {
         const _valueParse = JSON.parse(value) as { name: string, price: number }
         setMaterial(_values => ({
            ..._values,
            name: _valueParse.name,
            price: _valueParse.price,
            subPrice: _valueParse.price * _values.quantity
         }))

         setValue('cloths', [...Object.assign(initialValue, material)])
      } // end onMaterialChange

      return <div className='flex flex-nowrap my-1 mx-3 items-center justify-between space-x-2 w-full'>
         <Select size='large' placeholder='Cloth Type' labelInValue={false}
            className={'my-3 flex-1 bg-white placeholder:text-[#919EAB]'}
            onChange={onMaterialChange}
         >
            {
               materials.map(_option =>
                  <Option key={_option.name} value={JSON.stringify({ name: _option.name, price: _option.price })}>
                     <Space>
                        <span>{_option.name}</span>
                        <strong>({_option.price})</strong>
                     </Space>
                  </Option>
               )
            }

         </Select>
         <InputNumber size='large' min={1} defaultValue={1} placeholder={'Quantity'}
            className={'my-3 border border-[#E1DFDD] placeholder:text-[#919EAB]'} onChange={onQuantityChange} />
      </div>
   }

   return (
      <div className={'flex flex-col justify-between space-y-2 my-1 m-auto w-11/12 animate-fadeOut'}>
         <h1 className={'text-[32px] leading-10 font-medium'}>Select Items</h1>
         <p className={'text-lg leading-[132.2%]'}>Select cloth type and quantity</p>
         <Async promiseFn={loadMaterial}>
            {
               ({ data, error, isLoading }) => {
                  if (isLoading) return <Spin size='large' spinning={true} />
                  if (error) return <p className={'my-1 text-center text-orange-700 font-semibold'}>Something went wrong: {error.message}</p>
                  if (data) {
                     return <div className={'max-h-48 overflow-y-auto'}>
                        <AddMore ReplicateNode={<Material materials={data} />} orientation={AddMoreOrientation.Vertical} addMoreButtonClass='text-3xl' removeButtonClass='text-2xl' />
                     </div>
                  }
                  return null
               }
            }
         </Async>
         <div className={'flex flex-row items-center justify-between w-full py-2 px-5 rounded-2xl bg-[#f1f1f1]'}>
            <p className={'text-[18px]'}>Amount</p>
            <strong className={'text-[24px] font-semibold'}>0</strong>
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

   let _initialValues: ISchedule = {
      phoneNumber: '',
      location: '',
      cloths: []
   }

   const navigate = useNavigate()
   const getSchedule = useRecoilValue(ScheduleSelector)
   const { nextStep, prevStep, onStepChange, Steps } = useSteps()
   const [scheduleValues, setScheduleValues] = useState<ISchedule>(_initialValues)

   // SetValue
   const SetValue = (key: string, value: any) => {
      setScheduleValues(_value => ({
         ..._value,
         [key]: value
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
            {/* STEPS */}
            <Steps
               showIndicator={true}
               items={[
                  {
                     key: 'phoneNumberPhase',
                     // children: <PhoneNumberPhase initialValue={scheduleValues.phoneNumber} setValue={SetValue} />
                     children: <PhoneNumberPhase />
                  },
                  {
                     key: 'locationPhase',
                     children: <LocationPhase initialValue={scheduleValues.location} setValue={SetValue} />
                  },
                  {
                     key: 'seletionPhase',
                     children: <SelectItemsPhase initialValue={scheduleValues.cloths} setValue={SetValue} />
                  },
                  {
                     key: 'summaryPhase',
                     children: <SummaryPhase scheduleValue={scheduleValues} />
                  },
               ]} />
            {/* NEXT BUTTON */}
            <button type='button' disabled={isValidateStep()} onClick={nextStep}
               className={'flex flex-row justify-center items-center gap-2 rounded-2xl bg-secondary-color py-4 text-[white_16px] w-full place-self-center disabled:bg-opacity-70 disabled:cursor-not-allowed'}>
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