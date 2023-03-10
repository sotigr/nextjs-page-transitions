import PersistentElementsContext, { getLineDataFromRef } from "@/contexts/persistent-elements";
import { useContext, useEffect, useRef } from "react";

import FlipNumbers from 'react-flip-numbers';

export default function Index() {
    const lineCtx = useContext(PersistentElementsContext)
    const lineDockRef = useRef(null)

    function setLineData() {

        lineCtx?.setBackground("bg-backBlue")
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
            hello
            <div style={{ display: "flex", fontSize: "18px", fontFamily: "sans-serif", fontWeight: "bold" }}>

                <span className="text-black">+</span>
                <FlipNumbers
                    height={18}
                    width={14}
                    color="black"
                    background="transparent"
                    play
                    perspective={100}
                    duration={3}
                    numbers="75" />
            </div>

            <div
                ref={lineDockRef}
                className="w-[100px] h-[2px] ml-[20px]"
            />


        </div>
    )
}
export async function getStaticProps() {
    return {
        props: {
            defaultBg: "bg-backBlue"
        },
    }
}
