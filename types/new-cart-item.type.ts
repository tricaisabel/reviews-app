import { Size } from "../enums/size.enum";

export type CartItem = {
    productId: string;
    size: Size;
    quantity: number;
    userId: string;
}