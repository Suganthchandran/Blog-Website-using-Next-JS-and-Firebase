"use client"

import { createNewPost, deletePost, updatePost } from "@/lib/firebase/post/create";
import { getPost } from "@/lib/firebase/post/view";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

const PostFormContext = createContext();

export default function PostFormContextProvider({children}) {

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
            await createNewPost({data: data, image: image});
            setIsDone(true)
            setTimeout(() => {
                router.push('/admin/posts');
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
            await updatePost({data: data, image: image});
            setIsDone(true)
            setTimeout(() => {
                router.push('/admin/posts');
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
            await deletePost(id)
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
            const res = await getPost(id);
            if(res.exists()) {
                setData(res.data())
            }
            else {
                throw new Error(`No Post Found from id ${id}`);
            }
        }
        catch(error) {
            setError(error?.message);
        }
        setIsLoading(false)
    }

    return <PostFormContext.Provider value={{
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
    </PostFormContext.Provider>

}

export const usePostForm = ()=> useContext(PostFormContext);