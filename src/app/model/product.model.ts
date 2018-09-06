import { Category } from './category.model';

export interface Product {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
    priceOfSize: Array<number>;
    category: Category;
    icon: string;
}
