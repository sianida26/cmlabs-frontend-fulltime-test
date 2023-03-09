import Button from "../../components/Button";
import pizza from "../../assets/pizza.png";
import { AppHeader, IngredientCard } from "../../components";
import { BsArrowRight } from "react-icons/bs";
import Input from "../../components/Input";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Ingredient } from "../../interfaces";
import { useDebouncedValue, useScrollIntoView } from "@mantine/hooks";

export default function Ingredients() {

    const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
        offset: 60,
    });

	const [data, setData] = useState<Ingredient[]>([]);
	const [searchValue, setSearchValue] = useState("");
	const [isLoading, setLoading] = useState(true);
	const [showNumberItems, setShowNumberItems] = useState(12);

	const [debouncedSearchValue] = useDebouncedValue(searchValue, 500);

	const filteredData = useMemo(() => {
		return data.filter(
			(ingredient) =>
			  (
				ingredient.name.toLowerCase() +
				ingredient.description.toLowerCase()
			  ).indexOf(debouncedSearchValue.toLowerCase()) >= 0
		  );
	}, [data, debouncedSearchValue])

	// Fetch Data from server
	useEffect(() => {
		const fetchIngredients = async () => {
			try {
				const response = await axios(
					"https://themealdb.com/api/json/v1/1/list.php?i=list"
				);

				//set ingredients data into master state
				setData(
					response.data.meals?.map((meal: any) => ({
						id: +meal.idIngredient,
						description: meal.strDescription ?? "No Description",
						name: meal.strIngredient,
					})) ?? []
				);
				
				setLoading(false);
			} catch (e) {
				console.error(e);
				toast.error("Terjadi Kesalahan. Silakan coba lagi");
			}
		};

		fetchIngredients();
	}, []);

	// reset number of item show when filtering
	useEffect(() => {
		setShowNumberItems(12);
	}, [debouncedSearchValue]);

	const handleShowMore = () => {
		setShowNumberItems((prev) => prev + 12);
	};

	return (
		<div className="w-screen min-h-screen bg-lightGreen jost">
			<AppHeader variant="dark-all" />
			<main className="w-full flex flex-col items-center">
				{/* Hero Section */}
				<section className="w-full p-4 flex flex-col relative text-[#1D2401] text-center md:text-left md:mt-16 md:items-center gap-4 md:flex-row lg:mt-4 lg:px-16 mx-auto md:justify-center">
					<div className="flex flex-col gap-4">
						<h1 className="montserrat text-4xl font-semibold">
							Cooking Made Easy: Quick and Simple Recipes
						</h1>
						<p className="">
							No more stressing over what to cook for dinner. Our
							simple recipes will make your life easier.
						</p>

						<div className="flex-center md:justify-start">
							<Button onClick={ () => scrollIntoView() } className="hover:scale-110 transition duration-500">
								Get Started
								<BsArrowRight />
							</Button>
						</div>
					</div>
					<div className="flex-center">
						<img
							src={pizza}
							alt="Pizza"
							className="aspect-square w-full hover:scale-110 hover:rotate-12 transition duration-500"
						/>
					</div>
				</section>

				{/* Search section */}
				<section className="w-full p-4 flex flex-col md:flex-row md:items-center gap-2 md:pt-12 md:justify-between lg:max-w-screen-lg">
					<h2 className="font-semibold text-2xl text-center text-[#1D2401]">
						Search your Ingredients:
					</h2>
					<form
						onSubmit={(e) => e.preventDefault()}
						className="flex flex-col md:flex-row items-center gap-2 lg:flex-grow lg:justify-end"
					>
						<Input
							type="text"
							placeholder="Enter Ingredient"
							value={searchValue}
							onChange={(e) => setSearchValue(e.target.value)}
							className="w-full py-2 px-3 rounded-md border border-neutral-400 caret-green-600 focus:outline-green-600 md:w-64 lg:w-80"
						/>
						<Button className="flex-shrink-0">
							Search Ingredient
						</Button>
					</form>
				</section>

				{/* Ingredients list */}
				<section ref={ targetRef } className="w-full max-w-screen-2xl mx-auto py-4 px-8 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:mt-12 gap-8 md:gap-12">
					{
					(
						isLoading ? [...new Array(12)]
						: filteredData.length
						? filteredData
						: data.slice(0, showNumberItems)
					).map((ingredient, i) => (
						<IngredientCard
							key={i}
							imageUrl={`https://www.themealdb.com/images/ingredients/${ingredient?.name ?? ""}.png`}
							description={ingredient?.description ?? ""}
							loading={ isLoading }
							title={ingredient?.name ?? ""}
						/>
					))}

					<div className="w-full md:col-span-2 lg:col-span-3 xl:col-span-4">
						<Button onClick={handleShowMore} className="mx-auto">
							Show More
						</Button>
					</div>
				</section>
			</main>
		</div>
	);
}
