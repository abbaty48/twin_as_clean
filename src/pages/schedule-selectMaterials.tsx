import axios from "axios"
import { Spin } from "antd"
import { Async } from "react-async"
import { Material } from "@pages/schedule-material"
import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil"
import { ISchedule } from "@commons/models/interfaces/ischedule"
import { IMaterial } from "@commons/models/interfaces/imaterial"
import { ScheduleSelector } from "@recoil/selectors/scheduleSelector"
import { useEffect } from "react"
import { ScheduleState } from "../recoil/atoms/scheduleAtom"

export const SelectItemsPhase: React.FC = () => {

   // const scheduleState = useRecoilValue(ScheduleSelector)
   const [scheduleState, setScheduleState] = useRecoilState(ScheduleState)

   // FETCH MATERIALS FROM SERVER
   const loadMaterial = async () => {
      try {
         // return (await axios.get<IMaterial[]>('http://18.209.48.108/materials', { headers: { Accept: 'application/json' } })).data
         const materials = [
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
         ];
         return Promise.resolve(materials)
      } catch (error: any) {
         throw new Error(error.message)
      }
   }
   
   const setSchedule = useRecoilCallback(({ set }) => {
      return (newState: ISchedule) => {
         set(ScheduleSelector, newState)
      }
   })

   const addMoreMaterial = () => {
      const unSelectedMaterials = scheduleState.materials.filter(_m => scheduleState.selectedMaterials.find(_s => _s.id !== _m.id))
      let selectedMaterials = scheduleState.selectedMaterials;
      selectedMaterials = [...selectedMaterials, { ...unSelectedMaterials[0] }]
      // console.log('SM: ', selectedMaterials)
      // console.log('USM:', unSelectedMaterials)
      setSchedule({
         ...scheduleState,
         unSelectedMaterials,
         selectedMaterials
      })
      // setScheduleState((prevState) => ({
      //    ...prevState,
      //    selectedMaterials,
      //    unSelectedMaterials
      // }))
   }


   const loadOnResolve = (materials: IMaterial[]) => {
      try {
         setSchedule(
            {
               ...scheduleState,
               materials,
               unSelectedMaterials: materials,
               selectedMaterials: [{ ...materials[0] }]
            }
         )
      } catch (error) { }
   }

   return (
      <div className={'flex flex-col justify-between space-y-2 my-1 m-auto w-11/12'}>
         <h1 className={'text-[32px] leading-10 font-black text-black'}>Select Items</h1>
         <p className={'text-lg leading-[132.2%]'}>Select cloth type and quantity</p>
         <Async promiseFn={loadMaterial} onResolve={loadOnResolve}>
            {
               ({ data, error, isLoading }) => {
                  if (isLoading) return <Spin size='large' spinning={true} className={'place-self-center object-center'} />
                  if (error) return <p className={'my-4 text-center text-orange-700 font-semibold text-xs'}>Oops!! something went wrong: {error.message}</p>
                  if (data) {
                     if (data.length <= 0) {
                        return <p>No Material available yet!.</p>
                     } else {

                        return <>
                           {
                              scheduleState.selectedMaterials.map(_option => (
                                 <Material key={_option.name} materials={scheduleState.unSelectedMaterials} />
                              ))
                           }
                           <button className={'my-2 w-auto m-auto h-10 border border-secondary-color rounded-2xl py-2 px-2'} onClick={addMoreMaterial}>
                              + Add More
                           </button>
                        </>
                     } // end else
                  } // end if data
                  return null
               }
            }
         </Async>

         <div className={'flex flex-row items-center justify-between w-full py-2 px-5 rounded-2xl bg-[#f1f1f1]'}>
            <p className={'text-[18px]'}>Amount</p>
            {/* <strong className={'text-[24px] font-semibold'}>{totalAmountOnline}</strong> */}
         </div>
      </div>
   )
}