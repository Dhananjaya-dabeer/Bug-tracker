'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { HiMiniBugAnt } from "react-icons/hi2";
import classnames from 'classnames'
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const currentPath = usePathname()
    const {logout} = useAuth()
    const links = [
        {label:"Dashboard", href:"/"},
        {label:"Bugs/Tasks", href:"/issues"},
    ]
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center justify-between'>
        <ul className='flex space-x-6 items-center'>
        <Link href={"/"} ><HiMiniBugAnt/></Link>
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
        <Link 
        href={'/login'} 
        onClick={() => logout()}
        className={classnames({
        'text-red-300': true,
        'hover:text-red-500 transition-colors': true,
        })}
        >
        Logout
        </Link>
    </nav>
  )
}

export default Navbar
