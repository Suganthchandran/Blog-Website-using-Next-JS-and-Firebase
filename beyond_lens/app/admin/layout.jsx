"use client"

import AuthContextProvider, { useAuth } from "@/lib/contexts/AuthContext";
import Sidebar from "./components/Sidebar";
import { useAdmin } from "@/lib/firebase/admin/view";

export default function Layout({children}) {
    return <AuthContextProvider>
        <InnerLayout>
            {children}
        </InnerLayout>
    </AuthContextProvider>
}

function InnerLayout({children}) {
    const {user, isloading : authIsLoading} = useAuth();
    const {data, error, isloading} = useAdmin({uid: user?.uid})

    if(authIsLoading || isloading) {
        return <h2>Loading...</h2>
    }

    if(error) {
        return <p>{error}</p>
    }

    if(!data) {
        return <div>
            <h1>You are not Admin</h1>
        </div>
    }
    return <>
        <section className="flex">
        <Sidebar/>
        {children}
        </section>
    </>
}