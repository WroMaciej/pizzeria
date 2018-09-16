import { ProductVariant } from './product.variant.model';

export interface ProductQuantity {
    productVariant: ProductVariant;
    quantity: number;
}
