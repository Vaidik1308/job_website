import React, { cache } from 'react'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import JobPage from '@/components/JobPage'


type Props = {
    params:{slug:string}
}

const getJob = cache( async (slug:string) => {
    const job = await prisma.job.findUnique({
        where:{slug}
    });

    if(!job) notFound()
    return job
})

export async function generateMetadata({
    params:{slug},
}:Props): Promise<Metadata> {
    const job = await getJob(slug)
    return {
        title:job.title
    }
}

const page = async ({params}: Props) => {
    const job = await getJob(params.slug)
  return (
    <main className='max-w-5xl m-auto my-10 flex flex-col md:flex-row items-center gap-5 md:items-start'>
        <JobPage job={job} />
    </main>
  )
}

export default page