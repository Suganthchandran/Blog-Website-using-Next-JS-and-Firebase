"use client"

import { createNewCategory, deleteCategory, updateCategory } from "@/lib/firebase/category/create";
import { getCategory } from "@/lib/firebase/category/view";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

const CategoryFormContext = createContext();

export default function CategoryFormContextProvider({children}) {

    const [data,setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isDone, setIsDone] = useState(false);
    const [image, setImage] = useState(null);
    const router = useRouter();

    const handleData = (key, value) => {
        setIsDone(false);
        setData({
            ...data,
            [key]: value,
        })
    }

    const handleCreate = async ()=> {
        setError(null)
        setIsLoading(true)
        setIsDone(false);
        try {
            await createNewCategory({data: data, image: image});
            setIsDone(true)
            setTimeout(() => {
                router.push('/admin/categories');
            }, 2000);
        }
        catch(error) {
            setError(error?.message);
        }
        setIsLoading(false)
    }

    const handleUpdate = async ()=> {
        setError(null)
        setIsLoading(true)
        setIsDone(false);
        try {
            await updateCategory({data: data, image: image});
            setIsDone(true)
            setTimeout(() => {
                router.push('/admin/categories');
            }, 2000);
        }
        catch(error) {
            setError(error?.message);
        }
        setIsLoading(false)
    }

    const handleDelete = async (id)=> {
        setError(null)
        setIsLoading(true)
        setIsDone(false);
        try {
            await deleteCategory(id)
            setIsDone(true)
        }
        catch(error) {
            setError(error?.message);
        }
        setIsLoading(false)
    }

    const fetchData = async (id) => {
        setError(null)
        setIsLoading(true)
        setIsDone(false);
        try {
            const res = await getCategory(id);
            if(res.exists()) {
                setData(res.data())
            }
            else {
                throw new Error(`No Category Found from id ${id}`);
            }
        }
        catch(error) {
            setError(error?.message);
        }
        setIsLoading(false)
    }

    return <CategoryFormContext.Provider value={{
        data,
        isLoading,
        error,
        isDone,
        handleData,
        handleCreate,
        image, setImage,
        fetchData,
        handleUpdate, handleDelete
    }}>
        {children}
    </CategoryFormContext.Provider>

}

export const useCategoryForm = ()=> useContext(CategoryFormContext);