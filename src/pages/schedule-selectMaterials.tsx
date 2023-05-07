import { Spin } from "antd"
import { useFetch } from "@hooks/useFetch"
import { Material } from "@pages/schedule-material"
import { StoreContext } from "@/src/states/scheduleState"
import { useCallback, useContext, useEffect } from "react"
import { IMaterial } from "@commons/models/interfaces/imaterial"

export const SelectItemsPhase: React.FC = () => {

   const { state, dispatch } = useContext(StoreContext)

   const { data, error, isLoading } = useFetch<IMaterial[]>('http://18.209.48.108/materials', true) // end useFetch

   useEffect(() => {
      console.log('IN')
      setTimeout(() => {
         initiateMaterials(data)
      }, 0);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [data])

   const initiateMaterials = useCallback(
      (data: IMaterial[] | null) => {
         if (data) {
            // Set the first material as the first selected
            const selectedMaterials = [data[0]];
            const unSelectedMaterials = data.filter(material => material.id !== data[0].id)
            dispatch({
               type: 'SET_STATES',
               payload: {
                  ...state,
                  materials: data,
                  selectedMaterials,
                  unSelectedMaterials,
               },
            }) // end dispatch
            // Set unSelected Materials
         }
      },
      [],
   )
   // ADDMOREMATERIAL
   const addMoreMaterial = useCallback(
      () => {
         dispatch({
            type: 'SET_SELECTED_MATERIAL',
            payload: state.unSelectedMaterials[0]
         })
      },
      [dispatch, state.unSelectedMaterials],
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
                  <div className={'max-h-48 px-2 overflow-y-auto'}>
                     {
                        state.selectedMaterials.map(material => <Material key={material.id} materials={state.unSelectedMaterials} currentMaterial={material} />)
                     }
                  </div>
                  <>
                     {
                        (state.selectedMaterials?.length > 0 && state.unSelectedMaterials.length > 0) && (
                           <button className={'my-2 mx-auto w-auto h-10 bg-secondary-color rounded-2xl py-3 px-2 text-white hover:animate-pulse hover:bg-opacity-75'} onClick={addMoreMaterial}>
                              + Add More
                           </button>
                        )
                     }
                     {
                        (state.selectedMaterials?.length > 0) && (
                           <div className={'flex flex-row items-center justify-between w-full py-2 px-5 rounded-2xl bg-[#f1f1f1]'}>
                              <p className={'text-[18px]'}>Amount</p>
                              <strong className={'text-[24px] font-semibold'}>{state.totalAmountOnline}</strong>
                           </div>
                        )
                     }
                  </>
               </>
            )
         }
      </div >
   )
}