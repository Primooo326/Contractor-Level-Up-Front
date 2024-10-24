import React from 'react'
import './MainLayout.scss'
import DrawerFirst from '@/components/shared/Drawer/DrawerFirst'
import DrawerSecond from '@/components/shared/Drawer/DrawerSecond'
export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="mainLayout">

            <DrawerFirst />
            <DrawerSecond />
            {children}
        </main>
    )
}
