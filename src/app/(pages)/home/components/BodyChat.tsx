import { useChatStore } from '@/hooks/chat.hook'
import { formatFecha } from '@/utils/tools'
import React from 'react'

export default function BodyChat() {

    const { chat } = useChatStore()


    return (
        <div className='bodyChat space-y-2 overflow-y-auto scrollbar-custom p-4' >
            {chat?.messages.map((message, index) => (
                <div key={index}  >
                    <div className={`chat ${message.direction === 'inbound' ? 'chat-start' : 'chat-end'}`}>
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS chat bubble component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <div className={`chat-bubble text-white ${message.direction === 'inbound' ? 'chat-bubble' : 'chat-bubble-primary'}`}>
                            {message.attachments && <div className='flex items-center gap-2'>
                                {message.attachments.map((attachment, index) => (
                                    <div key={index} className='w-10 h-10 rounded-full'>
                                        <img src={attachment} alt="contractor" className='rounded-lg w-full h-full object-cover' />
                                    </div>
                                ))}
                            </div>}
                            {message.body}
                        </div>
                        <div className="chat-footer opacity-75">
                            <time className="text-xs opacity-75">{formatFecha(new Date(chat?.messages[index].dateAdded).getTime())}</time>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
