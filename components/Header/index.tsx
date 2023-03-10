import Link from "next/link";

export default function Header () {
    return ( 
        <>
            <div>
                <Link href="/" >index {"-->"}</Link>
            </div>
            
            <div>
                <Link href="/about" >about {"-->"}</Link>
            </div>

            <div>
                <Link href="/about2" >about2 {"-->"}</Link>
            </div>
        </>
    )
}