import Header from '@/components/Header'
import TransformLine from '@/components/TransformLine'
import PersistentElementsContext, { LineTransformData, PersistentElementsPayload } from '@/contexts/persistent-elements'

import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import Router from "next/router"
import { useEffect, useState } from 'react'
import noise from '../public/noise.png'
export default function App({ Component, pageProps }: AppProps) {

  const [transformation, setTransformation] = useState<LineTransformData>()

  const [bg, setBg] = useState<string>(pageProps.defaultBg || "bg-backGray")

  const [opacity, setOpacity] = useState<string>("opacity-1")

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

  useEffect(() => {

    function dimOpacity() {
      setOpacity("opacity-0")
    }

    function resetOpacity() {
      setTimeout(() => {
      
        setOpacity("opacity-1")
      }, 800);
    }

    Router.events.on("routeChangeStart", dimOpacity)
    Router.events.on("routeChangeComplete", resetOpacity)
    return () => {
      Router.events.off("routeChangeStart", dimOpacity)
      Router.events.off("routeChangeComplete", resetOpacity)
    }
  }, [])

  return <div>
    <div style={{backgroundImage: `url(${noise.src})`}} className={`${bg} transition-colors  duration-500 fixed z-[-1] top-0 left-0 w-[100vw] h-[100vh]`} />
    <TransformLine transformation={transformation} />
    <PersistentElementsContext.Provider value={lineTrPayload}>
      <Header />
      <div className={`${opacity} transition-opacity duration-700`}>
        <Component {...pageProps} />
      </div>
    </PersistentElementsContext.Provider>
  </div>

}
