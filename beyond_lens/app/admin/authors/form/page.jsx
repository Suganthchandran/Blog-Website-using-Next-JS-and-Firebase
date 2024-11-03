"use client"

import { useSearchParams } from "next/navigation";
import { useAuthorForm } from "./contexts/AuthorFormContext"
import { useEffect } from "react";

export default function Page() {

    const { data, isLoading, error, isDone, handleData, handleCreate, image, setImage, fetchData, handleUpdate } = useAuthorForm();

    const searchParams = useSearchParams();
    const updateAuthorId = searchParams.get('id');

    useEffect(()=>{
        if(updateAuthorId) {
            fetchData(updateAuthorId);
        }
    },[updateAuthorId])

    return <main className="w-full p-6 flex gap-4 flex-col">
        <div className="flex gap-6 items-center">
            {
                updateAuthorId && <div>
                            <button className="bg-orange-500 px-4 py-2 rounded-full text-xs font-bold text-white">Update</button>
                    </div>
            }
            {
                !updateAuthorId && <div>
                            <button className="bg-green-500 px-4 py-2 rounded-full text-xs font-bold text-white">Create</button>
                    </div>
            }
            <h1 className="font-bold">Author | Form</h1>
        </div>
        <section className="flex">
            <form onSubmit={(e) => {
                e.preventDefault();
                if(updateAuthorId) {
                    handleUpdate();
                }
                else {
                    handleCreate();
                }
            }}
                className="flex flex-col gap-4 border rounded-xl p-7">
                <div className="flex flex-col gap-2">
                    <label className="text-gray-500 text-sm">Author Name <span className="text-red-500">*</span></label>
                    <input onChange={(e) => handleData('name', e.target.value)} value={data?.name || ''} className="bg-gray-50 py-2 px-5 border rounded-full" type="text" placeholder="Enter Author name" required />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-gray-500 text-sm">Author Email <span className="text-red-500">*</span></label>
                    <input onChange={(e) => handleData('email', e.target.value)} value={data?.email || ''} className="bg-gray-50 py-2 px-5 border rounded-full" type="email" placeholder="Enter Author Email" required />
                </div>
                {image && <div>
                    <img className="h-40" src={URL.createObjectURL(image)} alt="" />
                </div>
                }
                {data?.photoURL && <div>
                    <img className="h-40" src={data?.photoURL} alt="" />
                </div>
                }
                <div className="flex flex-col gap-2">
                    <label className="text-gray-500 text-sm">Image <span className="text-red-500">*</span></label>
                    <input
                        className="bg-gray-50 py-2 px-5 border rounded-full"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            e.preventDefault();
                            setImage(e.target.files[0]);
                        }}
                        // required
                    />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {!isDone && <button type="submit" className="bg-green-500 font-bold px-4 py-2 rounded-full text-white" disabled={isLoading || isDone}>
                    { isLoading ? 'Loading...' : updateAuthorId ? 'Update' : 'Create'}
                </button>}
                {isDone && <h3 className="text-green-600 text-center font-bold">
                    Successfully {updateAuthorId ? 'Updated' : 'Created'} !
                    </h3>}
            </form>
        </section>
    </main>
}