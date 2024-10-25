"use client";

import { DynamicIcon } from '@/components/DynamicIcon';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";

export default function DrawerFirst() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        if (isMounted) {
            console.log('Cerrando sesión...');
            router.push('/auth');
        }
    };

    return (
        <div className='drawer1'>
            <div className="header flex justify-center items-center gap-4 w-full">
                <img src="/logo.png" alt="contractor" style={{ width: '40px' }} />
                <h1 className='font-bold text-xl'>Contractor</h1>
            </div>
            <div className="flex flex-col gap-4 w-full p-4">
                <button className='bg-gray-100 w-full flex items-center rounded-lg py-3 px-4 gap-4'>
                    <div className="flex justify-center items-center bg-white size-10 rounded-full">
                        <DynamicIcon icon='fa-solid:users' className='text-lg text-gray-500' />
                    </div>
                    <h3 className='font-semibold'>
                        Usuarios
                    </h3>
                </button>

                <button className='bg-gray-100 w-full flex items-center rounded-lg py-3 px-4 gap-4'>
                    <div className="flex justify-center items-center bg-white size-10 rounded-full">
                        <DynamicIcon icon='mingcute:paper-fill' className='text-lg text-gray-500' />
                    </div>
                    <h3 className='font-semibold'>
                        Plantillas
                    </h3>
                </button>
            </div>

            <div className='footer flex justify-between items-center px-3 w-full relative'>
                <div className='flex items-center gap-2 w-full'>
                    <img src="https://ui-avatars.com/api/?name=John+Doe" alt="contractor" className='rounded-full' style={{ width: '40px' }} />
                    <div>
                        <h1 className='font-bold'>Jon Doe</h1>
                        <p className='text-sm font-light'>
                            john@doe.com
                        </p>
                    </div>
                </div>

                <button className='w-full text-left px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 mt-4' onClick={handleLogout}>
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
}
