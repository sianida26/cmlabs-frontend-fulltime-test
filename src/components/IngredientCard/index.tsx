interface Props {
    imageUrl: string,
    title: string,
    description: string,
}

export default function IngredientCard(props: Props) {
  return (
    <div className="w-full rounded-xl bg-white flex flex-col overflow-clip hover:scale-110 transition duration-500" style={{ boxShadow: "4px 4px 16px 4px rgba(0, 0, 0, 0.25)" }}>
        <img className="w-full aspect-[6/5]" src={ props.imageUrl } alt={ props.title } />

        <div className="p-6">
            <h3 className="font-semibold text-xl">{ props.title }</h3>
            <p className="line-clamp-3 h-18">{ props.description }</p>
        </div>
    </div>
  )
}
