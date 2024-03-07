import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default:"Naukri",
    // default is for the pages which don't have any meta data or any particular name to specify the page
    template: "%s | Naukri" // works only on child components
  },
  description: 'Find Your dream Developer Job',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-w-[350px] `}>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}
