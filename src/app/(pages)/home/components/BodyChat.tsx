import { useChatStore } from '@/hooks/chat.hook'
import { FaXmark } from 'react-icons/fa6'

export default function BodyChat() {

    const { contactsSelected, setContactsSelected } = useChatStore()

    const handleSelectContact = (contact: IConversation) => {
        const contactFound = contactsSelected.findIndex((contactSelected) => contactSelected.id === contact.id);

        if (contactFound !== -1) {
            const newContactsSelected = contactsSelected.filter((c, i) => i !== contactFound);
            setContactsSelected(newContactsSelected);
        } else {
            const newContactsSelected = [...contactsSelected, contact];
            setContactsSelected(newContactsSelected);
        }
    }

    return (
        <div className='bodyChat overflow-y-auto scrollbar-custom p-4'>
            <div className='flex flex-wrap gap-4 w-full'>

                {contactsSelected.map((contact, index) => (
                    <div key={index} className='p-1 pe-4 rounded-full w-fit border flex gap-2 hover:scale-105 transition-all duration-300 hover:bg-gray-100'>
                        <img src={`https://ui-avatars.com/api/?name=${contact!.contactName?.replaceAll(" ", "+")}&background=random`} alt="contractor" className='rounded-full' style={{ width: '40px' }} />
                        <div >
                            <h1 className='font-bold text-sm'>{contact!.contactName}</h1>
                            <p className='text-sm font-light'>
                                {contact!.email}
                            </p>
                        </div>
                        <button onClick={() => handleSelectContact(contact)}>
                            <FaXmark />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
