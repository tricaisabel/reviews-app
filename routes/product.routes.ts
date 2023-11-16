import express, { Request, Response } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  validateNewProduct,
} from "../controllers/product.controller";
import { uploadImage } from "../controllers/upload.controller";
import multer from "multer";
import reviewRoutes from "./review.routes";
import { Directory } from "../enums/directory.enum";
import { errorHandler } from "./errorHandler";
import Product from "../models/product.model";
import Stripe from 'stripe';

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_TEST ?? '');
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

productRouter.delete(
  "/:productId",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { productId } = req.params;

      await Product.deleteOne({_id:productId})
      
      res.status(200);
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
      let {name, price, tags, color, discount, composition} = req.body;
      await validateNewProduct({
        name,
        price,
        tags,
        color,
        discount,
        composition,
        url:""
      });
      price = parseInt(price)
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

productRouter.patch(
  "/:productId",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      let {name, price, tags, color, discount, composition} = req.body;
      const { productId } = req.params;
      await validateNewProduct({
        name,
        price,
        tags,
        color,
        discount,
        composition,
        url:""
      });
      price = parseInt(price)
      const url = await uploadImage(req.file, Directory.COMPANY_DIRECTORY) ;
      const newProduct = await updateProduct({
        name,
        url,
        price,
        tags,
        color,
        discount,
        composition
      },productId, req.file);
      res.status(201).json({ product: newProduct });
    } catch (error) {
      errorHandler(error, res);
    }
  }
);

productRouter.post("/payment", async (req, res) => {
	let { amount, id } = req.body
  
	try {
		const payment = await stripeInstance.paymentIntents.create({
			amount,
			currency: "EUR",
			description: "Knit Shop",
			payment_method: id,
      payment_method_types: ['card'], 
			confirm: true,
      return_url: 'https://localhost:5000/success'
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true,
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false,
		})
	}
})

export default productRouter;
