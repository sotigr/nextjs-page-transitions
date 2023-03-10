import Header from '@/components/Header'
import TransformLine from '@/components/TransformLine' 
import PersistentElementsContext, {  LineTransformData, PersistentElementsPayload } from '@/contexts/persistent-elements'
 
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import Router from "next/router"
import { useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {

  const [transformation, setTransformation] = useState<LineTransformData>()
  
  const [bg, setBg] = useState<string>(pageProps.defaultBg || "bg-backGray")

  const lineTrPayload: PersistentElementsPayload = {
    setLineData: setTransformation,
    setBackground: setBg,
    onPageChange(cb) {
      Router.events.on("routeChangeComplete", cb)
      Router.events.on("routeChangeError", cb)
    },
    offPageChange(cb) {
      Router.events.off("routeChangeComplete", cb)
      Router.events.off("routeChangeError", cb)
    },
  }

  return <div> 
    <div className={`${bg} transition-all duration-300 fixed z-[-1] top-0 left-0 w-[100vw] h-[100vh]`} /> 
      <TransformLine transformation={transformation} />
      <PersistentElementsContext.Provider value={lineTrPayload}>
        <Header />
        <Component {...pageProps} />
      </PersistentElementsContext.Provider> 
  </div>

}
