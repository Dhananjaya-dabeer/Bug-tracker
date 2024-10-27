'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { HiMiniBugAnt } from "react-icons/hi2";
import classnames from 'classnames'

const Navbar = () => {
    const currentPath = usePathname()

    const links = [
        {label:"Dashboard", href:"/"},
        {label:"Bugs/Tasks", href:"/issues"},
    ]
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href={"/"}><HiMiniBugAnt/></Link>
        <ul className='flex space-x-6'>
            {
                links.map((item, idx) => 
                    <Link key={idx} href={item.href} className={classnames({
                        'text-zinc-900': item.href === currentPath,
                        'text-zinc-500': item.href !== currentPath,
                        'hover:text-zinc-800 transition-colors': true
                    })}>{item.label}</Link>
                )
            }
        </ul>
    </nav>
  )
}

export default Navbar