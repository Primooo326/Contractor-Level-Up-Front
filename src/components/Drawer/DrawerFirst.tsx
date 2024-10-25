"use client";

import { DynamicIcon } from '@/components/DynamicIcon';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from "next/navigation";

export default function DrawerFirst() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleLogout = () => {
        if (isMounted) {
            console.log('Cerrando sesión...');
            router.push('/auth');
        }
    };

    const menuItems = [
        { icon: 'fa-solid:users', label: 'Usuarios', route: '/users' },
        { icon: 'mingcute:paper-fill', label: 'Plantillas', route: '/templates' }
    ];

    return (
        <div className='drawer1'>
            <div className="header flex justify-center items-center gap-4 w-full">
                <img src="/logo.png" alt="contractor" style={{ width: '40px' }} />
                <h1 className='font-bold text-xl'>Contractor</h1>
            </div>
            <div className='flex items-center gap-2 p-4'>
                <img src="https://ui-avatars.com/api/?name=John+Doe" alt="contractor" className='rounded-full w-10' />
                <div>
                    <h1 className='font-bold'>Jon Doe</h1>
                    <p className='text-sm font-light'>john@doe.com</p>
                </div>
            </div>
            <div className="flex flex-col gap-4 w-full p-4">
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

            <div className='footer flex flex-col items-center gap-3 p-4 bg-gray-100 w-full'>
                <button className='w-full text-left px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition' onClick={handleLogout}>
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
}
