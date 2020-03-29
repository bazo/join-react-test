import React, { Component } from "react";

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
	onChange
}: {
	prompt?: string | null;
	name?: string | undefined;
	className?: string | undefined;
	value: null | string;
	items: Item[];
	onChange: OnChange;
}) => {
	let options = [];

	if (prompt) {
		options.push(
			<option value="" key="prompt">
				{prompt}
			</option>
		);
	}

	items.forEach(item => {
		options.push(
			<option value={item.value.toString()} key={item.value}>
				{item.label}
			</option>
		);
	});

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
