'use client'
import React, { ButtonHTMLAttributes } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'

type Props = {}

const FormSubmitButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
    const {pending} = useFormStatus();
  return (
    <Button
        {...props}
        type='submit'
        disabled={ props.disabled ||  pending}
    >
        <span className='flex items-start justify-center gap-1'>
            {pending && <Loader2 size={16} className='animate-spin'/>}
            {props.children}
        </span>
        
    </Button>
  )
}

export default FormSubmitButton