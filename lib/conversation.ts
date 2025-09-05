import { db } from "./prisma";

const findConversation = async (memberOneId: string, memberTwoId: string) => {

    try {
        const conversation = await db.conversation.findFirst({
            where: {
                AND: [
                    { memberOneId: memberOneId },
                    { memberTwoId: memberTwoId }
                ]
            },
            include: {
                memberOne: {
                    include: {
                        profile: true
                    }
                },
                memberTwo: {
                    include: {
                        profile: true
                    }
                }
            }
        })

        return conversation;
    } catch (err) {
        console.log("Find Conversation Error", err)
        return null
    }

}

const createNewConversation = async (memberOneId: string, memberTwoId: string) => {

    try {
        const newConvo = await db.conversation.create({
            data: {
                memberOneId,
                memberTwoId
            },
            include: {
                memberOne: {
                    include: {
                        profile: true
                    }
                },
                memberTwo: {
                    include: {
                        profile: true
                    }
                }
            }
        })

        return newConvo;

    } catch (err) {
        console.log("Create Conversation Error", err)
        return null
    }

}

export const getOrCreateConversation = async (memberOneId: string, memberTwoId: string) => {
    try{

        let conversation = await findConversation(memberOneId,memberTwoId) || await findConversation(memberTwoId,memberOneId)

        if(!conversation){
            conversation = await createNewConversation(memberOneId,memberTwoId);
        }

        return conversation;

    }catch(err){
        console.log("GetOrFind Conversation Error", err)
        return null;
    }
}