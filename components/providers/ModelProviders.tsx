'use client'

import React, { useEffect, useState } from 'react'

import CreateServerModal from '../modals/CreateServerModal'
import InviteModal from '../modals/InviteModal';
import EditServerModal from '../modals/EditServerModal';
import MemberModal from '../modals/MemberModal';
import CreateChannelModal from '../modals/CreateChannelModel';
import LeaveServerModal from '../modals/LeaveServerModal';
import DeleteServerModal from '../modals/DeleteServerModal';
import DeleteChannelModal from '../modals/DeleteChannelModal';

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
            <EditServerModal />
            <MemberModal />
            <CreateChannelModal />
            <LeaveServerModal />
            <DeleteServerModal />
            <DeleteChannelModal />
        </>
    )
}

export default ModelProviders