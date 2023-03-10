import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BsClock, BsFire } from "react-icons/bs";

import { MealDetail } from "../../interfaces";
import { SimpleIngredientCard } from "../../components";
import { convertEmbedLink } from "../../helper";

export default function Meal() {
	const navigate = useNavigate();
	const { meal: mealId } = useParams();

	const [isLoading, setLoading] = useState(true);
	const [mealData, setMealData] = useState<MealDetail>({
		id: +(mealId ?? 0),
		name: "",
		category: "",
		instructions: [],
		thumbnail: "",
		youtube: "",
		cookingTime: 1 + Math.floor(Math.random() * 700),
		calories: Math.floor(Math.random() * 250),
		ingredients: [],
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios(
					`https://themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
				);
				const data = response.data?.meals?.[0];
				console.log(data);

				const ingredients: { name: string; measure: string }[] = [];

				console.log(data);
				for (let i = 1; i <= 20; i++) {
					const name = data[`strIngredient${i}`];
					const measure = data[`strMeasure${i}`];
					if (name && measure) {
						ingredients.push({ name, measure });
					}
				}

				setMealData((prev) => ({
					...prev,
					name: data.strMeal,
					category: data.strCategory,
					instructions: data.strInstructions.split(/\r\n/),
					thumbnail: data.strMealThumb,
					youtube: data.strYoutube,
					ingredients: ingredients,
				}));

				setLoading(false);
			} catch (e) {
				console.error(e);
				toast.error("Meal tidak ditemukan!");
				navigate("/", { replace: true });
			}
		};

		fetchData();
	}, []);

	return (
		<div className="w-screen min-h-screen bg-lightGreen jost flex flex-col pb-8">
			<div className="flex flex-col md:flex-row">
				{isLoading ? (
					<div className="w-full aspect-square bg-neutral-400 animate-pulse" />
				) : (
					<div className="w-full md:w-1/2 relative bg-red-500" style={{ background: `url(${ mealData.thumbnail })`, backgroundSize: "cover"  }}>
						<div className="w-full h-full" style={{ backdropFilter: "blur(10px) brightness(37%)" }} />
						<img
							src={mealData.thumbnail}
							alt=""
							className="w-full aspect-square object-cover absolute top-0 left-0"
						/>
					</div>
				)}
				<div className="px-4 mt-8">
					{isLoading ? (
						<>
							<div className="w-5/6 rounded-md h-5 bg-neutral-400 animate-pulse mt-1" />
							<div className="w-3/4 rounded-md h-5 bg-neutral-400 animate-pulse mt-2" />
						</>
					) : (
						<h1 className="text-3xl font-bold montserrat">
							{mealData.name}
						</h1>
					)}

					<div className="flex gap-6 items-center mt-2 text-zinc-700 mb-4">
						{isLoading ? (
							<>
								<div className="h-4 rounded-md w-12 bg-neutral-400 animate-pulse" />
								<div className="h-4 rounded-md w-12 bg-neutral-400 animate-pulse" />
							</>
						) : (
							<>
								<div className="flex items-center gap-1 text-xs">
									<BsClock className="text-sm" />{" "}
									{mealData.cookingTime} min
								</div>
								<div className="flex items-center gap-1 text-xs">
									<BsFire className="text-sm" />{" "}
									{mealData.calories} cal
								</div>
							</>
						)}
					</div>

					<div
						className={`rounded-md text-sm border border-neutral-400 px-4 py-0.5 ${
							isLoading
								? "bg-neutral-400 animate-pulse h-6 w-24"
								: "bg-neutral-300 w-min"
						}`}
					>
						{!isLoading && mealData.category}
					</div>

					<div className="mt-4">
						<h2 className="text-xl font-semibold montserrat">
							What You'll Need:
						</h2>

						{/* Ingredients */}
						<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2">
							{isLoading
								? [...new Array(12)].map((_, i) => (
										<SimpleIngredientCard
											key={i}
											loading={true}
										/>
								  ))
								: mealData.ingredients.map((ingredient, i) => (
										<SimpleIngredientCard
											key={i}
											ingredient={ingredient}
										/>
								  ))}
						</div>
					</div>
				</div>
			</div>

			<div className="mt-4 px-4 md:px-8">
				<h2 className="text-xl font-semibold montserrat">
					How To Make:
				</h2>

				<ol
					className={`${
						!isLoading && "list-decimal"
					} pl-5 flex flex-col gap-4`}
				>
					{isLoading
						? [...new Array(6)].map((_, i) => (
								<div className="flex flex-col gap-2">
									<div className="w-full h-5 bg-neutral-400 animate-pulse rounded-md" />
									<div className="w-3/4 h-5 bg-neutral-400 animate-pulse rounded-md" />
								</div>
						  ))
						: mealData.instructions.map((step, i) => (
								<li key={i}>{step}</li>
						  ))}
				</ol>
			</div>

			<div className="mt-4 px-4 md:px-8">
				<h2 className="text-xl font-semibold montserrat">
					Watch and Learn:
				</h2>
				{isLoading ? (
					<div className="w-full aspect-video bg-neutral-400 animate-pulse" />
				) : (
					<iframe
						className="w-full aspect-video"
						src={convertEmbedLink(mealData.youtube)}
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowFullScreen
					/>
				)}
			</div>
		</div>
	);
}
