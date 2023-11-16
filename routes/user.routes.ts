import express, { Request, Response } from "express";
import {
  signUp,
  logIn,
  validateNewUser,
  createToken,
  oneDay,
  addProductToCart,
  getCartOfUser,
  removeItemFromCart,
} from "../controllers/user.controller";
import multer from "multer";
import { uploadImage } from "../controllers/upload.controller";
import { Directory } from "../enums/directory.enum";
import { errorHandler } from "./errorHandler";
import authMiddleware from "../middleware/auth.middleware";

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
      errorHandler(error, res);
    }
  }
);

authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const user = await logIn(req.body);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const token = createToken(user._id.toString());

    res.cookie("jwt", token, { httpOnly: true, maxAge: oneDay * 1000 });
    res.status(200).json({
      user: {
        email: user.email,
        url: user.url,
        isAdmin: user.isAdmin
      },
    });
  } catch (error) {
    errorHandler(error, res);
  }
});

authRouter.post("/logout", (req: Request, res: Response) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).send("You have been logged out");
});

authRouter.post("/cart", authMiddleware, async (req: Request, res: Response) => {
  try {
      const { productId, quantity, size } = req.body;
      const userId = res.locals.user._id;

      const cartItem = await addProductToCart(
          productId,
          userId,
          quantity,
          size
      );
  
       res.status(201).json({ cartItem });
    } catch (error) {
      errorHandler(error, res);
    }
} )

authRouter.delete("/cart/:itemId", authMiddleware, async (req: Request, res: Response) => {
  try {
      const {itemId} = req.params;
      const userId = res.locals.user._id;

      await removeItemFromCart(
        itemId,
          userId
      );
  
       res.status(200).json();
    } catch (error) {
      errorHandler(error, res);
    }
} )

authRouter.get("/cart", authMiddleware, async (req: Request, res: Response) => {
  try {
      const userId = res.locals.user._id;

      const cartItems = await getCartOfUser(userId);
  
       res.status(200).json({ cartItems });
    } catch (error) {
      errorHandler(error, res);
    }
} )

export default authRouter;
