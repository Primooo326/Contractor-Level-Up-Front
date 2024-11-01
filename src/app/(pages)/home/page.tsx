"use client"
import React, { useEffect } from 'react'
import { useChatStore } from '@/hooks/chat.hook'
import HeaderChat from './components/HeaderChat'
import FooterChat from './components/FooterChat'
import SkeletonChat from './components/SkeletonChat'
import BodyChat from './components/BodyChat'
import { getOneContact } from '@/api/goHighLevel/contacts.api'
import { getMessagesByConversationId } from '@/api/goHighLevel/messages.api'
import "./styles.scss"
export default function page() {

    const { contactsSelected } = useChatStore()


    useEffect(() => {
        console.log(contactsSelected);
    }, [contactsSelected])

    return (
        <>
            {contactsSelected.length > 0 ?
                <div className='pageChat'>
                    <HeaderChat />
                    <BodyChat />
                    <FooterChat />
                </div> : <SkeletonChat />}

        </>
    )
}
