'use client';
import FormSubmitButton from '@/components/FormSubmitButton'
import { Job } from '@prisma/client'
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom';
import { approveSubmission, deleteJob } from '../../action';

type Props = {
    job:Job
}

const AdminSidebar = ({job}: Props) => {
  return (
    <aside className='flex w-[200px] flex-none flex-row md:flex-col items-center gap-2 md:items-stretch'>
        {job.approved ? (
            <span className='text-center font-semibold text-green-500'>Approved</span>
        ) : (
            <ApprovedSubmissionButton jobId={job.id}/>
        )}
        <DeleteJobButton jobId={job.id}/>
    </aside>
  )
}

export default AdminSidebar

interface AdminButtonProps {
    jobId:number
}

function ApprovedSubmissionButton({jobId} : AdminButtonProps){

    const [formState,formAction ] = useFormState(approveSubmission,undefined)
    return (
        <form action={formAction} className='space-y-1'>
            <input readOnly value={jobId} hidden name="jobId" id="" />
            <FormSubmitButton className='w-full bg-green-500 hover:bg-green-600'>Approve</FormSubmitButton>
            {formState?.error && (
                <p className='text-sm text-red-500'>{formState.error}</p>
            )}
        </form>
    )
}


function DeleteJobButton({jobId} : AdminButtonProps){

    const [formState,formAction ] = useFormState(deleteJob,undefined)
    return (
        <form action={formAction} className='space-y-1'>
            <input readOnly value={jobId} hidden name="jobId" id="" />
            <FormSubmitButton className='w-full bg-red-500 hover:bg-red-600'>Delete</FormSubmitButton>
            {formState?.error && (
                <p className='text-sm text-red-500'>{formState.error}</p>
            )}
        </form>
    )
}