import ChatHeader from '@/components/chat/ChatHeader'
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
  }>
}

const MemberIdPage = async ({ params }: MemberIdPageProps) => {

  const profile = await currentProfile();
  if (!profile) {
    return RedirectToSignIn();
  }

  const serverId = (await params).serverId
  const memberId = (await params).memberId

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
    <div className='bg-white dark:bg-[#313338] flex flex-col h-full'>
      <ChatHeader
        name={otherMember.profile.name}
        imageUrl={otherMember.profile.imageUrl}
        serverId={serverId}
        type='conversations'
      />
    </div>
  )
}

export default MemberIdPage