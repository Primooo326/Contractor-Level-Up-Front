"use client"
import React from 'react'
import "./styles.scss"
import { DynamicIcon } from '@/components/DynamicIcon'
import { useChatStore } from '@/hooks/chat.hook'
export default function page() {

    const { contact } = useChatStore()
    return (
        <>
            {contact ? <div className='pageChat'>
                <div className='header py-2 px-4' >
                    <div className="flex items-center gap-2 w-full" >

                        <img src={`https://ui-avatars.com/api/?name=${contact.fullNameLowerCase.replaceAll(" ", "+")}&background=random`} alt="contractor" className='rounded-full' style={{ width: '40px' }} />
                        <div>
                            <h1 className='font-bold text-sm'>{contact.fullNameLowerCase}</h1>
                            <p className='text-sm font-light'>
                                {contact.email}
                            </p>
                        </div>

                    </div>
                </div>
                <div>

                </div>
                <div className='py-2 px-4 footerChat' >
                    <div className='flex justify-between items-center p-4 rounded bg-slate-100 gap-4'>
                        <div className="flex justify-center items-center bg-indigo-500 p-2 rounded">
                            <DynamicIcon icon='mingcute:paper-fill' className='text-lg text-white' />
                        </div>
                        <textarea className='font-light text-xs' placeholder='Write a message' />
                        <div className='flex gap-4 items-center' >

                            <DynamicIcon icon='heroicons:paper-clip-16-solid' className='text-lg text-gray-500' />
                            <DynamicIcon icon='fa-solid:paper-plane' className='text-lg text-gray-500' />
                        </div>
                    </div>
                </div>
            </div> : <div className='w-full h-full flex justify-center items-center' >
                Chat Skeleton
            </div>}

        </>
    )
}
