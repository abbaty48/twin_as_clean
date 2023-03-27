import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { Select, Space, InputNumber } from "antd"
import { DefaultOptionType } from "antd/es/select"
import { IMaterial } from "@commons/models/interfaces/imaterial"
import { ScheduleSelector } from "@recoil/selectors/scheduleSelector"

/** MATERIAL COMPONENT */
export const Material = (props: { materials: IMaterial[] }) => {

   const { materials } = props
   // 
   const { Option } = Select
   //
   const [{ cloths }, setSchedule] = useRecoilState(ScheduleSelector)
   //
   const [material, setMaterial] = useState<IMaterial>({
      name: materials[0].name,
      price: materials[0].price,
      quantity: materials[0].quantity,
      subPrice: materials[0].price * 1
   })

 /*   useEffect(() => {
      setSchedule((prevStates) => ({
         ...prevStates,
         cloths: [
            ...prevStates.cloths,
            { }
         ]
      }))

   }, []) */
   

   // console.log('METERIALS: ', materials)
   // console.log('METERIAL: ', material)

   const onQuantityChange = (quantity: number | null) => {
      const _updateMaterial = Object.assign({ ...material }, { ['quantity']: quantity!, ['subPrice']: material.price * material.quantity })
      console.log('UPDATE: ', _updateMaterial)
      setMaterial(_values => ({
         ..._updateMaterial
      }))
      const _updatedCloths =
         [...cloths].map(_cloth => {
            if (_cloth.name === _updateMaterial.name) {
               return { ..._cloth, quantity: quantity!, subPrice: _updateMaterial.subPrice }
            } else
               return _cloth
         });

      console.log('UPDATD CLOTHS', _updatedCloths)
      setSchedule((prevStates) => ({
         ...prevStates,
         cloths: _updatedCloths
      }))
   } // end onQuantityChange

   const onMaterialChange = (value: any, option: DefaultOptionType | DefaultOptionType[]) => {
      const { name, price } = JSON.parse(value) as { name: string, price: number }
      const _updateMaterial = Object.assign({ material }, { name, price, subPrice: price * material.quantity })
      setMaterial(_values => ({
         ..._values,
         ..._updateMaterial
      }))
      setSchedule((prevStates) => ({
         ...prevStates,
         cloths: [
            ...prevStates.cloths,
            { name, price, quantity: material.quantity, subPrice: _updateMaterial.subPrice }
         ]
      }))
   } // end onMaterialChange

   return <div className='flex flex-nowrap my-1 mx-3 items-center justify-between space-x-2 w-full'>
      <Select size='large' placeholder='Cloth Type' labelInValue={false}
         defaultValue={JSON.stringify({ name: material.name, price: material.price })}
         className={'my-3 flex-1 bg-white placeholder:text-[#919EAB]'}
         onChange={onMaterialChange}
      >
         {
            materials.map(_option =>
               <Option key={_option.name} value={JSON.stringify({ name: _option.name, price: _option.price })}>
                  <Space>
                     <span>{_option.name}</span>
                     <strong>({_option.price})</strong>
                  </Space>
               </Option>
            )
         }

      </Select>
      <InputNumber size='large' min={1} defaultValue={material.quantity} placeholder={'Quantity'}
         className={'my-3 border border-[#E1DFDD] placeholder:text-[#919EAB]'} onChange={onQuantityChange} />
   </div>
}
