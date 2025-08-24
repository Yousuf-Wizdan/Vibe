'use client'

import { UserButton } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'

const UserButtonProvider = () => {
    const [isMounted , setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    } , [])

    if(!isMounted){
        return null
    }

  return (
    <>
        <UserButton
            appearance={{
                    elements: {
                        avatarBox: "h-[48px] w-[48px]"
                    }
                }}
        />
    </>
  )
}

export default UserButtonProvider