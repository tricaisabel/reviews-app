import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import firebaseConfig from "../firebase.config";

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export const uploadImage = async (
    file: Express.Multer.File,
    directory: string,
) => {
    const imagePath = `${directory}/${Date.now()}_${file.originalname}`
    const storageRef = ref(storage, imagePath);

    const metadata = {
        contentType: file.mimetype,
    };

    const snapshot = await uploadBytes(storageRef, file.buffer, metadata);
    const url = await getDownloadURL(snapshot.ref);

    return url;
};
