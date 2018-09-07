import { Product } from './product.model';
import { Choice } from './choice.model';

export interface Position {
    choice: Choice;
    quantity: number;
}