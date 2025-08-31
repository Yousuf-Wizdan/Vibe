import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ memberId: string }> }) {
    try {

        const { searchParams } = new URL(req.url);
        const { role } = await req.json();
        const memberId = (await params).memberId;

        const profile = await currentProfile();
        if (!profile) {
            return NextResponse.json({
                message: "UnAuthorized"
            }, { status: 401 })
        }

        const serverId = searchParams.get('serverId')
        if (!serverId) {
            return NextResponse.json({
                message: "ServerID MISSING!"
            }, { status: 400 })
        }

        if (!memberId) {
            return NextResponse.json({
                message: "MemberID MISSING!"
            }, { status: 400 })
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id
            },
            data: {
                members: {
                    update: {
                        where: {
                            id: memberId,
                            profileId: {
                                not: profile.id
                            }
                        },
                        data: {
                            role
                        }
                    }
                }
            },
            include: {
                members: {
                    include: {
                        profile: true
                    },
                    orderBy: {
                        role: "asc"
                    }
                }
            }
        })
        // console.log(server)
        return NextResponse.json(server);

    } catch (err) {
        console.log('[MEMBER_ID_PATCH]', err);
        return NextResponse.json({
            message: "Internal Error"
        }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ memberId: string }> }) {
    try {

        const {searchParams} = new URL(req.url);
        const memberId = (await params).memberId;

        const profile = await currentProfile();
        if (!profile) {
            return NextResponse.json({
                message: "UnAuthorized"
            }, { status: 401 })
        }

        const serverId = searchParams.get('serverId')
        if (!serverId) {
            return NextResponse.json({
                message: "ServerID MISSING!"
            }, { status: 400 })
        }

        if (!memberId) {
            return NextResponse.json({
                message: "MemberID MISSING!"
            }, { status: 400 })
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id
            },
            data: {
                members: {
                    deleteMany: {
                        id: memberId,
                        profileId: {
                            not: profile.id
                        }
                    }
                }
            },
            include: {
                members: {
                    include: {
                        profile: true
                    },
                    orderBy: {
                        role: "asc"
                    }
                }
            }
        })

        return NextResponse.json(server)

    } catch (err) {
        console.log('[MEMBER_ID_DELETE]', err);
        return NextResponse.json({
            message: "Internal Error"
        }, { status: 500 })
    }
}