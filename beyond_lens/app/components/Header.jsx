import '../styles/Header.css'

export default function Header() {
    return <nav className='flex flex-row justify-between items-center px-10 py-4 font-semibold border-b border-gray-300'>
        <img className='h-14' src='/hail.jpg' alt=''/>
        <ul className='flex flex-row gap-6 items-center text-xl'>
            <li>Home</li>
            <li>Blogs</li>
            <li>Contact Us</li>
        </ul>
        <button className='bg-blue-700 text-white px-6 py-2.5 rounded-full'>Login</button>
    </nav>
}