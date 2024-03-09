'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import H1 from "@/components/ui/h1"
import { CreateJobValues, createJobSchema } from "@/lib/validation"
import { useForm } from "react-hook-form"
import {zodResolver} from '@hookform/resolvers/zod'
import { Input } from "@/components/ui/input"
import Select from "@/components/ui/select"
import { jobTypes, locationType } from "@/lib/job-types"
import LocationInput from "@/components/LocationInput"
import { X } from "lucide-react"

type Props = {}

const NewJobFrom = (props: Props) => {
    const form = useForm<CreateJobValues>({
        resolver:zodResolver(createJobSchema)
    })

    async function onSubmit(values:CreateJobValues) {
        console.log(values);
        console.table(values)
        
    }


    // destructuring the form so that we don't need to form.something all the time

    const {
        handleSubmit,
        watch,
        trigger,
        control,
        setValue,
        setFocus,
        formState:{isSubmitting}
    } = form
  return (
    <main className="max-3xl m-auto mt-10 space-y-10">
        <div className="space-y-5 text-center">
            <H1>Find your perfect developer </H1>
            <p className="text-muted-foreground">
                Get your job posting seen by thousands of job seekers.
            </p>
        </div>
        <div className="space-y-6 border rounded-lg p-4">
            <div>
                <h2 className="font-semibold">job details</h2>
                <p className="text-muted-foreground">
                    Provide a job description and details
                </p>
            </div>
        </div>
        <Form {...form}>
            <form className="space-y-4 px-4" noValidate onSubmit={handleSubmit(onSubmit)}>
                <FormField
                    control={control}
                    name="title"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="e.g Frontend Developer"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="type"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Job Type</FormLabel>
                            <FormControl>
                                <Select {...field} defaultValue="">
                                    <option value="" hidden>
                                        Select an option
                                    </option>
                                    {jobTypes.map((jobType) => (
                                        <option key={jobType} value={jobType}>
                                            {jobType}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="companyName"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="companyLogo"
                    render={({field:{value,...fieldValues}}) => (
                        <FormItem>
                            <FormLabel>company Logo</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="image/"
                                    {...fieldValues}
                                    onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        fieldValues.onChange(file)
                                    }}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="locationType"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Select {...field} defaultValue="">
                                    <option value="" hidden>
                                        Select an option
                                    </option>
                                    {locationType.map((locationType) => (
                                        <option key={locationType} value={locationType}>
                                            {locationType}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="location"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Office location</FormLabel>
                            <FormControl>
                                <LocationInput 
                                    onLocationSelected={field.onChange}
                                    ref={field.ref}
                                />
                            </FormControl>
                            {watch('location') && (
                                <div className="flex items-center gap-1">
                                    <button
                                        className="hover:text-red-500"
                                        onClick={() => {
                                            setValue("location","",{shouldValidate:true}) //setValue is a part of react hook form which takes in the value we want to change and second argument as replacement for that value we want to change and third argument is if we want to remove from the validation schema
                                        }}
                                        type="button"
                                    >
                                        <X size={20} />
                                    </button>
                                    <span className="text-sm">{watch('location')}</span>
                                </div>
                            )}
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    </main>
  )
}

export default NewJobFrom