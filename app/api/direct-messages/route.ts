import { currentProfile } from "@/lib/current-profile";
import { DirectMessage} from "@/lib/generated/prisma";
import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const MESSAGES_BATCH = 10;

export async function GET(req: NextRequest) {
    try{

        const profile = await currentProfile();
        if (!profile) {
            return NextResponse.json({
                message: "UnAuthorized"
            }, { status: 401 })
        }

        const {searchParams} = new URL(req.url);
        const cursor = searchParams.get('cursor')
        const conversationId = searchParams.get('conversationId')
        if (!conversationId) {
            return NextResponse.json({
                message: "ConversationID Missing"
            }, { status: 401 })
        }

        let messages: DirectMessage[] = [];
        
        if(cursor){
            messages = await db.directMessage.findMany({
                take: MESSAGES_BATCH,
                skip: 1,
                cursor: {
                    id: cursor,
                },
                where: {
                    conversationId
                },
                include: {
                    member: {
                        include: {
                            profile: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc',
                }
            })
        } else {
            messages = await db.directMessage.findMany({
                take: MESSAGES_BATCH,
                where: {
                    conversationId,
                },
                include: {
                    member: {
                        include: {
                            profile: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
        }

        let nextCursor = null;

        if(messages.length === MESSAGES_BATCH) {
            nextCursor = messages[MESSAGES_BATCH - 1].id
        }

        return NextResponse.json({
            items: messages,
            nextCursor
        })

    }catch(err){
        console.log('[DIRECT_MESSAGES_GET]' , err)
        return NextResponse.json({
            message: 'Internal Error'
        } , {status: 500})
    }
}