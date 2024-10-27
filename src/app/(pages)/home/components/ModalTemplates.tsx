"use client"
import { getTemplates } from '@/api/templates'
import Modal from '@/components/shared/Modal'
import { useChatStore } from '@/hooks/chat.hook'
import React, { useEffect, useState } from 'react'
import { FaXmark } from 'react-icons/fa6'
import Select from 'react-select'
import { stylesSelect } from '@/utils/constants'

export default function ModalTemplates() {

    const { setOnModalTemplate, onModalTemplate } = useChatStore()
    const [templates, setTemplates] = useState<any[]>([]);
    const [tab, setTab] = useState<"sms" | "wha">("sms");
    const [options, setOptions] = useState<{ value: any, label: string }[]>([])

    const fetchData = async (page: number = 1, limit: number = 5) => {
        try {
            const response = await getTemplates({ page, limit });
            console.log(response);

        } catch (error) {
            console.error("Fetch templates error: ", error);
        } finally {
        }
    };
    const handleOpenTemplate = () => {
        setOnModalTemplate(!onModalTemplate)
    }

    const handleSelectMessage = (value: any) => {
        console.log(value);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Modal id="TemplatesChat" className="rounded-xl w-[700px]" isOpen={onModalTemplate} onClose={() => { handleOpenTemplate() }} canCloseEsc={true} canCloseOut={true} >
            <div className='modal-header flex justify-between items-center border-b w-full px-10' >
                <div />
                <h1 className='text-2xl font-bold' >
                    Templates
                </h1>
                <button onClick={() => setOnModalTemplate(false)} >
                    <FaXmark />
                </button>
            </div>
            <div role="tablist" className="tabs tabs-bordered">
                <a role="tab" onClick={() => setTab("sms")} className={`tab ${tab === "sms" ? "tab-active" : ""}`}>SMS</a>
                <a role="tab" onClick={() => setTab("wha")} className={`tab ${tab === "wha" ? "tab-active" : ""}`}>WhatsApp</a>
            </div>

            <div>
                <Select
                    className='w-[350px]'
                    onChange={handleSelectMessage}
                    options={options}
                    styles={stylesSelect}
                    placeholder='Seleccionar rol'
                    isClearable
                />
            </div>

            <div>

            </div>

        </Modal>
    )
}
