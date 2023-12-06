import type { Metadata } from 'next'
import './globals.css'
import Header from './Components/Header'
import localFont from "next/font/local"
import { ReduxProvider } from './Redux/provider'


export const metadata: Metadata = {
  title: 'silver shop',
  description: 'this is online shop',
}

const yekanfont = localFont({
  src:"../public/font/Yekan-Font-3.0/Yekan.ttf"
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={yekanfont.className}>
       
        <ReduxProvider>
        <Header />
        {children}
        </ReduxProvider>

        
      
        </body>
    </html>
  )
}
