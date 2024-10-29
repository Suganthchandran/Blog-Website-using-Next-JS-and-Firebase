import { db, storage } from "@/lib/firebase";
import { doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const createNewCategory = async ({data, image})=> {
    if(!data?.name) {
        throw new Error("Name is undefined");
    }

    if(!data?.slug) {
        throw new Error("Slug is undefined");
    }

    if(!image) {
        throw new Error("Image is not selected");
    }

    const imageRef = ref(storage, `categories/${data?.slug}`);
    await uploadBytes(imageRef, image)
    const imageURL = await getDownloadURL(imageRef);
    
    const refe = doc(db, `categories/${data?.slug}`)
    await setDoc(refe, {
        ...data,
        id: data?.slug,
        iconURL: imageURL,
        timestamp: Timestamp.now(),
    })
}

export const updateCategory = async ({data, image})=> {
    if(!data?.name) {
        throw new Error("Name is undefined");
    }

    if(!data?.slug) {
        throw new Error("Slug is undefined");
    }

    var imageURL = data?.iconURL;

    if(image) {
        const imageRef = ref(storage, `categories/${data?.slug}`);
        await uploadBytes(imageRef, image)
        imageURL = await getDownloadURL(imageRef);
    }
    
    const refe = doc(db, `categories/${data?.id}`)
    await updateDoc(refe, {
        ...data,
        iconURL: imageURL,
        timestamp: Timestamp.now(),
    })
}