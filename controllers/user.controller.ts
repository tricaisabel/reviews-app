import User from "../models/user.model";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NewUser } from "../types/new-user.type";
import { LoginUser } from "../types/login-user.type";
import { getProductById } from "./product.controller";
import { CartItem } from "../types/new-cart-item.type";
import { Size } from "../enums/size.enum";

export const oneDay = 24 * 60 * 60;

export const createToken = (id: string) => {
  const secret = `${process.env.JWT_SECRET}`;
  return jwt.sign({ id }, secret, {
    expiresIn: oneDay,
  });
};

export const signUp = async (newUser: NewUser) => {
  const savedUser = await User.create({
    _id: new mongoose.Types.ObjectId(),
    email: newUser.email,
    password: newUser.password,
    url: newUser.url,
    cart: []
  });

  return savedUser;
};

export const validateNewUser = async (
  email: string,
  password: string
): Promise<void> => {
  const emailExists = await User.exists({ email });

  if (emailExists) {
    throw new Error("This email is already in use");
  }

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email: email,
    password: password,
    url: "url",
  });

  await user.validate();
};

export const checkUserExists = async (userId: string) => {
  const objectIdPattern = /^[0-9a-fA-F]{24}$/;
  if (!objectIdPattern.test(userId)) {
    throw new Error("Please provide a valid ObjectId for userId");
  }

  let user = await User.findById({ _id: userId });
  if (!user) {
    throw new Error("User with given id doesn't exist");
  }
  return user;
};

export const logIn = async (loginUser: LoginUser) => {
  const { email, password } = loginUser;

  const user = await User.findOne({ email });
  if (!user) {
    return null;
  }
  console.log(password, user.password)
  const auth = await bcrypt.compare(password, user.password);
  if (!auth) {
    return null;
  }

  return user;
};

export const addProductToCart = async (productId: string, userId: string, quantity: number, size: Size)=>{
  try{
      const user = await checkUserExists(userId);
      const product = await getProductById(productId);

      const newCartItem = {
          size,
          quantity,
          productName: product.name,
          productImage: product.url,
          productPrice: product.price
      }
      user.cart.push(newCartItem)

      await user.save();
      return newCartItem;
  }
  catch(error){
      throw error;
  }
}

export const removeItemFromCart = async (itemId: string, userId: string) =>{
  try{
    await checkUserExists(userId);
    await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { cart: { _id: itemId } } },
      { new: true }
  );
  }
  catch(error){
    throw error;
}
}

export const getCartOfUser = async (userId: string)=>{
  try{
    const user = await checkUserExists(userId);
    return user.cart;
  }catch(error){
    throw error;
  }
}
