import Product from "../models/product.model";
import { NewProduct } from "../types/new-product.type";
import mongoose from "mongoose";

export const getAllProducts = async () => {
  const products = await Product.find().select("-reviews -__v").exec();
  return products;
};

export const getProduct = async (productId: string) => {
  const product = await Product.findById(productId)
    .select("-reviews -__v")
    .exec();
  if (!product) {
    throw new Error("Product not found");
  }
};

export const getProductById = async (
  productId: string,
  withReviews: boolean = true
) => {
  let product;

  if (withReviews) {
    product = await Product.findById(productId).exec();
  } else {
    product = await Product.findById(productId).select("-reviews -__v").exec();
  }

  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

export const createProduct = async (newProduct: NewProduct) => {
  const {name, price, tags, color, discount, composition, url} = newProduct;
  const product = await Product.create({
    _id: new mongoose.Types.ObjectId(),
    name,
    price,
    tags,
    color,
    discount, 
    composition,
    url,
    reviews: []
  });

  return product;
};

export const validateNewProduct = async (newProduct: NewProduct): Promise<void> => {
  const {name, price, tags, color, discount, composition,url} = newProduct;
  const user = new Product({
    _id: new mongoose.Types.ObjectId(),
    name,
    price,
    tags,
    color,
    discount, 
    composition,
    reviews: [],
    url: "url"
  });

  await user.validate();
};