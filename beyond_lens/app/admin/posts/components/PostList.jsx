"use client"

import { usePosts } from "@/lib/firebase/post/view";
import Link from "next/link";
import { usePostForm } from "../form/contexts/CategoryFormContext";

export default function PostList() {

    const { data, error, isLoading } = usePosts();
    const {handleDelete} = usePostForm();

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
                    data?.map((item, key) => {
                        return <tr key={item.id}>
                            <td className="border px-4 py-2 text-center">{key + 1}</td>
                            <td className="border px-4 py-2"> <img className="h-10" src={item?.imageURL} alt="" /> </td>
                            <td className="border px-4 py-2">{item?.name}</td>
                            <td className="border px-4 py-2">{item?.slug}</td>
                            <td className="border py-2 w-80">
                                <div className="flex flex-row justify-evenly">
                                    <Link href={`/admin/posts/form?id=${item.id}`}>
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