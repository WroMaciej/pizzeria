import { Category } from './category.model';

export interface Product {
    id: number;
    category: Category;
    name: string;
    description: string;
    isActive: boolean;
    priceOfSize: Array<number>;
    icon: string;
}
