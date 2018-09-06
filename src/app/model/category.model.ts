export enum Category {
	Pizza = 'pizza',
    Pasta = 'pasta',
    Drink = 'drink'
}

export function getMaxSizeOfProduct (category: Category) : number {
    if (category == Category.Pizza) return 3;
    if (category == Category.Pasta) return 2;
    if (category == Category.Drink) return 1;
}