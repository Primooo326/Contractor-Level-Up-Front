import { DynamicIcon } from '@/components/DynamicIcon'
import React from 'react'
import { conversations } from '@/mocks/conversations.mock'
import { timeAgo } from '@/utils/tools'
export default function DrawerSecond() {
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
                    <p className='text-sm'>Chats</p>
                    <DynamicIcon icon='mynaui:filter' className='text-gray-500' />
                </div>
                <div className='space-y-6 overflow-y-auto scroll h-full'>
                    {conversations.map((conversation, index) => (
                        <div key={index} className='flex justify-between items-center w-full'>
                            <div className="flex items-center gap-2 w-full" >

                                <img src={`https://ui-avatars.com/api/?name=${conversation.contactName}&background=random`} alt="contractor" className='rounded-full' style={{ width: '40px' }} />
                                <div>
                                    <h1 className='font-bold text-sm'>{conversation.contactName}</h1>
                                    <p className='text-sm font-light'>
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
