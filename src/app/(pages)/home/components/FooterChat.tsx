import { DynamicIcon } from '@/components/DynamicIcon';
import { useChatStore } from '@/hooks/chat.hook';
import React, { useEffect, useRef, useState } from 'react';
import ModalTemplates from './ModalTemplates';
import { useForm } from 'react-hook-form';
import { sendMessage } from '@/api/goHighLevel/messages.api';

export default function FooterChat() {
    const { setOnModalTemplate, templateSelected, setTemplateSelected } = useChatStore();
    const { handleSubmit, register, setValue, watch, reset } = useForm();
    const message = watch('message');
    const textareaRef = useRef<any>(null);
    const [cursorPosition, setCursorPosition] = useState<any>(null);
    const [load, setLoad] = useState(false);
    const handleOpenTemplate = () => {
        setOnModalTemplate(true);
    };

    const { currentConversation } = useChatStore();

    const handleSendMessage = async (data: any) => {
        if (!load) {
            setLoad(true);
            console.log(data);
            reset();
            const body: ISendMessageResponse = {
                type: 'SMS',
                contactId: currentConversation?.contactId!,
                appointmentId: 'APPOINTMENT_ID',
                message: data.message,
                subject: 'Sample Subject',
                scheduledTimestamp: new Date().getTime(),
                fromNumber: '+18448997259',
                toNumber: currentConversation?.phone!
            }
            const response = await sendMessage(body);
            console.log(response);
        }
    };

    const handleCursorChange = () => {
        if (textareaRef.current) {
            setCursorPosition({
                start: textareaRef.current.selectionStart,
                end: textareaRef.current.selectionEnd
            });
        }
    };

    useEffect(() => {
        if (templateSelected && cursorPosition !== null) {
            const { start, end } = cursorPosition;
            const currentText = message || '';

            const newText =
                currentText.substring(0, start) +
                templateSelected.description +
                currentText.substring(end);

            setValue('message', newText);
            setTemplateSelected(null); // Resetea el template seleccionado
        }
    }, [templateSelected]);

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter' && !e.shiftKey) { // Envía el mensaje solo si Enter es presionado sin Shift
            e.preventDefault();
            handleSubmit(handleSendMessage)();
        }
    };

    return (
        <>
            <div className='footerChat'>
                <form className='flex w-full justify-between items-center p-4 rounded bg-slate-100 gap-4' onSubmit={handleSubmit(handleSendMessage)}>
                    <button type="button" className="btn btn-sm bg-indigo-500 text-white" onClick={handleOpenTemplate}>
                        <DynamicIcon icon='mingcute:paper-fill' className='text-lg text-white' />
                    </button>
                    <textarea
                        className='textareaChat'
                        placeholder='Write a message'

                        {...register('message', { required: true })}
                        ref={(e) => {
                            register('message').ref(e);
                            textareaRef.current = e; // Asigna la referencia manualmente
                        }}
                        onSelect={handleCursorChange}
                        onClick={handleCursorChange}
                        onKeyUp={handleCursorChange}
                        onKeyDown={handleKeyDown} // Envía el mensaje con Enter
                        style={{ maxHeight: '150px', overflowY: 'auto' }}
                    />
                    <button type="submit" className='flex gap-4 items-center' disabled={load}>
                        <DynamicIcon icon='fa-solid:paper-plane' className='text-lg text-gray-500' />
                    </button>
                </form>
            </div>
            <ModalTemplates />
        </>
    );
}
