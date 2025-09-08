'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import qs from 'query-string'
import { Button } from '../ui/button'
import FileUploadWrapper from '../FileUploadWrapper'
import { useRouter } from 'next/navigation'
import { useModel } from '@/hooks/use-model-store'

const formSchema = z.object({
    fileUrl: z.string().min(1, { message: "Attachment is Required!" })
})

const MessageFileModal = () => {
   
    const {isOpen , onClose , type , data} = useModel()
    const {apiUrl , query} = data;
    const router = useRouter();

    const isModelOpen = isOpen && type === 'messageFile';

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fileUrl: "",
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            
            const url = qs.stringifyUrl({
                url: apiUrl || '',
                query
            })

            await axios.post(url , {
                ...values,
                content: values.fileUrl
            })

            form.reset();
            router.refresh();
            onClose();   

        } catch (err) {
            console.log("onsubmit error (MessageFileModel)", err)
        }
    }

    const handleClose = () => {
        form.reset();
        onClose();
    }


    return (
        <Dialog open={isModelOpen} onOpenChange={handleClose}>
            <DialogContent className='bg-white text-black p-0 overflow-hidden'>
                <DialogHeader className='pt-8 px-6'>
                    <DialogTitle className='text-2xl text-center font-black'>
                        Add an Attachment
                    </DialogTitle>
                    <DialogDescription className='text-center text-zinc-500'>
                        Send a file as a message
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-8'
                    >
                        <div className='space-y-8 px-6'>
                            <div className='flex items-center justify-center text-center'>
                                <FormField
                                    control={form.control}
                                    name='fileUrl'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUploadWrapper
                                                    endpoint={"messageFile"}
                                                    value={field.value}
                                                    // here what onChange does is update the formState (ex. imageUrl)
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                        </div>
                        <DialogFooter className='bg-gray-100 px-6 py-4'>
                            <Button variant={"primary"} disabled={isLoading}>
                                Send
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default MessageFileModal