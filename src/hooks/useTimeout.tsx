import { useRef, useEffect } from "react"

export const useTimeout = () => {
   const _timeout = useRef<ReturnType<typeof setTimeout> | null>(null)

   useEffect(() => () => {
      if (_timeout.current) {
         clearTimeout(_timeout.current)
         _timeout.current = null
      }

   }, [])
   return _timeout
}