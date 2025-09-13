'use client'
import { Member, Message, Profile } from '@/lib/generated/prisma'
import React, { ElementRef, Fragment, useReducer, useRef } from 'react'
import ChatWelcome from './ChatWelcome'
import { useChatQuery } from '@/hooks/use-chat-query'
import { Loader2, ServerCrash, ShieldAlert, ShieldCheck } from 'lucide-react'
import { ChatItem } from './ChatItem'
import { format } from 'date-fns'
import { useChatSocket } from '@/hooks/use-chat-socket'

interface ChatMessagesProps {
    name: string,
    member: Member,
    chatId: string,
    apiUrl: string,
    socketUrl: string,
    socketQuery: Record<string, string>
    paramKey: 'channelId' | 'conversationId'
    type: 'channel' | 'conversation'
    paramValue: string
}

type MessageWithMemberProfile = Message & {
    member: Member & {
        profile: Profile
    }
}

const DATE_FORMAT = "d MMM yyyy, HH:mm";

const ChatMessages = ({
    apiUrl,
    chatId,
    member,
    name,
    paramKey,
    socketQuery,
    socketUrl,
    type,
    paramValue
}: ChatMessagesProps) => {

    const queryKey = `chat:${chatId}`;
    const addKey = `chat:${chatId}:messages`;
    const updateKey = `chat:${chatId}:messages:update;`

    const chatRef = useRef<ElementRef<"div">>(null);
    const bottomref = useRef<ElementRef<"div">>(null);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    } = useChatQuery({
        queryKey,
        apiUrl,
        paramKey,
        paramValue
    })

    useChatSocket({ queryKey, addKey, updateKey })

    if (status == 'pending') {
        return (
            <div className='flex flex-col flex-1 justify-center items-center'>
                <Loader2 className='h-7 w-7 text-zinc-500 animate-spin my-4' />
                <p className='text-xs text-zinc-500 dark:text-zinc-400'>
                    Loading messages...
                </p>
            </div>
        )
    }

    if (status == 'error') {
        return (
            <div className='flex flex-col flex-1 justify-center items-center'>
                <ServerCrash className='h-7 w-7 text-zinc-500 animate-spin my-4' />
                <p className='text-xs text-zinc-500 dark:text-zinc-400'>
                    Something went wrong!
                </p>
            </div>
        )
    }

    return (
        <div ref={chatRef} className='flex-1 flex flex-col py-4 overflow-y-auto'>
            {!hasNextPage && <div className='flex-1' />}
            {!hasNextPage && (
                <ChatWelcome
                    type={type}
                    name={name}
                />)}

            <div className='flex flex-col-reverse mt-auto'>
                {data?.pages?.map((group, i) => (
                    <Fragment key={i}>
                        {group?.items?.map((message: MessageWithMemberProfile) => (
                            <ChatItem
                                id={message.id}
                                currentMember={member}
                                key={message.id}
                                member={message.member}
                                content={message.content}
                                fileUrl={message.fileUrl}
                                deleted={message.deleted}
                                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                                isUpdated={message.updatedAt !== message.createdAt}
                                socketUrl={socketUrl}
                                socketQuery={socketQuery}
                            />
                        ))}
                    </Fragment>
                ))}
            </div>
            <div ref={bottomref} />
        </div>
    )
}

export default ChatMessages