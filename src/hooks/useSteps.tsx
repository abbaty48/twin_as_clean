import React, { ReactNode, useEffect, useRef, useState } from 'react'

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
const Indicators = (props: { Items: IStepItemProps[], currentIndex: number, showLabels?: boolean, activeColor?: string, inActiveColor?: string }) => {

   const { Items, currentIndex, showLabels, activeColor, inActiveColor } = props

   const _containerRef = useRef<HTMLUListElement>(null)

   return (
      <ul className='flex flex-row justify-center items-center overflow-x-auto my-1' ref={_containerRef}>
         {
            Items.map((_item, index) => {
               return <li key={_item.key}
                  className={`rounded h-[2px] flex-1 mr-2 inline-block ${index <= currentIndex ? activeColor ?? 'bg-secondary-color' : inActiveColor ?? 'bg-[#BDBDBD]'}`}>
                  {showLabels ? <span className={'inline-block text-center'}>{_item.label}</span> : ''}
               </li>
            }
            )
         }
      </ul >
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
      return < Child />
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
      }
   }
   /** */
   const onStepChange = () => {
      const { currentIndex, previousIndex, nextIndex } = track
      return { currentIndex, previousIndex, nextIndex }
   }

   const Steps = (props: IStepsProps) => {
      const { items, showLabel, activeColor, inActiveColor, showIndicator } = props
      // initialize the global items
      _items = items

      return (
         <>
            <CurrentChild activeIndex={track.currentIndex} items={items} />
            {showIndicator && <Indicators Items={items} currentIndex={track.currentIndex} showLabels={showLabel} activeColor={activeColor} inActiveColor={inActiveColor} />}
         </>
      )
   }

   return { nextStep, prevStep, onStepChange, Steps } as const
}
