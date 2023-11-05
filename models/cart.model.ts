import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
