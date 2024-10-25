"use client"

import React from 'react';
import './MainLayout.scss';
import DrawerFirst from '@/components/Drawer/DrawerFirst';
import DrawerSecond from '@/components/Drawer/DrawerSecond';
import { usePathname } from 'next/navigation';

interface LayoutProps {
    children: React.ReactNode;
    showSecondDrawer?: boolean;
}

export default function Layout({ children }: LayoutProps) {
    const pathname = usePathname();

    return (
        <main className="mainLayout" data-theme="light">
            <DrawerFirst />
            {pathname === '/home' && <DrawerSecond/>}
            {children}
        </main>
    );
}
