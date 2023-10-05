import '@/styles/globals.css'
import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import Menu from './Menu';

export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <div className='app'>
        <Menu/>
      <Component {...pageProps} />
    </div>
    </NextUIProvider>

  );
}
