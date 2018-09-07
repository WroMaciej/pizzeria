import { Product } from "./product.model";

export interface ProductVariant {
    product: Product;
    size: number;
}