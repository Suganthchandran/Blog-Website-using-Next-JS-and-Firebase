import { CirclePlus } from "lucide-react";
import Link from "next/link";

export default function Page() {
    return <main className="p-6 w-full">
       <div className="flex justify-between items-center">
        <h1 className="font-bold">Categories</h1>
            <Link href={'/admin/categories/form'}>
                <button className="bg-green-500 text-white px-4 py-2 flex gap-2 rounded-full font-bold">
                    <CirclePlus />
                    Add
                </button>
            </Link>
       </div>
    </main>
}