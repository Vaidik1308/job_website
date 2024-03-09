'use client'
import React, { ButtonHTMLAttributes } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import LoadingButton from './LoadingButtonProps'


const FormSubmitButton = (props: ButtonHTMLAttributes<HTMLButtonElement>,) => {
    const {pending} = useFormStatus();
  return (
    <LoadingButton {...props} type='submit' loading={pending}/>
  )
}

export default FormSubmitButton