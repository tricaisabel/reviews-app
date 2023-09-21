import express, { Request, Response } from "express";
import {
  signUp,
  logIn,
  validateNewUser,
  createToken,
  oneDay,
} from "../controllers/user.controller";
import multer from "multer";
import { uploadImage } from "../controllers/upload.controller";
import { Directory } from "../enums/directory.enum";

const authRouter = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

authRouter.post(
  "/signup",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      await validateNewUser(req.body.email, req.body.password);

      const url = await uploadImage(req.file, Directory.USER_DIRECTORY);
      const savedUser = await signUp({
        email: req.body.email,
        password: req.body.password,
        url,
      });
      const token = createToken(savedUser._id.toString());

      res.cookie("jwt", token, { httpOnly: true, maxAge: oneDay * 1000 });
      res.status(201).json({ user: savedUser });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      res.status(400).send(message);
    }
  }
);

authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const user = await logIn(req.body);
    if (!user) {
      return res.status(200).send("Invalid credentials");
    }
    const token = createToken(user._id.toString());

    res.cookie("jwt", token, { httpOnly: true, maxAge: oneDay * 1000 });
    res.status(200).json({
      email: user.email,
      url: user.url,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(400).send(message);
  }
});

authRouter.post("/logout", (req: Request, res: Response) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).send("You have been logged out");
});

export default authRouter;
