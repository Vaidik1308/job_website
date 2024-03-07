import JobFilterSIdebar from "@/components/JobFilterSIdebar"
import JobResults from "@/components/JobResults"
import H1 from "@/components/ui/h1"
import { JobFilterValues } from "@/lib/validation"


type PageProps = {
  searchParams: {
    q?:string,
    type?:string;
    location?:string;
    remote?:string;
  }
}

export default async function Home({
  searchParams :{q,type,location,remote}}:PageProps) {

    const filterValues:JobFilterValues = {
      q,
      type,
      location,
      remote:remote === "true" // props are coming as string 
    }
  
  return (
    <main className="max-w-5xl m-auto px-3 my-10 space-y-10">
      <div className="space-y-5 text-center">
        <H1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Developers Jobs</H1>
        <p className="text-muted-foreground">Find Your Dream Job</p>
      </div>
      <section className="flex flex-col md:flex-row gap-4">
        <JobFilterSIdebar/>
        <JobResults filterValues={filterValues}/>
      </section>
    </main>
  )
}
