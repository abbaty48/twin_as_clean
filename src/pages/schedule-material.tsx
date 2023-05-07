import { ReactSVG } from "react-svg"
import { useContext, useState } from "react"
import { Select, Space, InputNumber } from "antd"
import { StoreContext } from "@/src/states/scheduleState"
import { IMaterial } from "@commons/models/interfaces/imaterial"

import CloseSVG from '@svgs/x.svg'

/** MATERIAL COMPONENT */
export const Material = (props: { materials: IMaterial[], currentMaterial: IMaterial }) => {

   const { materials, currentMaterial } = props
   //
   const [material, setMaterial] = useState<IMaterial>({
      id: currentMaterial?.id,
      name: currentMaterial?.name,
      price: currentMaterial?.price,
      quantity: currentMaterial?.quantity,
   })
   //
   const { state, dispatch } = useContext(StoreContext)
   //
   const onQuantityChange = (targetId: string, quantity: number) => {
      const _updateMaterial = Object.assign({ ...material }, { 'quantity': quantity! })
      setMaterial(_values => ({
         ..._updateMaterial
      }))
      //
      dispatch({
         type: 'SET_MATERIAL_QUANTITY',
         payload: { materialID: targetId, quantity }
      }) // end setSchedule
   } // end onQuantityChange

   const onMaterialChange = (value: any) => {
      const { id } = JSON.parse(value.value) as { targetId: string, id: string }
      //
      const selectedMaterial = materials.find(material => material.id === id)
      //
      setMaterial(selectedMaterial!)
      dispatch({
         type: 'CHANGE_SELECTED_MATERIAL',
         payload: { sourceMaterial: material, destMaterial: selectedMaterial! }
      }) // end setSchedule
      // 
   } // end onMaterialChange

   const onUnSelectMaterial = (material: IMaterial) => {
      // unselect this material
      // prevent the last unselected items from removing
      // if this is the first or last item in the unSelectedMaterial state
      if (state.selectedMaterials.length <= 1) return
      // dispatch otherwise
      dispatch({
         type: 'SET_UNSELECTED_MATERIAL',
         payload: material
      })
   }

   return <div className='flex flex-nowrap my-1 items-center justify-between space-x-2 relative'>
      <Select size='large' placeholder='Material Type' labelInValue={true} bordered={false}
         defaultValue={{
            value: JSON.stringify({ targetId: material.id, id: material.id }),
            label: (<Space>
               <span>{material.name}</span>
               <strong className="text-orange-600 font-extrabold">({material.price})</strong>
            </Space>)
         }}
         className={'py-2 bg-white placeholder:text-[#919EAB] w-9/12 border border-[#919EAB] h-[56px] rounded-2xl'}
         onChange={onMaterialChange}
         options={
            materials.map(_option => ({
               value: JSON.stringify({ targetId: material.id, id: _option.id }),
               label: (
                  <Space>
                     <span>{_option.name}</span>
                     <strong className="text-orange-600 font-extrabold">({_option.price})</strong>
                  </Space>
               ),
            }))
         }
      />

      <InputNumber size='large' min={1} defaultValue={material.quantity} placeholder={'Quantity'}
         className={'py-2 placeholder:text-[#919EAB] border border-[#919EAB] h-[56px] rounded-2xl'}
         onChange={(newQuantity) => onQuantityChange(material.id, newQuantity ?? 1)} />
      <button disabled={state.selectedMaterials.length <= 1}
         className={`hover:bg-red-500 hover:rounded-full hover:animate-pulse flex items-center w-4 h-4 disabled:pointer-events-none disabled:bg-opacity-25`}
         onClick={() => onUnSelectMaterial(material)}>
         <ReactSVG src={CloseSVG} />
      </button>
   </div>
}
