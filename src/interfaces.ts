export interface Ingredient{
    id: number,
    description: string,
    name: string,
}

export interface Meal{
    id: number,
    name: string,
    thumbnail: string,
    cookingTime: number,
    calories: number,
}