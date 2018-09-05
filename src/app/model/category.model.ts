export enum Category {
	Pizza = 'PIZZA',
    Pasta = 'PASTA',
    Drink = 'DRINK'
}

export function getMaxSizeOfProduct (category: Category) : number {
    if (category == Category.Pizza) return 3;
    if (category == Category.Pasta) return 2;
    if (category == Category.Drink) return 1;
}