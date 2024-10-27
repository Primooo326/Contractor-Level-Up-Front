import { DynamicIcon } from '@/components/DynamicIcon'
import { useChatStore } from '@/hooks/chat.hook'
import React from 'react'
import ModalTemplates from './ModalTemplates'

export default function FooterChat() {
    const { setOnModalTemplate } = useChatStore()
    const handleOpenTemplate = () => {
        setOnModalTemplate(true)
    }
    return (
        <>
            <div className='py-2 px-4 footerChat' >
                <div className='flex justify-between items-center p-4 rounded bg-slate-100 gap-4'>
                    <button className="btn btn-sm bg-indigo-500 text-white" onClick={handleOpenTemplate}>
                        <DynamicIcon icon='mingcute:paper-fill' className='text-lg text-white' />
                    </button>
                    <textarea className='textareaChat font-light text-xs' placeholder='Write a message' />
                    <div className='flex gap-4 items-center' >

                        <DynamicIcon icon='heroicons:paper-clip-16-solid' className='text-lg text-gray-500' />
                        <DynamicIcon icon='fa-solid:paper-plane' className='text-lg text-gray-500' />
                    </div>
                </div>
            </div>
            <ModalTemplates />
        </>

    )
}
