import { db, storage } from "@/lib/firebase";
import { collection, deleteDoc, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const createNewAuthor = async ({data, image})=> {
    if(!data?.name) {
        throw new Error("Name is undefined");
    }

    // if(!data?.email) {
    //     throw new Error("Email is undefined");
    // }

    if(!image) {
        throw new Error("Image is not selected");
    }

    const id = doc(collection(db, 'ids')).id;

    const imageRef = ref(storage, `authors/${id}`);
    await uploadBytes(imageRef, image)
    const imageURL = await getDownloadURL(imageRef);
    
    const refe = doc(db, `authors/${id}`)
    await setDoc(refe, {
        ...data,
        id: id,
        photoURL: imageURL,
        timestamp: Timestamp.now(),
    })
}

export const updateAuthor = async ({data, image})=> {
    if(!data?.name) {
        throw new Error("Name is undefined");
    }

    // if(!data?.email) {
    //     throw new Error("Email is undefined");
    // }

    var imageURL = data?.photoURL;

    if(image) {
        const imageRef = ref(storage, `authors/${data?.id}`);
        await uploadBytes(imageRef, image)
        imageURL = await getDownloadURL(imageRef);
    }
    
    const refe = doc(db, `authors/${data?.id}`)
    await updateDoc(refe, {
        ...data,
        photoURL: imageURL,
        timestamp: Timestamp.now(),
    })
}

export const deleteAuthor = async (id)=> {
    if(!id) {
        throw new Error('Id id required');
    }

    await deleteDoc(doc(db, `authors/${id}`))
}