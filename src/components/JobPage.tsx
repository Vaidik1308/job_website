import { Job } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
    job:Job
}

const JobPage = ({
    job:{
        title,
        description,
        companyName,
        applicationUrl,
        type,
        location,
        locationType,
        salary,
        companyLogoUrl,
    }
}: Props) => {
  return (
    <div className='w-full grow space-y-5 '>
        <div className='flex items-center gap-3'>
            {
                companyLogoUrl && (
                    <Image
                        src={companyLogoUrl}
                        alt='company_logo'
                        width={100}
                        height={100}
                        className='rounded-xl'
                    />
                )
            }
        </div>
        <div className=''>
            <h1 className='text-xl font-bold'>{title}</h1>
            <p className='font-semibold'>
                {
                    applicationUrl ? (
                        <Link href={new URL(applicationUrl).origin}>
                            {companyName}
                        </Link>
                    ) : (
                        <span>{companyName}</span>
                    )
                }
            </p>

        </div>
    </div>
  )
}

export default JobPage