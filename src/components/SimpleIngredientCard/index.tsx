import React from "react";
import { Ingredient } from "../../interfaces";

interface Props {
	loading: boolean;
	ingredient: Omit<Ingredient, "id"|"description">;
}

export default function SimpleIngredientCard(props: Partial<Props>) {
	return (
		<div className="bg-white border border-neutral-400 rounded-md flex gap-4">
			{props.loading ? (
				<div className="w-16 aspect-square bg-neutral-400 animate-pulse" />
			) : (
				<img
					className="aspect-square w-16 object-cover md:self-center"
					src={`https://www.themealdb.com/images/ingredients/${
						props.ingredient?.name ?? ""
					}.png`}
				/>
			)}
			<div className="flex flex-col flex-grow pr-2 py-2">
				{props.loading ? (
                    <>
    					<div className="h-5 w-36 rounded-md bg-neutral-400 animate-pulse" />
    					<div className="h-4 mt-1 w-12 rounded-md bg-neutral-400 animate-pulse" />
                    </>
				) : (
                    <>
					<h1 className="text-lg font-semibold">{ props.ingredient?.name }</h1>
                    <p className="text-neutral-700">{ props.ingredient?.measure }</p>
                    </>
				)}
			</div>
		</div>
	);
}
