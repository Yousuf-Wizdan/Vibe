import ServerSideBar from '@/components/server/ServerSideBar';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import React from 'react'

const ServerIdLayout = async ({
  children,
  params
}: {
  children: React.ReactNode,
  params: Promise<{ serverId: string }>
}) => {
  const serverId = (await params).serverId;
  const profile = await currentProfile();
  if (!profile) {
    return redirect('/sign-in')
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  })

  if (!server) {
    return redirect('/')
  }

  return (
    <div className='h-full'>
      <div className='sm:hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0'>
          <ServerSideBar serverId={serverId} />
      </div>
      <main className='h-full md:pl-60'>
        {children}
      </main>
    </div>
  )
}

export default ServerIdLayout