import { ReactSVG } from 'react-svg'
import React, { ReactNode, useRef, useState } from 'react'


import ArrowRight from '@svgs/arrow-right.svg'

interface IStepsProps {
   showLabel?: boolean;
   showIndicator?: boolean;
   inActiveColor?: string,
   activeColor?: string,
   items: IStepItemProps[],
}

interface IStepItemProps {
   key: React.Key,
   label?: ReactNode,
   children: ReactNode
}
/** INDICATORS */
const Indicators = (props: { Items: IStepItemProps[], currentIndex: number, showLabels?: boolean }) => {

   const { Items, currentIndex, showLabels } = props

   const _containerRef = useRef<HTMLUListElement>(null)

   return (
      <ul className='flex flex-row justify-center items-center overflow-x-auto my-1' ref={_containerRef}>
         {
            Items.map((_item, index) => {
               return <li key={_item.key} className={`rounded h-[2px] flex-1 mr-2 inline-block ${index <= currentIndex ? 'bg-secondary-color' : 'bg-[#BDBDBD]'}`}>
                  {showLabels ? <span className={'inline-block text-center'}>{_item.label}</span> : ''}
               </li>
            }
            )
         }
      </ul>
   )
}
/** STEPS */
export const useSteps = () => {

   // 
   let _items: IStepItemProps[] = []
   // 
   const [track, setTrack] = useState({
      currentIndex: 0,
      previousIndex: 0,
      nextIndex: _items?.length ? 1 : 0
   })
   /** */
   const CurrentChild = (props: { activeIndex: number, items: IStepItemProps[] }) => {
      const { activeIndex, items } = props
      const Child = () => items[activeIndex].children as JSX.Element
      return <Child />
   }

   /** nextStep -> move to the next step */
   const nextStep = () => {
      const { currentIndex } = track
      if (currentIndex < _items.length - 1) {

         const _currentIndex = currentIndex + 1, // increment currentIndex by 1
            _previousIndex = _currentIndex - 1, // subtract 1 from currentIndex
            _nextIndex = _currentIndex + 1; // increment currentIndex by 1

         // set the tracks
         setTrack({ currentIndex: _currentIndex, previousIndex: _previousIndex, nextIndex: _nextIndex })
         // call the onStepChange
         onStepChange?.call(this, _currentIndex, _previousIndex, _nextIndex)
      }
   }
   /** prevStep -> move back to the previous step */
   const prevStep = () => {
      const { currentIndex } = track
      if (currentIndex > 0) {

         const _currentIndex = currentIndex - 1, // increment currentIndex by 1
            _previousIndex = _currentIndex - 1 < 0 ? 0 : _currentIndex - 1, // subtract 1 from currentIndex
            _nextIndex = _currentIndex + 1; // increment currentIndex by 1
         // set the tracks
         setTrack({ currentIndex: _currentIndex, previousIndex: _previousIndex, nextIndex: _nextIndex })
         // call the onStepChange
         onStepChange?.call(this, _currentIndex, _previousIndex, _nextIndex)
      }
   }
   /** onStepChange -> triggered when the nextStep or prevStep are fired. */
   const onStepChange = (currentIndex: number, previousIndex: number, nextIndex: number) => {
      setTrack({ currentIndex, previousIndex, nextIndex })
   }

   const Steps = (props: IStepsProps) => {
      const { items, showLabel, activeColor, inActiveColor, showIndicator } = props
      // initialize the global items
      _items = items

      return (
         <>
            <CurrentChild activeIndex={track.currentIndex} items={items} />
            <Indicators Items={items} currentIndex={track.currentIndex} />
            <button type='button' onClick={nextStep} className={'flex flex-row justify-center items-center gap-2 rounded-2xl bg-secondary-color py-4 text-[white_16px] w-full place-self-center'}>
               <strong className={'text-white'}>Next</strong>
               <ReactSVG src={ArrowRight} />
            </button>
         </>
      )
   }

   return { nextStep, prevStep, onStepChange, Steps } as const
}
