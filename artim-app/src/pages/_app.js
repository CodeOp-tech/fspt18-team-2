import "../styles/globals.css"
//import '@/styles/globals.css'
import { Toaster } from "react-hot-toast"
import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import Menu from './Menu';

export default function App({ Component, pageProps }) {
  return (
    <>
      <NextUIProvider>
        <div className='app'>
          <Menu/>
          <Component {...pageProps} />
          <Toaster />
        </div>
    </NextUIProvider>
    </>
  );
}

/*
//import '@/styles/globals.css'
import "../styles/globals.css"
import { Toaster } from "react-hot-toast"

export default function App({ Component, pageProps }) {
  return (
    <>
      <Toaster />
      <Component {...pageProps} />
    </>
  )
  */