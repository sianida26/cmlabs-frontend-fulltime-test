export interface Ingredient{
    id: number,
    description: string,
    name: string,
    measure?: string
}

export interface Meal{
    id: number,
    name: string,
    thumbnail: string,
    cookingTime: number,
    calories: number,
}

export interface MealDetail{
    id: number,
    name: string,
    category: string,
    instructions: string[],
    thumbnail: string,
    youtube: string,
    cookingTime: number,
    calories: number,
    ingredients: {
        name: string,
        measure: string,
    }[]
}