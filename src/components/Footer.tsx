import Link from 'next/link'
import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className='min-h-[40vh] max-w-5xl mx-auto'>
        <div className='flex justify-between items-center flex-col md:flex-row'>
          <div className='flex flex-col md:gap-2'>
            <h1 className='text-3xl font-bold tracking-tighter'>Naukri</h1>
            <p className='text-muted-foreground font-semibold'>Connecting talent with opportunities</p>
          </div>
          <div className='flex gap-2 md:gap-8 text-muted-foreground font-semibold flex-col md:flex-row justify-start md:justify-end w-[80%] mt-4 md:mt-0 mx-auto'>
            <Link href={"/"}>About US </Link>
            <Link href={"/"}>Contact</Link>
            <Link href={"/"}>Term of Service</Link>
            <Link href={"/"}>Privacy Policy</Link>
          </div>
        </div>
        <div  className='w-full justify-center items-center mt-8'>
          <p className='text-muted-foreground w-full flex justify-center'>@ 2024 Naukri Inc. All rights reserved</p>
        </div>
    </footer>
  )
}

export default Footer