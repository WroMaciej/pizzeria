import { ProductQuantity } from './product.quantity.model';

export interface Order {
    id: number;
    productQuantities: Array<ProductQuantity>;
    totalPrice: number;
    firstName: string;
    lastName: string;
    mobile: string;
    city: string;
    street: string;
    zipCode: string;
}
