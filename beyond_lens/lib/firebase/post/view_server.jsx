import { db } from "@/lib/firebase"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"

export const getAllPosts = async ()=> {
    return await getDocs(collection(db,'posts')).then((snaps)=>snaps.docs.map((d)=>d.data()))
}

export const getPost  = async (id)=> {
    return await getDoc(doc(db, `posts/${id}`)).then((snap)=>snap.data());
  }