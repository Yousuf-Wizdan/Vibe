import InitialModal from '@/components/modals/InitialModal';
import { initalProfile } from '@/lib/initial-profile'
import { db } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import React from 'react'

const SetUpPage = async () => {
    const profile = await initalProfile();
    
    // some is a Prisma filter operator that means: “At least one related record should satisfy this condition.”
    // basically here to find which server is user joined in 
    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })
    if(server){
        return redirect(`/servers/${server.id}`)
    }

  return (
    <div className='flex items-center justify-center'>
      <InitialModal />
    </div>
  )
}

export default SetUpPage