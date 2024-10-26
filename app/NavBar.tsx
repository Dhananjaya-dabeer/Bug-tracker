import Link from 'next/link'
import React from 'react'
import { HiMiniBugAnt } from "react-icons/hi2";
const Navbar = () => {
    const links = [
        {label:"Dashboard", href:"/"},
        {label:"Bugs/Tasks", href:"/issues"},
    ]
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href={"/"}><HiMiniBugAnt/></Link>
        <ul className='flex space-x-6'>
            {
                links.map((item, idx) => <li key={idx}>
                    <Link href={item.href} className='text-zinc-300 hover:text-zinc-800 transition-colors'>{item.label}</Link>
                </li>)
            }
        </ul>
    </nav>
  )
}

export default Navbar