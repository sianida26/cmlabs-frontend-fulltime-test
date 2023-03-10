import logo from "../../assets/logo.svg"
import { HiOutlineMenuAlt3 } from "react-icons/hi"

type HeaderVariant = "dark-all" | "light-all" | "light-left"

interface Props {
    variant?: HeaderVariant
}

export default function AppHeader(props: Props) {
  return (
    <header className="w-full p-4 lg:px-8">
      <div className={`flex justify-between items-center w-full max-w-screen-2xl mx-auto ${ props.variant === "dark-all" ? "text-black" : "text-white" }`}>
        {/* ganjel sm */}
        <div className="w-8 md:hidden" />

        {/* logo */}
        <img src={ logo } alt="Logo" className={`self-center h-8 ${ props.variant !== "dark-all" && "filter-white" }`} />

        {/* menu */}
        <ul className="hidden md:flex items-center jost gap-8">
          <li>Home</li>
          <li>About Us</li>
          <li>Blog</li>
        </ul>

        {/* drawer button */}
        <button className="rounded-md p-1 md:hidden">
          <HiOutlineMenuAlt3 className={`w-8 h-8 ${ props.variant === "dark-all" ? "text-neutral-700" : "text-white" }`} />
        </button>
      </div>
    </header>
  )
}
