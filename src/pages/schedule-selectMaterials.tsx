import { Spin } from "antd"
import { useFetch } from "@hooks/useFetch"
import { useCallback, useContext } from "react"
import { Material } from "@pages/schedule-material"
import { StoreContext, StateActions } from "@stores/store"
import { IMaterial } from "@commons/models/interfaces/imaterial"

export const SelectItemsPhase: React.FC = () => {

   const { state, dispatch } = useContext(StoreContext);
   const { data, error, isLoading } = useFetch<IMaterial[]>('http://18.209.48.108/materials', (data) => {
      initialDispatch(data)
   }) // end useFetch

   const initialDispatch = useCallback(
      (data: IMaterial[]) => {
         dispatch({
            type: StateActions.SET_STATES,
            payload: {
               ...state,
               materials: data,
               unSelectedMaterials: data,
               selectedMaterials: [data[0]],
            }
         }) // end dispatch
      },
      [dispatch, state],
   )
   // ADDMOREMATERIAL
   const addMoreMaterial = useCallback(
      () => {
         const unSelectedMaterials = state.materials.filter(_m => state.selectedMaterials.find(_s => _s.id !== _m.id));
         const selectedMaterials = [...state.selectedMaterials, { ...unSelectedMaterials[0] }];

         dispatch({
            type: StateActions.SET_STATES,
            payload: {
               ...state,
               selectedMaterials,
               unSelectedMaterials
            }
         })
      },
      [dispatch, state],
   )

   return (
      <div className={'flex flex-col justify-between space-y-2 my-1 m-auto w-11/12'}>
         <h1 className={'text-[32px] leading-10 font-black text-black'}>Select Items</h1>
         <p className={'text-lg leading-[132.2%]'}>Select cloth type and quantity</p>
         {isLoading && <Spin size='large' spinning={isLoading} className={'place-self-center object-center'} />}
         {error && <p className={'my-4 text-center text-orange-700 font-semibold text-xs'}>Oops!! something went wrong: {error}</p>}
         {
            data &&
               (data?.length <= 0) ? <p>No Material available yet!.</p> : (
               <>
                  <div className={'max-h-48 overflow-y-auto'}>
                     {
                        state.selectedMaterials?.map(_option => (
                           <Material key={_option.name} materials={state.unSelectedMaterials} />
                        ))
                     }
                  </div>
                  {
                     state.selectedMaterials?.length > 0 && (
                        <>
                           <button className={'my-2 w-full h-10 bg-secondary-color rounded-2xl py-3 px-2'} onClick={addMoreMaterial}>
                              + Add More
                           </button>
                           <div className={'flex flex-row items-center justify-between w-full py-2 px-5 rounded-2xl bg-[#f1f1f1]'}>
                              <p className={'text-[18px]'}>Amount</p>
                              <strong className={'text-[24px] font-semibold'}>{state.totalAmountOnline}</strong>
                           </div>
                        </>
                     )
                  }
               </>
            )
         }
      </div >
   )
}