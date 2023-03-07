import logo from "../../assets/logo.svg"
import { HiOutlineMenuAlt3 } from "react-icons/hi"

type HeaderVariant = "dark-all" | "light-all" | "light-left"

interface Props {
    variant?: HeaderVariant
}

export default function AppHeader(props: Props) {
  return (
    <header className="w-full p-4">
      <div className="flex justify-between items-center w-full">
        {/* ganjel sm */}
        <div className="w-8" />

        {/* logo */}
        <img src={ logo } alt="Logo" className="self-center h-8" />

        {/* drawer button */}
        <button className="rounded-md p-1">
          <HiOutlineMenuAlt3 className="w-8 h-8 text-neutral-700" />
        </button>
      </div>
    </header>
  )
}
