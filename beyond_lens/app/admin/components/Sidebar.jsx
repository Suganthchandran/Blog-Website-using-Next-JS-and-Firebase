import { LayoutDashboard, List, StickyNote, User } from "lucide-react"
import Link from "next/link"

export default function Sidebar() {

    const link = [
        {
            name: 'DashBoard',
            link: '/admin',
            icon: <LayoutDashboard />
        },
        {
            name: 'Posts',
            link: '/admin/posts',
            icon: <StickyNote />
        },
        {
            name: 'Categories',
            link: '/admin/categories',
            icon: <List />
        },
        {
            name: 'Authors',
            link: '/admin/authors',
            icon: <User />
        }
    ]

    return <section className="w-[200px] h-screen border-r p-6 pt-10">
        <ul className="w-full flex flex-col gap-6">
            {
                link.map((item)=>{
                    return <Link href={item.link} key={item.name}>
                        <li className="flex flex-row gap-3 font-bold items-center bg-green-50 rounded-full px-5 py-3 pl-4">
                            {item.icon}
                            <span className="font-bold">{item.name}</span>
                        </li>
                    </Link>
                })
            }
        </ul>
    </section>
}