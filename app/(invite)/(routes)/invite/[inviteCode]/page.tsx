import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import React from 'react'

interface InviteCodePageProps {
    params: Promise<{ inviteCode: string }>
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
    const profile = await currentProfile();
    if (!profile) {
        return redirect('/sign-in')
    }

    const inviteCode = (await params).inviteCode;
    if (!inviteCode) {
        return redirect('/')
    }

    // logic to check if the user using the invite code is already the member of the server
    const existingServer = await db.server.findFirst({
        where: {
            inviteCode: inviteCode,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })
    if(existingServer){
        return redirect(`/servers/${existingServer.id}`)
    }

    // check if the server with inviteCode actually exists or not!
    const server = await db.server.findUnique({
        where: {
            inviteCode: inviteCode
        }
    })
    if(!server){
        return redirect('/')
    }

    // if not part of server create the user profile and redirect
    const newServer = await db.server.update({
        where: {
            inviteCode: inviteCode
        },
        data: {
            members: {
                create: [
                    {
                        profileId: profile.id
                    }
                ]
            }
        }
    })

    if(newServer){
        return redirect(`/servers/${newServer.id}`)
    }

    return null;
}

export default InviteCodePage