import { ReactSVG } from 'react-svg'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import ArrowRight from '@svgs/arrow-right.svg'

interface IStepsProps {
   activeColor?: string,
   inActiveColor?: string,
   items: IStepItemProps[],
   onStepChange?: (currentKey: number, previousKey: number, nextKey: number) => void
}

interface IStepItemProps {
   key: React.Key,
   label?: ReactNode,
   children: ReactNode
}
/** INDICATORS */
const Indicators = (props: { Items: IStepItemProps[] }) => {

   const { Items } = props

   const _containerRef = useRef<HTMLUListElement>(null)

   return (
      <ul className='flex flex-row justify-center items-center overflow-x-auto my-1' ref={_containerRef}>
         {
            Items.map(_item =>
               <li key={_item.index} className={`rounded h-[2px] flex-1 mr-2 inline-block ${_item.active ? 'bg-secondary-color' : 'bg-[#BDBDBD]'}`}
               ></li>)
         }
      </ul>
   )
}
/** STEPS */
const Steps: React.FC<IStepsProps> = (props) => {

   let { items, onStepChange } = props
   const [_items, set_items] = useState<IStepItemProps[]>(items)
   const [_activeKey, setActiveKey] = useState<number>(0)
   const [track, setTrack] = useState({
      currentKey: 0,
      previousKey: 0,
      nextKey: 1
   })

   useEffect(() => {
      const _currentKey = activeIndex ?? items[0].index
      setActiveKey(_currentKey)
      setTrack({
         currentKey: _currentKey,
      })
   }, [activeKey])


   /** */
   const CurrentChild = (props: { activeKey: number, items: IStepItemProps[] }) => {
      const { activeKey, items } = props
      const Child = () => items.find(_item => _item.index === activeKey)?.children! as JSX.Element
      return <Child />
   }

   const nextStep = () => {
      const _currentIndex = items.findIndex(i => i.index === _activeKey);
      if (_currentIndex < items.length - 1) {
         const _newItems = _items.map(_item => {
            if (_item.index === number(_currentIndex + 1)) {
               _item.active = true
            }
            return _item
         })
         const _currentKey = items[_currentIndex + 1]?.index,
            _previousKey = items[Number(_currentKey) - 1 <= 0 ? 0 : Number(_currentKey) - 1]?.index,
            _nextKey = items[_currentIndex + 1]?.index;

         console.log('CK: ', _currentKey, ' PK: ', _previousKey, ' NK: ', _nextKey)
         set_items(_newItems)
         setActiveKey(_currentKey)
         // 
         onStepChange?.call(this, _currentKey, _previousKey, _nextKey)
      }
   }
   const prevStep = () => {
      const _currentIndex = items.findIndex(i => i.index === _activeKey);
      if (_currentIndex < items.length - 1) {
         const _newItems = _items.map(_item => {
            if (_item.index === number(_currentIndex)) {
               _item.active = false
            }
            return _item
         })
         set_items(_newItems)
         setActiveKey(items[_currentIndex - 1]?.index)
      }
   }

   return (
      <>
         <CurrentChild activeKey={_activeKey} items={items} />
         <Indicators Items={_items} />
         <button type='button' onClick={nextStep} className={'flex flex-row justify-center items-center gap-2 rounded-2xl bg-secondary-color py-4 text-[white_16px] w-full place-self-center'}>
            <strong className={'text-white'}>Next</strong>
            <ReactSVG src={ArrowRight} />
         </button>
      </>
   )
}

export default Steps




   < Steps activeKey = { step.currentKey }
onStepChange = {(currentKey, previousKey, nextKey) =>
setStep({ currentKey, previousKey, nextKey })
               }
items = {
   [
      {
         label:
            children: < PhoneNumberPhase setValue = { SetValue } />
                  },
{
   active: false,
   children: <LocationPhase setValue={SetValue} />
},
{
   active: false,
   children: <SelectItemsPhase setValue={SetValue} />
},
{
   key: '3',
   active: false,
   children: <SummaryPhase scheduleValue={scheduleValue} />
},
               ]} />