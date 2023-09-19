import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import dotenv from "dotenv";
import { Directory } from "../enums/directory.enum";
import { DefaultImage } from "../enums/default-image.enum";
import { setupFirebase } from "../database";
dotenv.config();

const firebaseStorage = setupFirebase()

export const uploadImage = async (
    file: Express.Multer.File | undefined,
    directory: Directory
): Promise<string> => {
    if (!file) {
        return directory === Directory.COMPANY_DIRECTORY
            ? DefaultImage.COMPANY
            : DefaultImage.USER;
    }
    const imagePath = `${directory}/${Date.now()}_${file.originalname}`;
    const storageRef = ref(firebaseStorage, imagePath);

    const metadata = {
        contentType: file.mimetype,
    };

    const snapshot = await uploadBytes(storageRef, file.buffer, metadata);
    const url = await getDownloadURL(snapshot.ref);

    return url;
};
