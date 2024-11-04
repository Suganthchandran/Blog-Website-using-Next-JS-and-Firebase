import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"

export const getAllPosts = async ()=> {
    return await getDocs(collection(db,'posts')).then((snaps)=>snaps.docs.map((d)=>d.data()))
}