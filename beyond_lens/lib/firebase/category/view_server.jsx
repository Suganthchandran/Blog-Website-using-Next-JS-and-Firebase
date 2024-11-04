import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getCategory  = async (id)=> {
    return await getDoc(doc(db, `categories/${id}`)).then((snap)=>snap.data());
  }