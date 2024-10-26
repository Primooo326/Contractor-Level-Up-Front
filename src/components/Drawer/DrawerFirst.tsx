"use client";

import { DynamicIcon } from '@/components/DynamicIcon';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";

export default function DrawerFirst() {
    const [isMounted, setIsMounted] = useState(false);
    const [tokenDecrypted, setTokenDecrypted] = useState({ userName: '', userEmail: '' });
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        setIsMounted(true);
        fetchData();
    }, []);

    const handleLogout = () => {
        if (isMounted) {
            console.log('Cerrando sesión...');
            Cookies.remove("token")
            router.push("/")
        }
    };

    const fetchData = () => {
        const token = Cookies.get("token") || null;
        if (token) {
            const decoded = decodeToken(token);
            setTokenDecrypted(decoded);
        }
    }

    const decodeToken = (token: any) => {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    };

    const menuItems = [
        { icon: 'fa-solid:users', label: 'Usuarios', route: '/users' },
        { icon: 'mingcute:paper-fill', label: 'Plantillas', route: '/templates' },
        { icon: 'material-symbols:chat', label: 'Chats', route: '/home' }
    ];

    return (
        <div className='drawer1'>
            <div className="header-d1">
                <img src="/logo.jpg" alt="contractor" style={{ width: '280px' }} />
            </div>

            <div className='profile'>
                <img
                    src={`https://ui-avatars.com/api/?name=${tokenDecrypted.userName.replaceAll(" ", "+")}&background=random`}
                    alt="contractor"
                    className="rounded-full"
                    style={{ width: '40px' }}
                />
                <div>
                    <h1 className='font-bold'>{tokenDecrypted.userName}</h1>
                    <p className='text-sm font-light'>{tokenDecrypted.userEmail}</p>
                </div>
            </div>

            <div className="drawer-buttons">
                {menuItems.map(({ icon, label, route }, idx) => (
                    <Link href={route} key={idx}>
                        <button className={`w-full flex items-center gap-4 p-3 rounded-lg ${pathname === route ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'} transition`}>
                            <div className="flex justify-center items-center bg-white size-10 rounded-full">
                                <DynamicIcon icon={icon} className="text-lg text-gray-500" />
                            </div>
                            <h3 className='font-semibold'>{label}</h3>
                        </button>
                    </Link>
                ))}
            </div>
        </div>
    );
}
