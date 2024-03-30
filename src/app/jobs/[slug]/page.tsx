import React, { cache } from 'react'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import JobPage from '@/components/JobPage'
import { Button } from '@/components/ui/button'


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

export async function  generateStaticParams() {
    const jobs = await prisma.job.findMany({
        where:{approved:true},
        select:{slug:true}
    })

    return jobs.map(({slug}) => slug)
}

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

    const {applicationEmail,applicationUrl} = job

    const applicationLink = applicationEmail 
        ? `mailto:${applicationEmail}` 
        : applicationUrl;

        if( !applicationLink) {
            console.error("job has no application link or email");
            notFound();
        }
  return (
    <main className='max-w-5xl m-auto my-10 flex flex-col md:flex-row items-center gap-5 md:items-start px-3 '>
        <JobPage job={job} />
        <aside>
            <Button asChild>
                <a href={applicationLink} className='w-40 md:w-fit'>Apply Now</a>
            </Button>
        </aside>
    </main>
  )
}

export default page