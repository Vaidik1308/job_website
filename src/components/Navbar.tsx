import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '@/assets/logo.png'
import { Button } from './ui/button'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <header className='shadow-sm'>
        <nav className='max-w-5xl m-auto px-3 py-5 flex items-center justify-between'>
            <Link href={"/"} className='flex items-center gap-3'>
                <Image
                    src={logo}
                    width={40}
                    height={40}
                    alt='naukri logo'
                />
                <span className='text-xl font-bold tracking-tight'>
                    Naukri
                </span>
            </Link>
            {/* asChild will be used to put any other html element in the button so that button will be acting as that of that tag and in inspect it will be same as element we mentioned */}
            <Button asChild> 
                <Link href={"/jobs/new"}>
                    Post a Job
                </Link>
            </Button>
        </nav>
    </header>
  )
}

export default Navbar