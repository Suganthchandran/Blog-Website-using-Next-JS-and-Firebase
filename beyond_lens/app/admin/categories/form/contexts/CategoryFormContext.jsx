import { Children, createContext, useContext, useState } from "react";

const CategoryFormContext = createContext();

export default function CategoryFormContextProvider({Children}) {

    const [data,setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    return <CategoryFormContext.Provider value={{

    }}>
        {/* {Children} */}
    </CategoryFormContext.Provider>

}

export const useCategoryForm = ()=> useContext(CategoryFormContext);