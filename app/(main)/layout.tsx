import React from 'react'
import NavgiationSidebar from '@/components/navigation/NavgiationSidebar'

const MainLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className='h-full'>
            {/* <ModeToggle /> */}
            <div className={'max-sm:hidden md:flex h-full w-[72px] z-50 flex-col fixed inset-y-0'}>
                <NavgiationSidebar />
            </div>
            <main className='md:pl-[72px] h-full'>
                {children}  
            </main>
        </div>
    )
}

export default MainLayout