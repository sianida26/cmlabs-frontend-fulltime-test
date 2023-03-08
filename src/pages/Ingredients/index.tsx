import Button from "../../components/Button";
import pizza from "../../assets/pizza.png";
import { AppHeader, IngredientCard } from "../../components";
import { BsArrowRight } from "react-icons/bs";
import Input from "../../components/Input";

export default function Ingredients() {
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

						<div className="flex-center">
							<Button className="hover:scale-110 transition duration-500">
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
					<form className="flex flex-col md:flex-row items-center gap-2 lg:flex-grow lg:justify-end">
						<Input
							type="text"
							placeholder="Enter Ingredient"
							className="w-full py-2 px-3 rounded-md border border-neutral-400 caret-green-600 focus:outline-green-600 md:w-64 lg:w-80"
						/>
						<Button className="flex-shrink-0">
							Search Ingredient
						</Button>
					</form>
				</section>

				{/* Ingredients list */}
				<section className="w-full max-w-screen-2xl mx-auto py-4 px-8 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:mt-12 gap-8 md:gap-12">
					{Array.from(new Array(12)).map((_, i) => (
						<IngredientCard
                            key={ i }
							imageUrl="https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg"
							description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla varius, metus sed facilisis ullamcorper, tellus arcu placerat mauris, non vulputate dolor tellus convallis elit. Aenean ipsum arcu, euismod vitae accumsan sed, feugiat id ligula. Donec sit amet maximus velit. Vivamus porta facilisis velit, quis luctus odio egestas in. Etiam malesuada lectus sed est hendrerit, sit amet malesuada ante fermentum. Quisque posuere sapien augue, ac scelerisque est euismod eu. Sed faucibus elementum pulvinar."
							// description="aa"
							title="Title"
						/>
					))}
				</section>
			</main>
		</div>
	);
}
