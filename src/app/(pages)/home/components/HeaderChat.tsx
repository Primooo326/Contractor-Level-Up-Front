import { useChatStore } from '@/hooks/chat.hook'
import React from 'react'

export default function HeaderChat() {
    const { contact } = useChatStore()

    return (
        <div className='header py-2 px-4' >
            <div className="flex items-center gap-2 w-full h-full" >

                <img src={`https://ui-avatars.com/api/?name=${contact!.fullNameLowerCase?.replaceAll(" ", "+")}&background=random`} alt="contractor" className='rounded-full' style={{ width: '40px' }} />
                <div>
                    <h1 className='font-bold text-sm'>{contact!.fullNameLowerCase}</h1>
                    <p className='text-sm font-light'>
                        {contact!.email}
                    </p>
                </div>

            </div>
        </div>
    )
}
