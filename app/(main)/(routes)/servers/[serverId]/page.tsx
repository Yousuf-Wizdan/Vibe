import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import React from 'react'

interface ServerPageProps {
  params: Promise<{ serverId: string }>
}

const ServerPage = async ({ params }: ServerPageProps) => {

  const serverId = (await params).serverId;

  const profile = await currentProfile()
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
    },
    include: {
      channels: {
        where: {
          name: 'General'
        },
        orderBy: {
          createdAt: 'asc'
        }
      }
    }
  })

  const initialChannel = server?.channels[0];

  if (initialChannel?.name !== 'General') {
    return null;
  }


  // what this page does basically always redirect to general channel whenever user click the server
  return (
    redirect(`/servers/${serverId}/channels/${initialChannel?.id}`)
  )
}

export default ServerPage