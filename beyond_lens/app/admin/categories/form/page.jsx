"use client"

import { useSearchParams } from "next/navigation";
import { useCategoryForm } from "./contexts/CategoryFormContext"
import { useEffect } from "react";

export default function Page() {

    const { data, isLoading, error, isDone, handleData, handleCreate, image, setImage, fetchData } = useCategoryForm();

    const searchParams = useSearchParams();
    const updateCategoryId = searchParams.get('id');

    useEffect(()=>{
        if(updateCategoryId) {
            fetchData(updateCategoryId);
        }
    },[updateCategoryId])

    return <main className="w-full p-6 flex gap-4 flex-col">
        <div className="flex gap-6 items-center">
            {
                updateCategoryId && <div>
                            <button className="bg-orange-500 px-4 py-2 rounded-full text-xs font-bold text-white">Update</button>
                    </div>
            }
            {
                !updateCategoryId && <div>
                            <button className="bg-green-500 px-4 py-2 rounded-full text-xs font-bold text-white">Create</button>
                    </div>
            }
            <h1 className="font-bold">Category | Form</h1>
        </div>
        <section className="flex">
            <form onSubmit={(e) => {
                e.preventDefault();
                handleCreate();
            }}
                className="flex flex-col gap-4 border rounded-xl p-7">
                <div className="flex flex-col gap-2">
                    <label className="text-gray-500 text-sm">Category Name <span className="text-red-500">*</span></label>
                    <input onChange={(e) => handleData('name', e.target.value)} value={data?.name || ''} className="bg-gray-50 py-2 px-5 border rounded-full" type="text" placeholder="Enter Category name" required />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-gray-500 text-sm">Category Slug <span className="text-red-500">*</span></label>
                    <input onChange={(e) => handleData('slug', e.target.value)} value={data?.slug || ''} className="bg-gray-50 py-2 px-5 border rounded-full" type="text" placeholder="Enter Category Slug" required />
                </div>
                {image && <div>
                    <img className="h-40" src={URL.createObjectURL(image)} alt="" />
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
                        required
                    />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {!isDone && <button type="submit" className="bg-green-500 font-bold px-4 py-2 rounded-full text-white" disabled={isLoading || isDone}>
                    { isLoading ? 'Loading...' : 'Create'}
                </button>}
                {isDone && <h3 className="text-green-600 text-center font-bold">Successfully Created !</h3>}
            </form>
        </section>
    </main>
}