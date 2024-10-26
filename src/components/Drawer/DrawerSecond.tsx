"use client";
import { DynamicIcon } from '@/components/DynamicIcon'
import { useEffect, useState } from 'react'
import { timeAgo } from '@/utils/tools'
import { getConversations } from '@/api/goHighLevel/conversations.api';
import { useChatStore } from '@/hooks/chat.hook';
export default function DrawerSecond() {
    const [conversations, setConversations] = useState<IConversation[]>([]);
    const { setChat, setContact, setCurrentConversation } = useChatStore()

    const selectConversation = (conversation: IConversation) => {
        console.log(conversation)
        setCurrentConversation(conversation)
    }

    useEffect(() => {
        async function fetchConversations() {
            const data: IConversationsReturn = await getConversations();
            setConversations(data?.conversations);
        }
        fetchConversations();
    }, []);

    return (
        <div className='drawer2'>

            <div className="header flex justify-between items-center p-4 w-full">

                <div className='flex items-center gap-1'>
                    <h1 className='font-bold text-xl'>Open</h1>
                    <DynamicIcon icon='octicon:chevron-down-12' className='text-gray-500' />
                </div>
                <div className='flex items-center gap-2'>
                    <DynamicIcon icon='gg:phone' className='text-lg text-indigo-500' />
                    <DynamicIcon icon='fluent:chat-12-filled' className='text-lg text-indigo-500' />

                </div>
            </div>
            <div className='p-4 space-y-6 h-full overflow-hidden mb-6'>
                <div className='flex justify-between items-center' >
                    <label className="input input-bordered input-sm flex items-center gap-2 w-full">
                        <DynamicIcon icon='fa-solid:search' className=' text-gray-500' />
                        <input type="text" className="grow" placeholder="Search user" />
                    </label>
                </div>
                <div className='listConversations space-y-2 overflow-y-auto scrollbar-custom pb-10'>
                    {conversations.map((conversation, index) => (
                        <div key={index} className='flex justify-between items-center w-full hover:bg-gray-100 p-4 rounded-lg' onClick={() => selectConversation(conversation)}>
                            <div className="flex items-center gap-2 w-full" >

                                <img src={`https://ui-avatars.com/api/?name=${conversation.contactName}&background=random`} alt="contractor" className='rounded-full' style={{ width: '40px' }} />
                                <div>
                                    <h1 className='font-bold text-sm'>{conversation.contactName}</h1>
                                    <p className='text-sm font-light line-clamp-1'>
                                        {conversation.lastMessageBody}
                                    </p>
                                </div>

                            </div>
                            <div className='h-full flex flex-col justify-between items-end gap-1'>
                                <span className='text-xs font-extralight text-nowrap' >{timeAgo(conversation.lastMessageDate)}</span>
                                {
                                    conversation.lastMessageDirection === 'inbound' && <div className='flex items-center justify-center bg-indigo-700 text-white rounded-full size-4 text-xs font-extralight'>
                                        {conversation.unreadCount}
                                    </div>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
