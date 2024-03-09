import { Metadata } from 'next'
import React from 'react'
import NewJobFrom from './NewJobFrom'

type Props = {}

export const metadata:Metadata = {
    title:"Post a new job"
}

// we can't make this a client comp because we are using metadata here which is implemented only in server comp

const page = (props: Props) => {
  return (
    <NewJobFrom/>
  )
}

export default page