import React from 'react'
import JobListItem from './JobListItem'
import prisma from "@/lib/prisma"
import { JobFilterValues } from '@/lib/validation'
import { Prisma } from '@prisma/client'

type JobResultsProps = {
  filterValues: JobFilterValues
}


  // console

const JobResults = async ({filterValues:{q,type,remote,location}}:JobResultsProps) => {

  const searchString = q?.split(" ").filter((word) => word.length > 0).join(" & ")


  const searchFilter: Prisma.JobWhereInput = searchString 
  ? {
    OR : [
      {title:{contains:searchString}},
      {companyName:{contains:searchString}},
      {type:{contains:searchString}},
      {locationType:{contains:searchString}},
      {location:{contains:searchString}},
    ],
  } : {}


  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? {type} : {},
      location ? {location} : {},
      remote ? {locationType: "Remote"} : {},
      {approved:true}
    ]
  }
  
  const jobs = await prisma.job.findMany({
      where,
      orderBy:{createdAt:"desc"}
    }) 
    
  return (
    <div className="space-y-4 grow">
          {jobs && (
            jobs.map((job,i) => (
              <>
                <JobListItem key={i} job={job}/>
              </>
            ))
          )}
          {jobs.length === 0 && (
            <p className='text-center m-auto '>
              No Jobs Found. Try Adjusting your search filters
            </p>
          )}
        </div>
  )
}

export default JobResults