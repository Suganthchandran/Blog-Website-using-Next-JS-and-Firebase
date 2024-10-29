"use client"

import { useCategories } from "@/lib/firebase/category/view"
import Link from "next/link";

export default function CategoriesList() {

    const { data, error, isLoading } = useCategories();

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>{error}</h1>
    }

    if (!data) {
        return <h1>Data not found !</h1>
    }

    return <section>
        <table className="w-full">
            <thead>
                <tr>
                    <th className="border px-4 py-2 bg-green-100">Sr.</th>
                    <th className="border px-4 py-2 bg-green-100">Image</th>
                    <th className="border px-4 py-2 bg-green-100">Name</th>
                    <th className="border px-4 py-2 bg-green-100">Slug</th>
                    <th className="border px-4 py-2 bg-green-100">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    data?.map((item,key) => {
                        return <tr key={item.id}>
                            <td className="border px-4 py-2 text-center">{key+1}</td>
                            <td className="border px-4 py-2"> <img className="h-10" src={item?.iconURL} alt="" /> </td>
                            <td className="border px-4 py-2">{item?.name}</td>
                            <td className="border px-4 py-2">{item?.slug}</td>
                            <td className="border px-4 py-2">
                                <Link href={`/admin/categories/form?id=${item.id}`}>
                                    <button className="bg-green-500 font-bold rounded-full px-3 py-1 text-sm text-white">Action</button>
                                </Link>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </section>
}