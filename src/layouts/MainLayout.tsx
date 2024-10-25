import React from 'react'
import './MainLayout.scss'
import DrawerFirst from '@/components/Drawer/DrawerFirst'
import DrawerSecond from '@/components/Drawer/DrawerSecond'
export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="mainLayout">

            <DrawerFirst />
            <DrawerSecond />
            {children}
        </main>
    )
}
