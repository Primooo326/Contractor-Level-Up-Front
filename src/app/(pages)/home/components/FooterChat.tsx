import { DynamicIcon } from '@/components/DynamicIcon';
import { useChatStore } from '@/hooks/chat.hook';
import React, { useEffect, useRef, useState } from 'react';
import ModalTemplates from './ModalTemplates';
import { useForm } from 'react-hook-form';
import { createLog, getMessagesById, sendMessage } from '@/api/goHighLevel/messages.api';
import { toast } from 'react-toastify';

const ToasDisplayLoader = () => {
    const { contactsSelected, messagesSent } = useChatStore();

    useEffect(() => {
        console.log(messagesSent);
    }, [messagesSent]);

    return (
        <div className='flex items-center gap-2 w-full h-full'>
            <h1 className='font-bold'>Mensajes enviados ({messagesSent.length}/{contactsSelected.length})</h1>
        </div>
    )
}

export default function FooterChat() {

    const { setOnModalTemplate, templateSelected, setTemplateSelected, contactsSelected, messagesSent, setMessagesSent } = useChatStore();

    const { handleSubmit, register, setValue, watch, reset } = useForm();
    const message = watch('message');
    const textareaRef = useRef<any>(null);
    const [cursorPosition, setCursorPosition] = useState<any>(null);
    const [load, setLoad] = useState(false);

    const handleOpenTemplate = () => {
        setOnModalTemplate(true);
    };

    const handleSendMessage = async (data: any) => {
        if (!load) {
            setLoad(true);
            toast.loading(<ToasDisplayLoader />);

            const sentMessages = []; // Array temporal para acumular los mensajes enviados

            for (const contact of contactsSelected) {
                const body: ISendMessageBody = {
                    type: 'SMS',
                    contactId: contact.id,
                    appointmentId: 'APPOINTMENT_ID',
                    message: data.message,
                    subject: 'Sample Subject',
                    scheduledTimestamp: Math.floor(new Date().getTime() / 1000),
                    fromNumber: '+18448997259',
                    toNumber: contact.phone!
                };

                try {
                    const resp = await sendMessage(body);
                    await createLog({ 
                        toNumber: body.toNumber,
                        messageContent: body.message
                     });
                    
                    sentMessages.push(resp.messageId); // Agrega cada messageId al array temporal
                    setMessagesSent((prev) => [...prev, resp.messageId]); // Actualiza el estado con todos los mensajes enviados
                } catch (err) {
                    console.log(err);
                }
            }

            setMessagesSent(sentMessages); // Actualiza el estado con todos los mensajes enviados

            toast.dismiss();
            toast.success(`(${sentMessages.length}/${contactsSelected.length}) mensajes enviados exitosamente`, {
                onClose: () => {
                    setMessagesSent([]);
                }
            });


            setLoad(false);
            reset();
        }
    };

    // const handleSendMessage = async (data: any) => {
    //     if (!load) {
    //         setLoad(true);
    //         toast.loading(<ToasDisplayLoader />);
    //         console.log(data);

    //         for (const contact of contactsSelected) {
    //             const body: ISendMessageBody = {
    //                 type: 'SMS',
    //                 contactId: contact.id,
    //                 appointmentId: 'APPOINTMENT_ID',
    //                 message: data.message,
    //                 subject: 'Sample Subject',
    //                 scheduledTimestamp: Math.floor(new Date().getTime() / 1000),
    //                 fromNumber: '+18448997259',
    //                 toNumber: contact.phone!
    //             };

    //             try {
    //                 const resp = await sendMessage(body);
    //                 console.log(resp);
    //                 // Usamos set para actualizar messagesSent sin sobrescribir el estado previo
    //                 setMessagesSent((prev) => [...prev, resp.messageId]);

    //             } catch (err) {
    //                 console.log(err);
    //             } finally {
    //                 reset();
    //             }
    //         }

    //         setTimeout(() => {
    //             toast.dismiss();
    //             console.log(messagesSent);
    //             toast.success(`(${messagesSent.length}/${contactsSelected.length}) mensajes enviados exitosamente`, {
    //                 onClose: () => {
    //                     // setMessagesSent([]);
    //                 }
    //             });
    //         }, 2000);

    //         setLoad(false);
    //         reset();
    //     }
    // };


    // const handleSendMessage = async (data: any) => {
    //     if (!load) {
    //         setLoad(true);
    //         toast.loading(<ToasDisplayLoader />);
    //         console.log(data);
    //         for (let i = 0; i < contactsSelected.length; i++) {
    //             const body: ISendMessageBody = {
    //                 type: 'SMS',
    //                 contactId: contactsSelected[i].id,
    //                 appointmentId: 'APPOINTMENT_ID',
    //                 message: data.message,
    //                 subject: 'Sample Subject',
    //                 scheduledTimestamp: Math.floor(new Date().getTime() / 1000),
    //                 fromNumber: '+18448997259',
    //                 toNumber: contactsSelected[i].phone!
    //             }
    //             await sendMessage(body).then((resp) => {
    //                 console.log(resp);
    //                 setMessagesSent([...messagesSent, resp.messageId]);
    //             }).catch((err) => {
    //                 console.log(err);
    //             }).finally(() => {
    //                 reset();
    //                 setLoad(false);
    //             });
    //         }
    //         setTimeout(() => {
    //             toast.dismiss();
    //             console.log(messagesSent);
    //             toast.success(`(${messagesSent.length}/${contactsSelected.length}) mensajes enviados exitosamente`, {
    //                 onClose: () => {
    //                     // setMessagesSent([]);
    //                 }
    //             })
    //         }, 2000);
    //         setLoad(false);
    //         reset();
    //     }
    // };

    const handleCursorChange = () => {
        if (textareaRef.current) {
            setCursorPosition({
                start: textareaRef.current.selectionStart,
                end: textareaRef.current.selectionEnd
            });
        }
    };

    useEffect(() => {
        if (templateSelected) {
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

    useEffect(() => {
        textareaRef.current?.focus();

        handleCursorChange();

    }, []);

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
