import ChatHeader from '@/components/chat/ChatHeader'
import { ChatInput } from '@/components/chat/ChatInput'
import ChatMessages from '@/components/chat/ChatMessages'
import { MediaRoom } from '@/components/MediaRoom'
import { currentProfile } from '@/lib/current-profile'
import { ChannelType } from '@/lib/generated/prisma'
import { db } from '@/lib/prisma'
import { RedirectToSignIn } from '@/lib/redirectToSignIn'
import { redirect } from 'next/navigation'
import React from 'react'

interface ChannelIdPageProps {
    params: Promise<{
        serverId: string,
        channelId: string
    }>
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {

    const serverId = (await params).serverId
    const channelId = (await params).channelId

    const profile = await currentProfile();
    if (!profile) {
        return RedirectToSignIn();
    }

    const channel = await db.channel.findUnique({
        where: {
            id: channelId
        }
    })

    const member = await db.member.findFirst({
        where: {
            serverId: serverId,
            profileId: profile.id
        }
    })

    if (!channel || !member) {
        return redirect('/')
    }

    return (
        <div
            className='bg-white dark:bg-[#313338] flex flex-col h-screen'
        >
            <ChatHeader
                name={channel.name}
                serverId={channel.serverId}
                type='channel'

            />

            {channel.type === ChannelType.TEXT && (
                <>
                    <ChatMessages
                        member={member}
                        name={channel.name}
                        chatId={channel.id}
                        type='channel'
                        apiUrl='/api/messages'
                        socketUrl='/api/socket/messages'
                        socketQuery={{
                            channelId: channelId,
                            serverId: channel.serverId
                        }}
                        paramKey='channelId'
                        paramValue={channel.id}
                    />

                    <ChatInput
                        apiUrl='/api/socket/messages'
                        name={channel.name}
                        type='channel'
                        query={{
                            channelId: channelId,
                            serverId: channel.serverId
                        }}
                    />
                </>
            )}

            {channel.type === ChannelType.AUDIO && (
                <MediaRoom
                    chatId={channel.id}
                    video={false}
                    audio={true}
                />
            )}

            {channel.type === ChannelType.VIDEO && (
                <MediaRoom
                    chatId={channel.id}
                    video={true}
                    audio={true}
                />
            )}



        </div>
    )
}

export default ChannelIdPage