"use client"

import { useAuth } from "@/lib/contexts/AuthContext"
import Link from "next/link";

export default function LoginButton() {

    const {user, isLoading, error, handleSignInWithGoogle, handleLogout} = useAuth();

    if(isLoading) {
        return <h1>Loading</h1>
    }
    
    if(user) {
        console.log(user);
        return <div className="flex gap-4 items-center">
            <button onClick={()=>{handleLogout()}} className='bg-black text-white px-6 py-3 rounded-full flex gap-3 '>
                Logout
            </button>
            <Link href="/admin">
                <div className="flex gap-4 items-center rounded-xl bg-green-100 py-2 px-3">
                    <img className="w-12 h-12 object-cover rounded-full" src={user.photoURL} alt="User Photo" />
                    <div className="">
                        <h1 className="font-bold">{user?.displayName}</h1>
                        <h1 className="text-sm text-gray-500">{user?.email}</h1>
                    </div>
                </div>
            </Link>
        </div>
    }

    return <section>
         <button onClick={()=>{handleSignInWithGoogle()}} className='bg-black text-white px-6 py-3 rounded-full flex gap-3 '>
            <img className='w-7' src='/google.png' />
            Login with Google
            </button>
    </section>
}