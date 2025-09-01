import { currentProfile } from "@/lib/current-profile";
import { MemberRole } from "@/lib/generated/prisma";
import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try{

        const profile = await currentProfile();
        if (!profile) {
            return NextResponse.json({
                message: "UnAuthorized"
            }, { status: 401 })
        }

        const {name , type} = await req.json();
        const {searchParams} = new URL(req.url);

        const serverId = searchParams.get('serverId')
        if (!serverId) {
            return NextResponse.json({
                message: "ServerID MISSING!"
            }, { status: 400 })
        }

        if(name === 'general'){
            return NextResponse.json({
                message: "Channel Name Cannot be general"
            } , {status: 400})
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN , MemberRole.MODERATOR]
                        }   
                    }
                }
            },
            data: {
                channels: {
                    create: [
                        {
                            name,
                            profileId: profile.id,
                            type
                        }
                    ]
                }
            }
        })

        return NextResponse.json(server)

    }catch(err){
        console.log('[CHANNELS_POST]' , err)
        return NextResponse.json({
            message: "Internal Error"
        } , {status: 500})
    }
}