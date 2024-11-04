"use client"

import { useSearchParams } from "next/navigation";
import { usePostForm } from "./contexts/PostFormContext"
import { useEffect } from "react";
import { useCategories } from "@/lib/firebase/category/view";
import { useAuthors } from "@/lib/firebase/author/view";
import { RTEField } from "./components/RTEField";

export default function Page() {

    const { data, isLoading, error, isDone, handleData, handleCreate, image, setImage, fetchData, handleUpdate } = usePostForm();

    const searchParams = useSearchParams();
    const updatePostId = searchParams.get('id');

    useEffect(() => {
        if (updatePostId) {
            fetchData(updatePostId);
        }
    }, [updatePostId])

    return <main className="w-full p-6 flex gap-4 flex-col">
        <div className="flex gap-6 items-center">
            {
                updatePostId && <div>
                    <button className="bg-orange-500 px-4 py-2 rounded-full text-xs font-bold text-white">Update</button>
                </div>
            }
            {
                !updatePostId && <div>
                    <button className="bg-green-500 px-4 py-2 rounded-full text-xs font-bold text-white">Create</button>
                </div>
            }
            <h1 className="font-bold">Post | Form</h1>
        </div>
        <section className="flex gap-20">
            <form onSubmit={(e) => {
                e.preventDefault();
                if (updatePostId) {
                    handleUpdate();
                }
                else {
                    handleCreate();
                }
            }}
                className="flex flex-col gap-4 border rounded-xl p-7">
                <div className="flex flex-col gap-2">
                    <label className="text-gray-500 text-sm">Title <span className="text-red-500">*</span></label>
                    <input onChange={(e) => handleData('title', e.target.value)} value={data?.title || ''} className="bg-gray-50 py-2 px-5 border rounded-full" type="text" placeholder="Enter Title" required />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-gray-500 text-sm">Post Slug <span className="text-red-500">*</span></label>
                    <input onChange={(e) => handleData('slug', e.target.value)} value={data?.slug || ''} disabled={updatePostId} className="bg-gray-50 py-2 px-5 border rounded-full" type="text" placeholder="Enter Post Slug" required />
                </div>

                <SelectCategoryField />
                <SelectAuthorField />

                {image && <div>
                    <img className="h-40" src={URL.createObjectURL(image)} alt="" />
                </div>
                }
                {data?.imageURL && <div>
                    <img className="h-40" src={data?.imageURL} alt="" />
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
                    {isLoading ? 'Loading...' : updatePostId ? 'Update' : 'Create'}
                </button>}
                {isDone && <h3 className="text-green-600 text-center font-bold">
                    Successfully {updatePostId ? 'Updated' : 'Created'} !
                </h3>}
            </form>
            <div>
            <RTEField/>
            </div>
        </section>
    </main>
}

function SelectCategoryField() {
    const { data, handleData } = usePostForm();
    const { data : categories } = useCategories();
    return <div className="flex flex-col gap-2">
        <label className="text-gray-500 text-sm">Category <span className="text-red-500">*</span></label>
        <select 
            className="bg-gray-50 py-2 px-5 border rounded-full w-full" 
            name="category" 
            id="category" 
            value={data?.categoryId}
            onChange={(e)=>{
                handleData('categoryId',e.target.value);
            }}
            required
        >
            <option value="">Select Category</option>
            {categories && categories?.map((item) => {
                return <option key={item?.id} value={item?.id}>{item?.name}</option>
            })}
        </select>
    </div>
}

function SelectAuthorField() {
    const { data, handleData } = usePostForm();
    const { data : authors } = useAuthors();
    return <div className="flex flex-col gap-2">
        <label className="text-gray-500 text-sm">Author <span className="text-red-500">*</span></label>
        <select 
            className="bg-gray-50 py-2 px-5 border rounded-full w-full" 
            name="author" 
            id="author" 
            value={data?.authorId}
            onChange={(e)=>{
                handleData('authorId',e.target.value);
            }}
            required
        >
            <option value="">Select Author</option>
            {authors && authors?.map((item) => {
                return <option key={item?.id} value={item?.id}>{item?.name}</option>
            })}
        </select>
    </div>
}