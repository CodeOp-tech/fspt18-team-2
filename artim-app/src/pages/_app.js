import "../styles/globals.css"
import { Toaster } from "react-hot-toast"
import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import Menu from './Menu';

export default function App({ Component, pageProps }) {
  return (
    <>
    <NextUIProvider>
      <div className='app'>
        <Menu />
        <main className="max-w-screen-lg w-full mx-auto px-2 my-6">
          <Component {...pageProps} />
           <Toaster />
          </main>
    </div>
    </NextUIProvider>
    </>
  );
}

  