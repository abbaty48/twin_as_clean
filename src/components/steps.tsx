import { ReactSVG } from 'react-svg'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import ArrowRight from '@svgs/arrow-right.svg'

interface IStepsProps {
   activeKey?: string,
   activeColor?: string,
   inActiveColor?: string,
   items: IStepItemProps[],
   onStepChange?: (currentKey: string, previousKey: string, nextKey: string) => void
}

interface IStepItemProps {
   key: string,
   active: boolean,
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
               <li key={_item.key} className={`rounded h-[2px] flex-1 mr-2 inline-block ${_item.active ? 'bg-secondary-color' : 'bg-[#BDBDBD]'}`}
               ></li>)
         }
      </ul>
   )
}
/** STEPS */
const Steps: React.FC<IStepsProps> = (props) => {

   let { items, activeKey, onStepChange } = props
   const [_items, set_items] = useState<IStepItemProps[]>(items)
   const [_activeKey, setActiveKey] = useState<string>(activeKey ?? items[0].key)

   /** */
   const CurrentChild = (props: { activeKey: string, items: IStepItemProps[] }) => {
      const { activeKey, items } = props
      const Child = () => items.find(_item => _item.key === activeKey)?.children! as JSX.Element
      return <Child />
   }

   const nextStep = () => {
      const _currentIndex = items.findIndex(i => i.key === _activeKey);
      if (_currentIndex < items.length - 1) {
         const _newItems = _items.map(_item => {
            if (_item.key === String(_currentIndex + 1)) {
               _item.active = true
            }
            return _item
         })
         const _currentKey = items[_currentIndex + 1]?.key,
            _previousKey = items[_currentIndex <= 0 ? 0 : _currentIndex - 1]?.key,
            _nextKey = items[_currentIndex + 2]?.key;

         set_items(_newItems)
         setActiveKey(_currentKey)
         // 
         onStepChange?.call(this, _currentKey, _previousKey, _nextKey)
      }
   }
   const prevStep = () => {
      const _currentIndex = items.findIndex(i => i.key === _activeKey);
      if (_currentIndex < items.length - 1) {
         const _newItems = _items.map(_item => {
            if (_item.key === String(_currentIndex)) {
               _item.active = false
            }
            return _item
         })
         set_items(_newItems)
         setActiveKey(items[_currentIndex - 1]?.key)
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