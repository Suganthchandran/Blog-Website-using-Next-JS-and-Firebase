import { Children, createContext, useContext, useState } from "react";

const CategoryFormContext = createContext();

export default function CategoryFormContextProvider({Children}) {

    const [data,setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleData = (key, value) => {
        setData({
            ...data,
            [key]: value,
        })
    }

    const handleCreate = async ()=> {
        setError(null)
        setIsLoading(true)
        try {

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
        handleCreate
    }}>
        {/* {Children} */}
    </CategoryFormContext.Provider>

}

export const useCategoryForm = ()=> useContext(CategoryFormContext);