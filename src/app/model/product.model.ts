import { Category } from './category.model';

export interface Product {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
    price: Array<number>;
    icon: string;
    category: Category;
}
