import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { currentProfile } from "@/lib/current-profile";

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ serverId: string }> }
) {

    try {

        const profile = await currentProfile()
        if (!profile) {
            return NextResponse.json({
                message: "Unauthorized"
            }, { status: 401 })
        }

        const serverId = (await params).serverId;
        if (!serverId) {
            return NextResponse.json({
                message: "No Server ID Found!"
            }, { status: 500 })
        }

        const {name , imageUrl} = await req.json(); 

        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id
            },
            data: {
                name,
                imageUrl
            }
        })

        return NextResponse.json(server)

    } catch (err) {

        console.log("SERVER ID PATCH" , err)
        return NextResponse.json({
            message: "Internal Server Error"
        } , {status: 500})

    }



}