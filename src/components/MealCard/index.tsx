import { BsClock, BsFire, BsShareFill, BsSuitHeart } from "react-icons/bs";

import { Link } from "react-router-dom";
import { Meal } from "../../interfaces";

interface Props {
	loading: boolean;
    meal: Meal;
}

export default function MealCard(props: Partial<Props>) {
	return (
		<Link
            to={`/meal/${ props.meal?.id ?? "" }`}
			className={`w-full rounded-xl bg-white flex overflow-clip pr-2 hover:scale-105 transition duration-500 focus:outline-none border border-neutral-600 ${
				props.loading && "pointer-events-none"
			}`}
			style={{ boxShadow: "4px 4px 16px 4px rgba(0, 0, 0, 0.25)" }}
		>
			{props.loading ? (
				<div className="w-28 aspect-square bg-neutral-400 animate-pulse" />
			) : (
				<img
					className="w-28 aspect-square object-cover object-center"
					src={props.meal?.thumbnail}
				/>
			)}

			<div className="flex flex-col p-2 flex-grow gap-1">
				{/* head */}
				<div className="flex justify-between w-full items-center">
					{props.loading ? (
						<div className="w-18 h-6 rounded-md bg-neutral-400 animate-pulse" />
					) : (
						<p className="border-l-2 pl-1 font-semibold text-emerald-800 border-emerald-800">
							Declicious
						</p>
					)}
					<div className="flex items-center gap-3">
						{props.loading ? (
							<>
								<div className="rounded-full h-5 w-5 bg-neutral-400 animate-pulse" />
								<div className="rounded-full h-5 w-5 bg-neutral-400 animate-pulse" />
							</>
						) : (
							<>
								<BsShareFill />
								<BsSuitHeart />
							</>
						)}
					</div>
				</div>

				{/* Name */}
				{props.loading ? (
					<>
						<div className="w-5/6 rounded-md h-5 bg-neutral-400 animate-pulse mt-1" />
						<div className="w-3/4 rounded-md h-5 bg-neutral-400 animate-pulse mt-2" />
					</>
				) : (
					<h1 className="text-xl font-bold montserrat line-clamp-2 h-14">
						{ props.meal?.name }
					</h1>
				)}

				{/* Bottom */}
				<div className="flex justify-between items-center mt-2 text-zinc-700">
					{props.loading ? (
						<>
							<div className="h-4 rounded-md w-12 bg-neutral-400 animate-pulse" />
							<div className="h-4 rounded-md w-12 bg-neutral-400 animate-pulse" />
						</>
					) : (
						<>
							<div className="flex items-center gap-1 text-xs">
								<BsClock className="text-sm" />{" "}
								{props.meal?.cookingTime} min
							</div>
							<div className="flex items-center gap-1 text-xs">
								<BsFire className="text-sm" />{" "}
								{props.meal?.calories} cal
							</div>
						</>
					)}
				</div>
			</div>
		</Link>
	);
}
