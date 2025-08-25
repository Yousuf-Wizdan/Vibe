'use client'

import React, { useEffect, useState } from 'react'

import CreateServerModal from '../modals/CreateServerModal'
import InviteModal from '../modals/InviteModal';

const ModelProviders = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <CreateServerModal />
            <InviteModal />
        </>
    )
}

export default ModelProviders