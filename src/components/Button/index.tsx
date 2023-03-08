import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children?: ReactNode;
	className?: string;
}

export default function Button(props: Props) {
	const { children, className, ...rest } = props;

	return (
		<button className={`rounded-md bg-green-700 text-white flex gap-2 px-3 py-2 items-center font-medium ${className}`} {...rest}>
			{children}
		</button>
	);
}
