import { Link } from "react-router-dom";

interface Props {
	imageUrl: string;
	title: string;
	description: string;
	loading: boolean;
}

export default function IngredientCard(props: Partial<Props>) {
	return (
		<Link
      to={`/ingredient/${ props.title?.toLowerCase() ?? "" }`}
			className={`w-full p-6 rounded-xl bg-white flex flex-col overflow-clip hover:scale-110 transition duration-500 focus:outline-none ${ props.loading && "pointer-events-none" }`}
			style={{ boxShadow: "4px 4px 16px 4px rgba(0, 0, 0, 0.25)" }}
		>
			{props.loading ? (
				<div className="w-full aspect-[6/5] bg-neutral-400 animate-pulse" />
			) : (
				<img
					className="w-full aspect-[6/5]"
					src={props.imageUrl}
					alt={props.title}
				/>
			)}

			<div className="mt-2">
				{props.loading ? (
					<>
						<div className="w-16 rounded-md h-5 pb-2 bg-neutral-400 animate-pulse" />
						<div className="w-full rounded-md h-4 pb-2 bg-neutral-400 animate-pulse mt-4" />
						<div className="w-3/4 rounded-md h-4 pb-2 bg-neutral-400 animate-pulse mt-2" />
						<div className="w-full rounded-md h-4 pb-2 bg-neutral-400 animate-pulse mt-2" />
					</>
				) : (
					<>
						<h3 className="font-semibold text-xl">
							{props.title ?? "Title"}
						</h3>
						<p className="line-clamp-3 h-18">
							{props.description ?? "Description"}
						</p>
					</>
				)}
			</div>
		</Link>
	);
}
