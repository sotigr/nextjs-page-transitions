import { LineTransformData } from "@/contexts/persistent-elements"

 
type Props = {
    transformation?: LineTransformData
}

export default function TransformLine({ transformation }: Props) {
    if (!transformation) return null
    return (
        <div
            className="bg-black fixed z-2 transition-all delay-200 duration-700"
            style={transformation}
        />
    )
}