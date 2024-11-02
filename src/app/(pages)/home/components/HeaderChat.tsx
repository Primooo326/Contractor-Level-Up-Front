import { useChatStore } from '@/hooks/chat.hook'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { StylesConfig } from "react-select";


export default function HeaderChat() {
    const { contactsSelected, messageType, setMessageType } = useChatStore()
    const [options, setOptions] = useState<{ value: any, label: string }[]>([])

    const handleSelectType = (value: any) => {
        setMessageType(value)
    }

    useEffect(() => {
        setOptions([
            { value: "TYPE_SMS", label: "SMS" },
            { value: "TYPE_WHATSAPP", label: "WhatsApp" },
        ])
    }, [])


    const stylesSelect: StylesConfig = {
        control: (styles) => ({ ...styles, borderRadius: '0.5rem', fontSize: '0.875rem', alignContent: 'center' }),
    }
    return (
        <div className='header py-2 px-4' >
            <div className="flex justify-between items-center w-full h-full" >

                <h1 className='font-bold text-lg'>
                    Contactos seleccionados ({contactsSelected.length})
                </h1>
                <Select

                    defaultValue={messageType}
                    className='w-[200px]'
                    onChange={handleSelectType}
                    options={options}
                    styles={stylesSelect}
                />
            </div>
        </div>
    )
}
