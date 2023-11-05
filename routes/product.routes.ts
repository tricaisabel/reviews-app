import express, { Request, Response } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  validateNewProduct,
} from "../controllers/product.controller";
import { uploadImage } from "../controllers/upload.controller";
import multer from "multer";
import reviewRoutes from "./review.routes";
import { Directory } from "../enums/directory.enum";
import { errorHandler } from "./errorHandler";

const productRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

productRouter.use("/:productId/reviews", reviewRoutes);

productRouter.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await getAllProducts();
    res.status(200).json({ products });
  } catch (error) {
    errorHandler(error, res);
  }
});

productRouter.get(
  "/:productId",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { productId } = req.params;

      const product = await getProductById(productId, false);
      res.status(200).json({ product });
    } catch (error) {
      errorHandler(error, res);
    }
  }
);

productRouter.post(
  "/",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      const {name, price, tags, color, discount, composition} = req.body;
      await validateNewProduct({
        name,
        price,
        tags,
        color,
        discount,
        composition,
        url:""
      });
      const url = await uploadImage(req.file, Directory.COMPANY_DIRECTORY);
      const newProduct = await createProduct({
        name,
        url,
        price,
        tags,
        color,
        discount,
        composition
      });
      res.status(201).json({ product: newProduct });
    } catch (error) {
      errorHandler(error, res);
    }
  }
);

export default productRouter;
