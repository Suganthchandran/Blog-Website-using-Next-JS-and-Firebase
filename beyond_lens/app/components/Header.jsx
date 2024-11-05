import { House, List, MessageCircle } from 'lucide-react'
import '../styles/Header.css'
import LoginButton from './LoginButton'
import AuthContextProvider from '@/lib/contexts/AuthContext'
import Link from 'next/link'

export default function Header() {
    return <nav className='flex flex-row justify-between items-center px-10 py-3 font-semibold border-b border-gray-300'>
        <Link href={'/'}>
            <img className='h-14' src='/hail.jpg' alt='' />
        </Link>
        <ul className='flex flex-row gap-6 items-center text-xl'>
            <Link href={'/'}>
                <li className='flex gap-2 items-center'>
                    <House />
                    Homey
                </li>
            </Link>
            <Link href={'/categories'}>
                <li className='flex gap-2 items-center'>
                    <List />
                    Categories
                </li>
            </Link>
            <Link href={'/contact'}>
                <li className='flex gap-2 items-center'>
                    <MessageCircle />
                    Contact Us
                </li>
            </Link>
        </ul>
        <AuthContextProvider>
            <LoginButton />
        </AuthContextProvider>
    </nav>
}