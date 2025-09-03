// http://localhost:3000/api/servers/aidsajdaijd-adsak/leave

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prisma";
import { NextResponse , NextRequest } from "next/server";

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ serverId: string }> }
) {
    try {

        const profile = await currentProfile();
        if (!profile) {
            return NextResponse.json({
                message: "Unauthorized"
            }, { status: 401 })
        }

        const serverId = (await params).serverId;
        if (!serverId) {
            return NextResponse.json({
                message: "SERVER ID MISSING"
            }, { status: 401 })
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                // so the admin cannot leave the server themselves
                profileId: {
                    not: profile.id
                },
                members: {
                    some: {
                        profileId: profile.id
                    }
                }
            },
            data: {
                members: {
                    deleteMany: {
                        profileId: profile.id
                    }
                }
            }
        })

        return NextResponse.json(server)

    } catch (err) {
        console.log("[SERVER_LEAVE_ID]", err)
        return NextResponse.json({
            message: "Internal Error"
        }, { status: 500 })
    }
}