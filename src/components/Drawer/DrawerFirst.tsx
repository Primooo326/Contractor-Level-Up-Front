"use client"; // Asegurarnos de que este es un componente cliente

import { DynamicIcon } from '@/components/DynamicIcon';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";

export default function DrawerFirst() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false); // Nuevo estado para verificar si el componente está montado
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true); // Se monta el componente
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        if (isMounted) {
            console.log('Cerrando sesión...');
            router.push('/login'); // Redirigir a la página de login solo si el componente está montado
        }
    };

    return (
        <div className='drawer'>
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

                <div className="relative">
                    <DynamicIcon icon='octicon:chevron-right-12' className='text-lg text-gray-500 cursor-pointer' onClick={toggleDropdown} />
                    {isDropdownOpen && (
                        <div className='absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg py-2'>
                            <button className='w-full text-left px-4 py-2 text-sm hover:bg-gray-100' onClick={handleLogout}>
                                Cerrar sesión
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
