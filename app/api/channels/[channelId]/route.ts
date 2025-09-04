import { currentProfile } from "@/lib/current-profile";
import { MemberRole } from "@/lib/generated/prisma";
import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ channelId: string }> }
) {
    try {

        const profile = await currentProfile();
        if (!profile) {
            return NextResponse.json({
                message: "UnAuthorized"
            }, { status: 401 })
        }

        const { searchParams } = new URL(req.url);
        const serverId = searchParams.get('serverId')
        if (!serverId) {
            return NextResponse.json({
                message: "ServerID MISSING!"
            }, { status: 400 })
        }

        const channelId = (await params).channelId;
        if (!channelId) {
            return NextResponse.json({
                message: "ChannelID MISSING!"
            }, { status: 400 })
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data: {
                channels: {
                    deleteMany: {
                        id: channelId,
                        name: {
                            not: "General"
                        }
                    }
                }
            }
        })

        return NextResponse.json(server);

    } catch (err) {

        console.log('[CHANNELS_DELETE]', err)
        return NextResponse.json({
            message: "Internal Error"
        }, { status: 500 })

    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ channelId: string }> }
) {
    try {

        const profile = await currentProfile();
        if (!profile) {
            return NextResponse.json({
                message: "UnAuthorized"
            }, { status: 401 })
        }

        const { searchParams } = new URL(req.url);
        const serverId = searchParams.get('serverId')
        if (!serverId) {
            return NextResponse.json({
                message: "ServerID MISSING!"
            }, { status: 400 })
        }

        const channelId = (await params).channelId;
        if (!channelId) {
            return NextResponse.json({
                message: "ChannelID MISSING!"
            }, { status: 400 })
        }

        const { name , type } = await req.json();

        if(name === "General"){
            return NextResponse.json({
                message: "Name Cannot Be General!"
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
                    update: {
                        where: {
                            id: channelId,
                            NOT: {
                                name: "General"
                            }
                        },
                        data: {
                            name,
                            type
                        }
                    }
                }
            }
        })

        return NextResponse.json(server);

    } catch (err) {

        console.log('[CHANNELS_ID_PATCH]', err)
        return NextResponse.json({
            message: "Internal Error"
        }, { status: 500 })

    }
}