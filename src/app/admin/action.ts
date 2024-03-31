'use server'

import { isAdmin } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { del } from "@vercel/blob";
import { redirect } from "next/navigation";

type FormState = {
    error?:string }| undefined;

export async function approveSubmission(
    prevState:FormState,
    formData:FormData,
    ) : Promise<FormState>{
    try{
        const jobId = parseInt(formData.get("jobId") as string)

        const user = await currentUser()
        if(!user || !isAdmin(user)){
            throw new Error("not Authenticated")
        }

        await prisma.job.update({
            where:{id:jobId},
            data:{approved:true}
        })

        revalidatePath("/") //refreshes this page also
    }catch(error){
        let message = "Unexpected error"
        if(error instanceof Error){
            message = error.message
        }
        return {error:message}
    }
}

export async function deleteJob(
    prevState:FormState,
    formData:FormData
    ){
    try{
        const jobId = parseInt(formData.get("jobId") as string)

        const user = await currentUser()
        if(!user || !isAdmin(user)){
            throw new Error("not Authenticated")
        }

        const job = await prisma.job.findUnique({
            where:{id:jobId}
        });

        if(job?.companyLogoUrl){
            await del(job.companyLogoUrl)
        }

        await prisma.job.delete({
            where:{id:jobId}
        })
        revalidatePath("/") //refreshes this page also
        
    }catch(error){
        let message = "Unexpected error"
        if(error instanceof Error){
            message = error.message
        }
        return {error:message}
    }

    redirect("/admin") // always put outside the try catch block
}