import React from 'react'

import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet"

import { Menu } from 'lucide-react'
import { Button } from './ui/button'
import NavgiationSidebar from './navigation/NavgiationSidebar'
import ServerSideBar from './server/ServerSideBar'

const MobileToggle = ({ serverId }: { serverId: string }) => {

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={'ghost'} size={'icon'} className='md:hidden'>
                    <Menu />
                </Button>
            </SheetTrigger>

            {/* Use flex flex-row */}
            <SheetContent side='left' className='flex flex-row p-0 gap-0'>

                    <SheetHeader className='hidden'>
                        <SheetTitle>x</SheetTitle>
                    </SheetHeader>
                    <div className='w-[72px]'>
                        <NavgiationSidebar />
                    </div>
                    <ServerSideBar serverId={serverId} />

            </SheetContent>
        </Sheet>
    )
}

export default MobileToggle