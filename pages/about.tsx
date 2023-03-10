
import PersistentElementsContext, {  getLineDataFromRef } from "@/contexts/persistent-elements";
import { useContext, useEffect, useRef } from "react";

export default function About() {
    const lineCtx = useContext(PersistentElementsContext)
    const lineDockRef = useRef(null)

    function setLineData() {
        lineCtx?.setBackground("bg-backGray")
        if (lineDockRef.current) {
            lineCtx?.setLineData(getLineDataFromRef(lineDockRef.current))
        }
    }

    useEffect(() => {
        setLineData()
        lineCtx?.onPageChange(setLineData)
        return () => {
            lineCtx?.offPageChange(setLineData)
        }
    }, [])

    return (
        <div style={{ paddingTop: "150px" }}>
            hello this is about
            <div
                ref={lineDockRef}
                style={{
                    transform: "rotate(90deg)"
                }}
                className="w-[100px] h-[2px] ml-[100px]"
            />
        </div>
    )
}