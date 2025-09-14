import ChatHeader from '@/components/chat/ChatHeader'
import { ChatInput } from '@/components/chat/ChatInput'
import ChatMessages from '@/components/chat/ChatMessages'
import { MediaRoom } from '@/components/MediaRoom'
import { getOrCreateConversation } from '@/lib/conversation'
import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/prisma'
import { RedirectToSignIn } from '@/lib/redirectToSignIn'
import { redirect } from 'next/navigation'
import React from 'react'

interface MemberIdPageProps {
  params: Promise<{
    memberId: string,
    serverId: string
  }>,
  searchParams: Promise<{
    video?: boolean;
  }>
}

const MemberIdPage = async ({ params, searchParams }: MemberIdPageProps) => {

  const profile = await currentProfile();
  if (!profile) {
    return RedirectToSignIn();
  }

  const serverId = (await params).serverId
  const memberId = (await params).memberId
  const searchParamsObj = await searchParams

  const currentMember = await db.member.findFirst({
    where: {
      serverId: serverId,
      profileId: profile.id
    }
  })

  if (!currentMember) {
    return redirect('/')
  }

  const conversation = await getOrCreateConversation(currentMember.id, memberId);
  if (!conversation) {
    return redirect(`/servers/${serverId}`)
  }

  const { memberOne, memberTwo } = conversation;


  // all this is one bases of who initated the conversation
  const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className='bg-white dark:bg-[#313338] flex flex-col h-screen'>
      <ChatHeader
        name={otherMember.profile.name}
        imageUrl={otherMember.profile.imageUrl}
        serverId={serverId}
        type='conversations'
      />

      {searchParamsObj.video && (
        <MediaRoom
          chatId={conversation.id}
          video={true}
          audio={true}
        />
      )}

      {!searchParamsObj.video && (
        <>
          <ChatMessages
            member={currentMember}
            name={otherMember.profile.name}
            chatId={conversation.id}
            type='conversation'
            apiUrl={`/api/direct-messages`}
            paramKey='conversationId'
            paramValue={conversation.id}
            socketUrl='/api/socket/direct-messages'
            socketQuery={{
              conversationId: conversation.id
            }}
          />

          <ChatInput
            name={otherMember.profile.name}
            type='conversation'
            apiUrl='/api/socket/direct-messages'
            query={{
              conversationId: conversation.id
            }}
          />
        </>
      )}



    </div>
  )
}

export default MemberIdPage