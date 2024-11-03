"use client"

import { useAuthorForm } from "../form/contexts/AuthorFormContext"
import Link from "next/link";
import { useAuthors } from "@/lib/firebase/author/view";

export default function AuthorsList() {

    const { data, error, isLoading } = useAuthors();
    const {handleDelete} = useAuthorForm();

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
                    <th className="border px-4 py-2 bg-green-100">Photo</th>
                    <th className="border px-4 py-2 bg-green-100">Name</th>
                    <th className="border px-4 py-2 bg-green-100">Email</th>
                    <th className="border px-4 py-2 bg-green-100">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    data?.map((item, key) => {
                        return <tr key={item.id}>
                            <td className="border px-4 py-2 text-center">{key + 1}</td>
                            <td className="border px-4 py-2"> <img className="h-10" src={item?.photoURL} alt="" /> </td>
                            <td className="border px-4 py-2">{item?.name}</td>
                            <td className="border px-4 py-2">{item?.email}</td>
                            <td className="border py-2 w-80">
                                <div className="flex flex-row justify-evenly">
                                    <Link href={`/admin/authors/form?id=${item.id}`}>
                                        <button className="bg-green-500 font-bold rounded-full px-4 py-2 text-sm text-white">Update</button>
                                    </Link>
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        handleDelete(item.id);
                                    }}
                                        className="bg-red-500 font-bold rounded-full px-4 py-2 text-sm text-white">
                                        Delete
                                    </button>
                                </div>

                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </section>
}