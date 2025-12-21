'use client';

import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="w-full border-b border-gray-300 bg-white px-8 py-4">
            <div className='flex items-center justify-start'>
                <Link href="/">
                    <span className='text-3xl font-bold text-blue-500 tracking-tight'>
                        YPK_TaskApp
                    </span>
                </Link>
            </div>
        </nav> 
    )
}