import express, {Request, Response} from 'express';
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import multer from "multer";
import firebaseConfig from '../firebase.config';

  
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp)
const upload = multer({storage: multer.memoryStorage()})

const uploadRouter = express.Router();

uploadRouter.post('/', upload.single("file"),async (req: Request, res: Response)=>{
    if (!req.file) {
        return res.status(400).json({ error: 'No image provided' });
    }

    try{
        const storageRef = ref(storage, `files/${Date.now()}_${req.file.originalname}`)
        const metadata = {
            contentType: req.file.mimetype
        }

        const snapshot = await uploadBytes(storageRef, req.file.buffer,metadata)
        const downloadURL = await getDownloadURL(snapshot.ref)

        res.status(200).json({
            message: 'Image was successfully uploaded to Firebase storage',
            filename: req.file.originalname,
            type: req.file.mimetype,
            downloadURL
        })
    }
    catch(error){
        res.status(400).json({error})
    }
})

export default uploadRouter;