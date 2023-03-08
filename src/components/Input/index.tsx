import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
}

export default function Input(props: Props) {
	const { className, ...rest } = props;

	return (
		<input
			type="text"
			className={`w-full py-2 px-3 rounded-md border border-neutral-400 caret-green-600 focus:outline-green-600 ${className}`}
			{...rest}
		/>
	);
}
