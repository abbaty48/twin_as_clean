import { ReactSVG } from "react-svg"
import { useContext, useState } from "react"
import { Select, Space, InputNumber } from "antd"
import { DefaultOptionType } from "antd/es/select"
import { StoreContext, StateActions } from "@stores/store"
import { IMaterial } from "@commons/models/interfaces/imaterial"

import CloseSVG from '@svgs/x.svg'

/** MATERIAL COMPONENT */
export const Material = (props: { materials: IMaterial[] }) => {

   const { materials } = props
   // 
   const { Option } = Select
   //
   const [material, setMaterial] = useState<IMaterial>({
      id: materials[0]?.id,
      name: materials[0]?.name,
      price: materials[0]?.price,
      quantity: materials[0]?.quantity,
      subPrice: materials[0]?.price * 1
   })
   //
   const { state, dispatch } = useContext(StoreContext)!;
   //
   const onQuantityChange = (targetId: string, quantity: number | null) => {
      const _updateMaterial = Object.assign({ ...material }, { 'quantity': quantity!, 'subPrice': material.price * material.quantity })
      setMaterial(_values => ({
         ..._updateMaterial
      }))
      //
      dispatch({
         type: StateActions.SET_SELECTED_MATERIALS,
         payload: [
            ...state.selectedMaterials.map(material => {
               if (material.id === targetId) {
                  return { ...material, ..._updateMaterial }
               }
               return material
            }) // end map
         ], // end selectedMaterials
      }) // end setSchedule
   } // end onQuantityChange

   const onMaterialChange = (value: any, option: DefaultOptionType | DefaultOptionType[]) => {
      const { targetId, id, name, price } = JSON.parse(value) as { targetId: string, id: string, name: string, price: number }
      //
      const _updateMaterial = Object.assign({ ...material }, { name, price, subPrice: price * material.quantity })
      //
      setMaterial(_values => ({
         ..._updateMaterial
      }))
      dispatch({
         type: StateActions.SET_SELECTED_MATERIALS,
         payload: [
            ...state.selectedMaterials.map(material => {
               if (material.id === targetId) {
                  return { ...material, ..._updateMaterial }
               }
               return material
            }) // end map
         ], // end selectedMaterials
      }) // end setSchedule
   } // end onMaterialChange

   return <div className='flex flex-nowrap my-1 items-center justify-between space-x-2 relative'>
      <Select size='large' placeholder='Cloth Type' labelInValue={false} bordered={false}
         defaultValue={material.name}
         className={'py-2 bg-white placeholder:text-[#919EAB] w-9/12 border border-[#919EAB] h-[56px] rounded-2xl'}
         onChange={onMaterialChange}
      >
         {
            materials.map(_option =>
               <Option key={_option.name} value={JSON.stringify({ targetId: material.id, id: _option.id, name: _option.name, price: _option.price })}>
                  <Space>
                     <span>{_option.name}</span>
                     <strong>({_option.price})</strong>
                  </Space>
               </Option>
            )
         }

      </Select>

      <InputNumber size='large' min={1} defaultValue={material.quantity} placeholder={'Quantity'}
         className={'py-2 placeholder:text-[#919EAB] border border-[#919EAB] h-[56px] rounded-2xl'}
         onChange={(newQuantity) => onQuantityChange(material.id, newQuantity)} />
      <button className={'hover:bg-none hover:animate-pulse flex items-center w-4 h-4'}>
         <ReactSVG src={CloseSVG} />
      </button>
   </div>
}
