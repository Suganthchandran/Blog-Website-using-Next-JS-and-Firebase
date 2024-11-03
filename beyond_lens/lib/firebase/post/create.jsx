import { db, storage } from "@/lib/firebase";
import { deleteDoc, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const createNewPost = async ({data, image})=> {
    if(!data?.name) {
        throw new Error("Name is undefined");
    }

    if(!data?.slug) {
        throw new Error("Slug is undefined");
    }

    if(!image) {
        throw new Error("Image is not selected");
    }

    const imageRef = ref(storage, `posts/${data?.slug}`);
    await uploadBytes(imageRef, image)
    const imageURL = await getDownloadURL(imageRef);
    
    const refe = doc(db, `posts/${data?.slug}`)
    await setDoc(refe, {
        ...data,
        id: data?.slug,
        imageURL: imageURL,
        timestamp: Timestamp.now(),
    })
}

export const updatePost = async ({data, image})=> {
    if(!data?.name) {
        throw new Error("Name is undefined");
    }

    if(!data?.slug) {
        throw new Error("Slug is undefined");
    }

    var imageURL = data?.imageURL;

    if(image) {
        const imageRef = ref(storage, `posts/${data?.slug}`);
        await uploadBytes(imageRef, image)
        imageURL = await getDownloadURL(imageRef);
    }
    
    const refe = doc(db, `posts/${data?.id}`)
    await updateDoc(refe, {
        ...data,
        imageURL: imageURL,
        timestamp: Timestamp.now(),
    })
}

export const deletePost = async (id)=> {
    if(!id) {
        throw new Error('Id id required');
    }

    await deleteDoc(doc(db, `posts/${id}`))
}