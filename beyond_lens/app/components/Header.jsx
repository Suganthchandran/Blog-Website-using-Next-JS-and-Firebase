import { House, List, MessageCircle } from 'lucide-react'
import '../styles/Header.css'
import LoginButton from './LoginButton'
import AuthContextProvider from '@/lib/contexts/AuthContext'
import Link from 'next/link'

export default function Header() {
    return <nav className='flex flex-row justify-between items-center px-10 py-3 font-semibold border-b border-gray-300'>
        <Link href={'/'}>
        <img className='h-14' src='/hail.jpg' alt=''/>
        </Link>
        <ul className='flex flex-row gap-6 items-center text-xl'>
            <li className='flex gap-2 items-center'>
                <House />
                Home
            </li>
            <li className='flex gap-2 items-center'>
                <List />
                Blogs
            </li>
            <li className='flex gap-2 items-center'>
                <MessageCircle />
                Contact Us
            </li>
        </ul>
        <AuthContextProvider>
            <LoginButton/>
        </AuthContextProvider>
    </nav>
}