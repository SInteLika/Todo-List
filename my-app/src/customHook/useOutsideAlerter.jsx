import {useEffect, useRef, useState} from "react";

export default function useOutsideAlerter(initialIsVisible){
    const [isShow, setIsShow] = useState(initialIsVisible)
    const refToggleElement = useRef(null)
    const refEl = useRef(null)
    function handleClickOutside(e){
        if(refEl.current && !refEl.current.contains(e.target)
            && !refToggleElement.current.contains(e.target)){
            setIsShow(false)
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    },[])
    return {refEl, refToggleElement, isShow, setIsShow}
}