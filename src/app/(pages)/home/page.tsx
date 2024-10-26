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

    const { contact, currentConversation, setChat, setContact } = useChatStore()

    const fetchData = async () => {
        const responseContact = await getOneContact(currentConversation?.contactId!)
        console.log(responseContact);
        setContact(responseContact?.contact)

        const responseMsg = await getMessagesByConversationId(currentConversation?.id!)
        console.log(responseMsg);
        const ms = responseMsg?.messages

        ms.messages = ms.messages.sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime())
        setChat(ms)
    }

    useEffect(() => {
        if (currentConversation) {
            fetchData()
        }
    }, [currentConversation])

    return (
        <>
            {contact ?
                <div className='pageChat'>
                    <HeaderChat />
                    <BodyChat />
                    <FooterChat />
                </div> : <SkeletonChat />}

        </>
    )
}
