import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { currentProfile } from "@/lib/current-profile";
import {v4 as uuidv4} from 'uuid'
import { MemberRole } from "@/lib/generated/prisma";

export async function POST(req: NextRequest){
    try{

        const {name , imageUrl} = await req.json();

        const profile = await currentProfile();
        if(!profile){
            return NextResponse.json({
                message: "Unauthorized"
            } , {status: 401})
        }

        const server = await db.server.create({
            data: {
                profileId: profile.id,
                name,
                imageUrl,
                inviteCode: uuidv4(),
                channels: {
                    create: [
                        {
                            name: "General",
                            profileId: profile.id
                        }
                    ]
                },
                members: {
                    create: [
                        {
                            profileId: profile.id,
                            role: MemberRole.ADMIN
                        }
                    ]
                }
            }
        })

        return NextResponse.json(server)


    }catch(err){
        console.log("server route.ts" , err)
        return NextResponse.json({
            message: "Internal Error"
        } , {status: 500})
    }
}