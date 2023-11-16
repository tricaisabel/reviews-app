import { Colors } from "../enums/color.enum";
import { Tags } from "../enums/tag.enum";

export type ProductForm = {
    name: string;
    url: string;
    price: number;
    tags?: Tags[];
    color?: Colors;
    discount?: number;
    composition: string;
}