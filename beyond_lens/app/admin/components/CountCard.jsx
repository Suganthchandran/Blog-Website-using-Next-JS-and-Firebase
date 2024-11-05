"use client"

import useCollectionCount from "@/lib/firebase/count"

export default function CountCard({path, name, icon}) {
    const {data, error, isLoading} = useCollectionCount({path: path})

    if(isLoading) {
        return <h2>Loading...</h2>
    }

    if(error) {
        return <h2>Error: {error.message || String(error)}</h2>;
    }

    return <div className="flex gap-2 items-center rounded px-4 py-2 bg-green-100">
        {icon}
        <div>
            <h1 className="font-bold">{name}</h1>
            <h1 className="font-bold text-xl">{data}</h1>
        </div>
    </div>
}