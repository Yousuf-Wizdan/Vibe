import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid'

export async function PATCH(
    req: NextRequest,
    {params}: {params: Promise<{serverId: string}>}
){
    try{
        const profile = await currentProfile();
        if(!profile){
            return NextResponse.json({
                message: "Unauthorized"
            },{status: 401})
        }

        const serverId = (await params).serverId;
        if(!serverId){
            return NextResponse.json({
                message: "No Params Recieved"
            },{status: 401})
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id
            },
            data: {
                inviteCode: uuidv4()
            }
        })

        return NextResponse.json(server)

    }catch(err){
        console.log('SERVERID' , err);
        return NextResponse.json({
            message: "Generating New Invite Link Failed"
        } , {status: 500})
    }
}