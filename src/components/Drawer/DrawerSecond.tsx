"use client";
import { DynamicIcon } from "@/components/DynamicIcon";
import { useEffect, useState } from "react";
import { useChatStore } from "@/hooks/chat.hook";
import { searchContact } from "@/api/goHighLevel/contacts.api";
export default function DrawerSecond() {


  const [contactsList, setContactsList] = useState<IContactSearched[]>([]);
  const { setContactsSelected, contactsSelected } = useChatStore();
  const [queryes, setQueryes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleEnterKey = (e: any) => {

    if (e.key === "Enter") {
      e.preventDefault();
      setQueryes([])
      setContactsList([])
      const queryesToSearch = e.target.value.split(",").map((q: string) => q.trim());
      console.log(queryesToSearch);
      setQueryes(queryesToSearch);

    }

  };

  const fetchSearchUser = async () => {
    try {
      setLoading(true);
      for (let i = 0; i < queryes.length; i++) {
        console.log(queryes[i]);
        searchContact(queryes[i]).then((data) => {
          setContactsList((prevContacts) => {
            console.log([...prevContacts, ...data?.contacts]);
            return [...prevContacts, ...data?.contacts];
          });
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

  };

  const selectContact = (contact: IContactSearched) => {

    console.log(contact);
    const contactFound = contactsSelected.findIndex((contactSelected) => contactSelected.id === contact.id);

    if (contactFound !== -1) {
      const newContactsSelected = contactsSelected.filter((c, i) => i !== contactFound);
      setContactsSelected(newContactsSelected);
    } else {
      const newContactsSelected = [...contactsSelected, contact];
      setContactsSelected(newContactsSelected);
    }

  }

  useEffect(() => {
    fetchSearchUser();
  }, [queryes]);

  return (
    <div className="drawer2">
      <div className="p-4 space-y-6 h-full overflow-hidden mb-6">
        <div className="flex justify-between items-center">
          <label className="input input-bordered input-sm flex items-center gap-2 w-full">
            <DynamicIcon icon="fa-solid:search" className=" text-gray-500" />
            <input
              type="text"
              className="grow"
              placeholder="Search user"
              onKeyUp={handleEnterKey}
            />
          </label>
        </div>
        <div className="h-full space-y-2 overflow-y-auto scrollbar-custom pb-10">
          {contactsList.map((contact, index) => (
            <div
              key={index}
              className="flex justify-between items-center w-full hover:bg-gray-100 p-4 rounded-lg"
              onClick={() => selectContact(contact)}
            >
              <div className="flex items-center gap-2 w-full">
                <img
                  src={`https://ui-avatars.com/api/?name=${contact.contactName}&background=random`}
                  alt="contractor"
                  className="rounded-full"
                  style={{ width: "40px" }}
                />
                <div>
                  <h1 className="font-bold text-sm">
                    {contact.contactName}
                  </h1>
                  <p className="text-sm font-light line-clamp-1">
                    {contact.email}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}