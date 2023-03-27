import { useEffect } from "react"
import { Material } from "@pages/schedule-material"
import { ScheduleState } from "@recoil/atoms/scheduleAtom"
import { AddMore, AddMoreOrientation } from "@components/addMore"
import { ScheduleSelector } from "@recoil/selectors/scheduleSelector"
import { useRecoilValue, useSetRecoilState, useRecoilCallback } from "recoil"

export const SelectItemsPhase = () => {

   const { totalAmountOnline, cloths } = useRecoilValue(ScheduleSelector)
   const setSchedule = useSetRecoilState(ScheduleState)

   // FETCH MATERIALS FROM SERVER
   const loadMaterial = () => {
      try {
         // return (await axios.get<IMaterial[]>('http://18.209.48.108/materials', { headers: { Accept: 'application/json' } })).dat
         return [
            {
               "id": "4fc05b5b-d92e-4bea-99ba-ef041fdcb8b3",
               "name": "Kaftan",
               "price": 3000,
               "quantity": 1,
               "subPrice": 0
            },
            {
               "id": "43ac1ce6-13da-4647-a49f-78618a0ab6a6",
               "name": "Trouser",
               "price": 1000,
               "quantity": 1,
               "subPrice": 0
            },
            {
               "id": "9e801216-b439-46dd-8a0b-0757e4488f03",
               "name": "T-Shirt",
               "price": 1000,
               "quantity": 1,
               "subPrice": 0
            },
            {
               "id": "56ecd752-474d-43aa-a08b-46409efe36dd",
               "name": "Short Nikka",
               "price": 400,
               "quantity": 1,
               "subPrice": 0
            },
            {
               "id": "6342de7b-b229-422e-8f60-bb8bd23e75a3",
               "name": "Hijab",
               "price": 550,
               "quantity": 1,
               "subPrice": 0
            },
            {
               "id": "b12d2d10-40b5-44a0-8079-3f4279c23529",
               "name": "Cap",
               "price": 3000,
               "quantity": 1,
               "subPrice": 0
            },
            {
               "id": "e411f23e-311b-4307-b2fe-69b978a9c7d2",
               "name": "Sallaya",
               "price": 1000,
               "quantity": 1,
               "subPrice": 0
            },
            {
               "id": "59ae5b6a-5489-4279-a1ec-5498fe876a5f",
               "name": "Abaya",
               "price": 1200,
               "quantity": 1,
               "subPrice": 0
            }
         ]
      } catch (error: any) {
         throw new Error(error.message)
      }
   }

   const setStates = useRecoilCallback(({ set }) => async () => {
      set(ScheduleSelector, (prevStates) => ({
         ...prevStates,
         cloths: [
            ...prevStates.cloths,
            { ...loadMaterial()[0] }
         ]
      }))
   })

   const addMoreChanges = (nodes: JSX.Element[], action: any) => {
      console.log('ONCHANGE', nodes, '-> ', action)
      if (action === 'added') {
         // const material = loadMaterial()[0]
         // console.log('MATERIALL :', material)
         /* setSchedule((prevStates) => ({
            ...prevStates,
            cloths: [
               ...prevStates.cloths,
               { ...material }
            ]
         })) */
      }
   }

   return (
      <div className={'flex flex-col justify-between space-y-2 my-1 m-auto w-11/12'}>
         <h1 className={'text-[32px] leading-10 font-medium'}>Select Items</h1>
         <p className={'text-lg leading-[132.2%]'}>Select cloth type and quantity</p>
         <div className={'max-h-48 overflow-y-auto'}>
            {
               <AddMore ReplicateNode={<Material materials={loadMaterial()} />}
                  orientation={AddMoreOrientation.Vertical}
                  addMoreButtonClass='text-3xl' removeButtonClass='text-2xl'
                  onChange={addMoreChanges}
               >
                  {
                     cloths.map(_option => (
                        <Material key={_option.name} materials={[{ ..._option }]} />
                     ))
                  }
               </AddMore>
            }
         </div>
         <div className={'flex flex-row items-center justify-between w-full py-2 px-5 rounded-2xl bg-[#f1f1f1]'}>
            <p className={'text-[18px]'}>Amount</p>
            <strong className={'text-[24px] font-semibold'}>{totalAmountOnline}</strong>
         </div>
      </div>
   )
}