"use client"

import React from 'react';
import './MainLayout.scss';
import DrawerFirst from '@/components/Drawer/DrawerFirst';
import DrawerSecond from '@/components/Drawer/DrawerSecond';
import { usePathname } from 'next/navigation';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface LayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: LayoutProps) {
    const pathname = usePathname();
    const showSecondDrawer = pathname === '/home';

    return (
        <main className={`mainLayout ${showSecondDrawer ? 'with-second-drawer' : ''}`} data-theme="light">
            <DrawerFirst />
            {showSecondDrawer && <DrawerSecond />}
            {children}
            <ToastContainer />
        </main>
    );
}
