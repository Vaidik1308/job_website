// 'use server'
import { jobTypes } from '@/lib/job-types'
import { Input } from './ui/input'
import { Label } from './ui/label'
import Select from './ui/select'
import { Button } from './ui/button'
import { JobFilterValues, jobFilterSchema } from '@/lib/validation'
import { redirect } from 'next/navigation'


type JobFilterSideBar = {
    defaultValues:JobFilterValues;
}



async function filterJobs(formData:FormData){
    "use server"
    // console.log(formData.get("q") as string);
    const values = Object.fromEntries(formData.entries())

    const {q,type,remote,location} = jobFilterSchema.parse(values)

    const searchParams = new URLSearchParams({
        ...(q && {q:q.trim()}), // if q is defined then we pass this in search params
        ...(type && {type:type.trim()}),
        ...(location && {location:location.trim()}),
        ...(remote && {remote:"true"}),
    })

    redirect(`/?${searchParams.toString()}`)
    
}

export const jobFilterSidebar = async () => {
    const distinctLocations = await prisma?.job.findMany({
        where:{approved:true},
        select:{location:true},
        distinct:["location"], // this select same element single time
    }).then(locations => (
        locations.map(({location}) => location).filter(Boolean) //converting this locations obj to array containing location in string and filter here is used to remove the null or undefined location 
    )) as string[] //because ts doesn't recognize that we have removed the null values from it 
    return distinctLocations
}

const JobFilterSIdebar = async ({defaultValues}:JobFilterSideBar) => {

    const distinctLocations:string[]= await jobFilterSidebar()
    // console.log(distinctLocations);
    
  return (
    <aside className='p-4 md:w-[260px] sticky top-0 h-fit bg-background border rounded-lg '>
        
        <form action={filterJobs}>
            <div className='space-y-4'>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor='q'>Search</Label>
                    <Input 
                        id='q' 
                        name='q' 
                        placeholder='Title, company, etc'
                        defaultValue={defaultValues?.q || ""} 
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor='type'>Type</Label>
                    <Select defaultValue={defaultValues?.type || ""} className='' id='type' name='type' >
                        <option value="">All Types</option>
                        {jobTypes.map((type:string) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </Select>
                </div>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor='location'>Location</Label>
                    <Select defaultValue={defaultValues?.location || ""} className='' id='location' name='location' >
                        <option value="">All location</option>
                        {distinctLocations.map((location:string) => (
                            <option key={location} value={location}>{location}</option>
                        ))}
                    </Select>
                </div>
                <div className='flex items-center gap-2'>
                    <input
                        type='checkbox'
                        // defaultValue={defaultValues?.remote || ""}
                        checked={defaultValues?.remote}
                        name='remote'
                        id='remote'
                        className='scale-125 accent-black'
                    />
                    <label htmlFor="remote">
                        Remote Jobs
                    </label>
                </div>
                <Button type='submit' className='w-full'>
                    Filter Jobs
                </Button>
            </div>
        </form>
    </aside>
  )
}

export default JobFilterSIdebar