'use client'

import React, { useState } from 'react'
import axios from 'axios'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'


import { useRouter } from 'next/navigation'
import { useModel } from '@/hooks/use-model-store'
import { Button } from '../ui/button'
import { useOrigin } from '@/hooks/use-origin'

const LeaveServerModal = () => {
    const router = useRouter();
    const { isOpen, onClose, type, data } = useModel()

    const [isLoading, setIsLoading] = useState(false);

    const isModelOpen = isOpen && type == 'leaveServer';
    const { server } = data;

    const onLeave = async () => {

        try{

            setIsLoading(true)

            const {data} = await axios.patch(`/api/servers/${server?.id}/leave`)
            // console.log("too" , data);
            onClose();

            router.push('/')
            

        }catch(err){
            console.log('OnLeave Error' , err)
        }finally{
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isModelOpen} onOpenChange={onClose}>
            <DialogContent className='bg-white text-black p-0 overflow-hidden'>
                <DialogHeader className='pt-8 px-6'>
                    <DialogTitle className='text-2xl text-center font-black'>
                        Leave Server
                    </DialogTitle>
                    <DialogDescription className='text-center text-zinc-500'>
                        Are You Sure You Want To Leave <span className='font-semibold text-indigo-500'>{server?.name} ?</span>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='bg-gray-100 px-6 py-4'>
                    <div className='flex items-center justify-between w-full'>
                        <Button
                            disabled={isLoading}
                            onClick={onClose}
                            variant={'ghost'}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isLoading}
                            onClick={onLeave}
                            variant={'primary'}
                        >
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default LeaveServerModal