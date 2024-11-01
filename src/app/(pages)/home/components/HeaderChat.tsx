import { useChatStore } from '@/hooks/chat.hook'

export default function HeaderChat() {
    const { contactsSelected } = useChatStore()

    return (
        <div className='header py-2 px-4' >
            <div className="flex items-center gap-2 w-full h-full" >

                <h1 className='font-bold text-lg'>
                    Contactos seleccionados ({contactsSelected.length})
                </h1>

            </div>
        </div>
    )
}
