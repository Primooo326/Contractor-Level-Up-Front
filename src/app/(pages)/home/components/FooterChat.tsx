import { DynamicIcon } from '@/components/DynamicIcon'
import React from 'react'

export default function FooterChat() {
    return (
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
    )
}
