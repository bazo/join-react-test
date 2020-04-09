import React from "react";

interface Item {
	value: string;
	label: string;
}

type OnChange = (value: string) => void;

const Select = ({
	prompt = null,
	name = undefined,
	className = undefined,
	value,
	items,
	onChange,
}: {
	prompt?: string | null;
	name?: string | undefined;
	className?: string | undefined;
	value: null | string;
	items: Item[];
	onChange: OnChange;
}) => {
	let options = items.map(item => (
		<option value={item.value.toString()} key={item.value}>
			{item.label}
		</option>
	));

	if (prompt) {
		options = [
			<option value="" key="prompt">
				{prompt}
			</option>,
			...options,
		];
	}

	return (
		<select
			{...{ name, className }}
			value={value || ""}
			onChange={e => {
				onChange(e.target.value);
			}}
		>
			{options}
		</select>
	);
};

export default Select;
