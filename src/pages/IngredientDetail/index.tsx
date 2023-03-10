
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDebouncedValue } from "@mantine/hooks";

import { AppHeader, Button, Input, MealCard } from "../../components";
import { toTitleCase } from "../../helper";
import { Meal } from "../../interfaces";

export default function IngredientDetail() {

	const { ingredient } = useParams();
	const [ searchValue, setSearchValue ] = useState("");
	const [ loading, setLoading ] = useState(true);
	const [ data, setData ] = useState<Meal[]>([]);
	const [showNumberItems, setShowNumberItems] = useState(12);

	const [debouncedSearchValue] = useDebouncedValue(searchValue, 500);

	const filteredData = useMemo(() => {

		setShowNumberItems(12);

		return data.filter(
			(meal) =>
			  (
				meal.name.toLowerCase()
			  ).indexOf(debouncedSearchValue.toLowerCase()) >= 0
		  );
	}, [data, debouncedSearchValue])

	useEffect(() => {

		const fetchData = async () => {
			try {
				const response = await axios(
					`https://themealdb.com/api/json/v1/1/filter.php?i=${ ingredient }`
				);

				//set ingredients data into master state
				setData(
					response.data.meals?.map((meal: any) => ({
						id: +meal.idMeal,
						thumbnail: meal.strMealThumb ?? "",
						name: meal.strMeal,
						cookingTime: 1 + Math.floor(Math.random() * 700),
						calories: Math.floor(Math.random() * 250),
					})) ?? []
				);

				console.log(response.data)
				
				setLoading(false);
			} catch (e) {
				console.error(e);
				toast.error("Terjadi Kesalahan. Silakan coba lagi");
			}
		}

		fetchData()
	}, [])

	return (
		<div className="w-screen min-h-screen bg-lightGreen jost">
			<section className="w-full ingredient-detail-header text-white relative">
				<AppHeader variant="light-all" />
				<div className="flex flex-col p-4 gap-2 max-w-screen-xl mx-auto	">
					<p>Showing meals with ingredient:</p>
					<h1 className="text-5xl font-semibold">
						{toTitleCase(ingredient ?? "")}
					</h1>

					<div className=" bg-white p-4 text-[#1D2401] flex flex-col md:flex-row md:gap-4 max-w-screen-md mx-auto items-center rounded-md border border-neutral-600 relative transform translate-y-1/2">
						<h2 className="text-xl text-center">
							Search Your Meal:
						</h2>
						<form
							onSubmit={(e) => e.preventDefault()}
							className="flex self-stretch flex-col md:flex-row items-center gap-2 lg:flex-grow lg:justify-end"
						>
							<Input
								type="text"
								placeholder="Enter Meal Name"
								value={searchValue}
								onChange={(e) => setSearchValue(e.target.value)}
								className="text-black w-full py-2 px-3 rounded-md border border-neutral-400 caret-green-600 focus:outline-green-600 self-stretch md:w-60 lg:w-80"
							/>
							<Button className="flex-shrink-0">
								Search Meal
							</Button>
						</form>
					</div>
				</div>
			</section>
			
			<section className="mt-20">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full px-4 gap-4 max-w-screen-xl mx-auto">
					{
						loading ? [...new Array(12)].map(x => <MealCard loading={ loading } />)
						: filteredData.slice(0, showNumberItems)
							.map(meal => <MealCard key={ meal.id } meal={ meal } loading={ loading } />)
					}
				</div>
			</section>
		</div>
	);
}
