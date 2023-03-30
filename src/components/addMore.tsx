import React, { ReactNode, useEffect, useState } from 'react'

export enum AddMoreOrientation { Horizonatal, Vertical }

interface IAddMore {
   disabled?: boolean
   children?: JSX.Element[]
   addMoreButtonTitle?: string
   addMoreButtonClass?: string
   addMoreButtonIcon?: ReactNode
   addMoreButtonStyle?: React.CSSProperties
   removeButtonTitle?: string
   removeButtonClass?: string
   removeButtonIcon?: ReactNode
   removeButtonStyle?: React.CSSProperties
   overlayContainerStyle?: React.CSSProperties
   overlayContainerClass?: string
   orientation?: AddMoreOrientation
   ReplicateNode: JSX.Element,
   onChange?: (nodes: JSX.Element[], action: 'added' | 'removed' | 'empty') => void
}

export const AddMore = (props: IAddMore) => {
   const {
      disabled,
      onChange, children,
      overlayContainerClass, overlayContainerStyle,
      addMoreButtonClass, addMoreButtonStyle, addMoreButtonTitle, addMoreButtonIcon,
      removeButtonClass, removeButtonStyle, removeButtonTitle, removeButtonIcon,
      orientation = AddMoreOrientation.Horizonatal, ReplicateNode } = props

   const styleSheet: React.CSSProperties = {
      display: 'flex',
      width: 'auto',
      flexWrap: 'wrap',
      pointerEvents: disabled ? 'none' : 'unset',
      flexDirection: orientation === AddMoreOrientation.Horizonatal ? 'row' : 'column'
   }

   const newNode = (childNode?: JSX.Element) => {
      const key = `node${Math.random().toString(32).slice(8)}`
      return (
         <div id={key} key={key} style={{ display: 'flex', margin: 3 }}>
            {childNode ?? ReplicateNode}
            <button title={removeButtonTitle ?? 'Remove'} type="button"
               className={removeButtonClass}
               style={{ margin: '3px 5px', ...removeButtonStyle }} onClick={() => {
                  removeNode(key)
               }}>
               {removeButtonIcon ?? '-'}
            </button>

         </div>
      )
   }
   const [nodes, setNodes] = useState<JSX.Element[]>(children?.length! > 0 ? [...children!.map(child => newNode(child))] : [newNode()])

   useEffect(() => {
      onChange?.call(this, nodes, nodes.length > 0 ? 'added' : 'empty')
   }, [])

   const addNode = () => {
      setNodes(prevNode => {
         const newNodes = [...prevNode, newNode()]
         onChange?.call(this, newNodes, 'added')
         return newNodes
      })
   }

   const removeNode = (key: string) => {
      setNodes(prevNodes => {
         if (prevNodes.length <= 1) return prevNodes
         const newNodes = prevNodes.filter(n => n.key?.toString() !== key)
         onChange?.call(this, newNodes, 'removed')
         return newNodes
      })
   }

   return (
      <div id='addMore' className={overlayContainerClass} style={{ ...styleSheet, ...overlayContainerStyle }}>
         {[...nodes]}
         <button title={addMoreButtonTitle ?? 'Add More'} type="button"
            className={addMoreButtonClass}
            style={addMoreButtonStyle} onClick={addNode}>
            {addMoreButtonIcon ?? '+'}
         </button>
      </div>
   )
}
