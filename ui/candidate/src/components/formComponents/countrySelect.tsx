import React, { useMemo, memo } from "react";
import { FieldInputProps } from "react-final-form";
import Select from "./select";

import countriesData from "../../data/countryData.json";

export type CountryData = {
	iso2: string;
	name: string;
	dialCode: string;
	priority: number;
	areaCodes: string[] | null;
};

export { countriesData };

type FormatFunction = (countryData: CountryData) => string;
type OnSelect = (country: string) => void;

function defaultFormatFunction(country: CountryData): string {
	return country.name;
}

export const CountrySelect = ({
	value,
	onChange,
	formatFunction = defaultFormatFunction,
	prompt = ""
}: {
	value: string;
	onChange: OnSelect;
	formatFunction?: FormatFunction;
	prompt?: string;
}) => {
	let selectedValue = value ? value.toLowerCase() : null;
	let options = useMemo(() => {
		return Object.values(countriesData).map(country => ({
			value: country.iso2.toLowerCase(),
			label: formatFunction(country)
		}));
	}, []);
	return <Select prompt={prompt} items={options} value={selectedValue} onChange={onChange} />;
};

const CountrySelectControl = ({ input: { onChange, value, name }, prompt, ...rest }: FieldInputProps<string>) => {
	return <CountrySelect value={value} onChange={onChange} prompt={prompt} />;
};

export default memo(CountrySelectControl);
