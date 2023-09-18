import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import dotenv from "dotenv";
import { DirectoryEnum } from "../enums/directory.enum";
import { DefaultImageEnum } from "../enums/default-image.enum";
dotenv.config();

const firebaseApp = initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
});
const storage = getStorage(firebaseApp);

export const uploadImage = async (
    file: Express.Multer.File | undefined,
    directory: DirectoryEnum
): Promise<string> => {
    if (!file) {
        let defaultImage = DefaultImageEnum.DEFAULT_USER_IMAGE;
        if(directory === DirectoryEnum.COMPANY_DIRECTORY){
            defaultImage = DefaultImageEnum.DEFAULT_COMPANY_IMAGE
        }
        return defaultImage;
    }
    const imagePath = `${directory}/${Date.now()}_${file.originalname}`
    const storageRef = ref(storage, imagePath);

    const metadata = {
        contentType: file.mimetype,
    };

    const snapshot = await uploadBytes(storageRef, file.buffer, metadata);
    const url = await getDownloadURL(snapshot.ref);

    return url;
};
