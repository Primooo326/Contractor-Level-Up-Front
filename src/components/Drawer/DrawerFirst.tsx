"use client";

import { DynamicIcon } from '@/components/DynamicIcon';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { getUser } from '@/api/users.api';
import { IUser } from '@/models/IUser.model';
import { useChatStore } from '@/hooks/chat.hook';

export default function DrawerFirst() {
    const { setOnModalTemplate, setMessageType, setTemplateSelected, setMessagesSent, setContactsSelected } = useChatStore();
    const [isMounted, setIsMounted] = useState(false);
    const [tokenDecrypted, setTokenDecrypted] = useState({ userName: '', userEmail: '' });
    const [data, setData] = useState<IUser>();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        setIsMounted(true);
        fetchData();
    }, []);

    const handleLogout = () => {
        if (isMounted) {

            setOnModalTemplate(false)
            setMessageType({ value: "TYPE_SMS", label: "SMS" })
            setTemplateSelected(null)
            setContactsSelected([])
            setMessagesSent([])

            Cookies.remove("token")
            router.push("/")
        }
    };

    const fetchData = async () => {
        const token = Cookies.get("token") || null;
        if (token) {
            const decoded = decodeToken(token);
            setTokenDecrypted(decoded);
            const response = await getUser(decoded?.userId);
            setData(response);
        }
    }

    const decodeToken = (token: any) => {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    };

    const menuItems = [
        { icon: 'fa-solid:users', code: 1, label: 'Usuarios', route: '/users' },
        { icon: 'mingcute:paper-fill', code: 2, label: 'Plantillas', route: '/templates' },
        { icon: 'material-symbols:chat', code: 3, label: 'Chats', route: '/home' }
    ];

    const filteredMenuItems = data?.is_admin ? menuItems : menuItems.filter(item => item.code === 3);

    return (
        <div className='drawer1'>
            <div className="header-d1">
                <img src="/logo.jpg" alt="contractor" style={{ width: '280px' }} />
            </div>

            <div className='profile'>
                <img
                    src={`https://ui-avatars.com/api/?name=${tokenDecrypted?.userName?.replaceAll(" ", "+")}&background=random`}
                    alt="contractor"
                    className="rounded-full"
                    style={{ width: '40px' }}
                />
                <div>
                    <div className="flex justify-between items-center">
                        <h1 className='font-bold'>{tokenDecrypted.userName}</h1>
                        <DynamicIcon
                            icon='uil:setting'
                            className="text-lg text-gray-500 cursor-pointer"
                            onClick={() => router.push("/users/profile")}
                        />
                    </div>
                    <p className='text-sm font-light'>{tokenDecrypted.userEmail}</p>
                </div>
            </div>

            <div className="drawer-buttons">
                {filteredMenuItems.map(({ icon, label, route }, idx) => (
                    <Link href={route} key={idx}>
                        <div className={`w-full flex items-center gap-4 p-3 rounded-lg ${pathname === route ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'} transition`}>
                            <div className="flex justify-center items-center bg-white size-10 rounded-full">
                                <DynamicIcon icon={icon} className="text-lg text-gray-500" />
                            </div>
                            <h3 className='font-semibold'>{label}</h3>
                        </div>
                    </Link>
                ))}
            </div>
            <div className='footer'>
                <button className='text-left px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition' onClick={handleLogout}>
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
}

