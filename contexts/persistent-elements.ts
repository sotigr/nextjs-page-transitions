import getOffset from "@/helpers/get-offset"
import React from "react"

export type LineTransformData = {
    top: number
    left: number
    width: number
    height: number
    transform: string
    transformOrigin: string
}
 

export type PersistentElementsPayload = {
    setLineData: (data: LineTransformData) => void,
    setBackground: (bg: string) => void,
    onPageChange: (cb: () => void) => void,
    offPageChange: (cb: () => void) => void
}

export function getLineDataFromRef(element: HTMLElement): LineTransformData {
    const refLine = element

    const offset = getOffset(refLine as HTMLElement);
    return {
        top: offset.top,
        left: offset.left,
        width: refLine?.clientWidth,
        height: refLine?.clientHeight,
        transform: refLine?.style.transform,
        transformOrigin: "0 0"
    }
}


const PersistentElementsContext = React.createContext<PersistentElementsPayload | null>(null)
export default PersistentElementsContext