import { useChatStore } from '@/hooks/chat.hook'

export default function BodyChat() {

    const { contactsSelected } = useChatStore()

    return (
        <div className='bodyChat overflow-y-auto scrollbar-custom p-4'>
            <div className='flex flex-wrap gap-4 w-full'>

                {contactsSelected.map((contact, index) => (
                    <div className='p-1 pe-4 rounded-full w-fit border flex gap-4' key={index}>
                        <img src={`https://ui-avatars.com/api/?name=${contact!.contactName?.replaceAll(" ", "+")}&background=random`} alt="contractor" className='rounded-full' style={{ width: '40px' }} />
                        <div>
                            <h1 className='font-bold text-sm'>{contact!.contactName}</h1>
                            <p className='text-sm font-light'>
                                {contact!.email}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
