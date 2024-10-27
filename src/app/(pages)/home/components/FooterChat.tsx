import { DynamicIcon } from '@/components/DynamicIcon'
import { useChatStore } from '@/hooks/chat.hook'
import React, { useEffect } from 'react'
import ModalTemplates from './ModalTemplates'

export default function FooterChat() {
    const { setOnModalTemplate, templateSelected, setTemplateSelected } = useChatStore()
    const handleOpenTemplate = () => {
        setOnModalTemplate(true)
    }

    const handleSendMessage = () => {
        console.log(templateSelected)
    }

    useEffect(() => {
        console.log(templateSelected)
    }, [templateSelected])
    return (
        <>
            <div className='py-2 px-4 footerChat' >
                <div className='flex justify-between items-center p-4 rounded bg-slate-100 gap-4'>
                    <button className="btn btn-sm bg-indigo-500 text-white" onClick={handleOpenTemplate}>
                        <DynamicIcon icon='mingcute:paper-fill' className='text-lg text-white' />
                    </button>
                    <textarea value={templateSelected?.description} className='textareaChat font-light text-xs' placeholder='Write a message' onChange={(e) => setTemplateSelected(e.target.value)} />
                    <button className='flex gap-4 items-center' >
                        <DynamicIcon icon='fa-solid:paper-plane' className='text-lg text-gray-500' />
                    </button>
                </div>
            </div>
            <ModalTemplates />
        </>

    )
}
