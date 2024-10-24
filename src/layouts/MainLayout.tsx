import React from 'react'
import { DynamicIcon } from '@/components/DynamicIcon'
import './MainLayout.scss'
import "../app/globals.scss";
export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="mainLayout">
            <div className='drawer'>
                <div className="header flex justify-center items-center gap-4 w-full">
                    <img src="/logo.png" alt="contractor" style={{ width: '40px' }} />
                    <h1 className='font-bold text-xl'>Contractor</h1>
                </div>
            </div>
            <div className='drawer2'>

                <h1>Contractor Level Up Front</h1>
            </div>
            {children}
        </main>
    )
}
