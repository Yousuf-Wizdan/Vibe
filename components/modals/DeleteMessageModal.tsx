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

import qs from 'query-string'
import { useRouter } from 'next/navigation'
import { useModel } from '@/hooks/use-model-store'
import { Button } from '../ui/button'

const DeleteMessageModal = () => {
    const router = useRouter();

    const { isOpen, onClose, type, data } = useModel()

    const [isLoading, setIsLoading] = useState(false);

    const isModelOpen = isOpen && type == 'deleteMessage';
    const { apiUrl , query } = data;

    const onDelete = async () => {

        try {

            setIsLoading(true)
        
            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query
            })

            // console.log('qs' , url)

            await axios.delete(url)
    
            onClose();

            

        } catch (err) {
            console.log( err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isModelOpen} onOpenChange={onClose}>
            <DialogContent className='bg-white text-black p-0 overflow-hidden'>
                <DialogHeader className='pt-8 px-6'>
                    <DialogTitle className='text-2xl text-center font-black'>
                        Delete Message
                    </DialogTitle>
                    <DialogDescription className='text-center text-zinc-500'>
                        Are You Sure You Want To Do This?
                        This Message will be permanently deleted.
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
                            onClick={onDelete}
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

export default DeleteMessageModal;