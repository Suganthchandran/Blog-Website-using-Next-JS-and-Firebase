import PostFormContextProvider from "./contexts/CategoryFormContext";

export default function Layout({children}) {
    return <PostFormContextProvider>
        {children}
    </PostFormContextProvider>
}