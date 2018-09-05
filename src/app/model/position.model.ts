import { Product } from './product.model';

export interface Position {
    product: Product;
    size: number;
    quantity: number;
}