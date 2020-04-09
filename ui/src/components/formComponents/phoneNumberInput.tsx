import React, { useRef, useState, ChangeEvent } from "react";
import { CountrySelect, CountryData, countriesData } from "./countrySelect";
import { parsePhoneNumberFromString, AsYouType, CountryCode } from "libphonenumber-js";
import { TextField } from "@material-ui/core";

type PhoneNumber = {
	dialCode: string | undefined | null;
	number: string | undefined | null;
	country: string | undefined | null;
};

export function formatPhoneNumber(value: string): PhoneNumber {
	if (value) {
		const phoneNumber = parsePhoneNumberFromString(value);
		if (phoneNumber) {
			return {
				dialCode: phoneNumber.countryCallingCode.toString(),
				number: phoneNumber.nationalNumber.toString(),
				country: phoneNumber.country,
			};
		}
	}
	return { dialCode: null, number: "", country: null };
}

export function parsePhoneNumber({ dialCode, number, country }: PhoneNumber, name: string): string {
	return `+${dialCode ? dialCode : ""}${number}`;
}

function formatDropdownOption(country: CountryData): string {
	return `${country.name} (+${country.dialCode})`;
}

function getDialCode(country: string): string | undefined {
	if (!country) {
		return undefined;
	}
	//@ts-ignore
	const countryData = countriesData[country.toLowerCase()] as CountryData;
	return countryData.dialCode;
}

export default function PhoneNumberInput({
	input: { onChange, value, name },
	country,
	label,
	meta,
	...rest
}: {
	input: { onChange: Function; value: PhoneNumber | string; name: string };
	country: string;
	label: string;
	meta: any;
	rest?: any;
}) {
	const ref = useRef<HTMLInputElement>();

	//@ts-ignore
	if (!value.dialCode) {
		let countryData = null;
		if (country) {
			//@ts-ignore
			countryData = countriesData[country.toLowerCase()] as CountryData;
		}

		if (!countryData) {
			countryData = countriesData["ch"];
		}

		//@ts-ignore
		value.dialCode = countryData.dialCode;
	}

	//@ts-ignore
	const [selectedCountry, setCountry] = useState(value.country || country || "af");

	//@ts-ignore
	const [numberValue, setValue] = useState<PhoneNumber>(value);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const number = e.target.value;
		const newValue = { ...numberValue, number };
		setValue(newValue);
		onChange(newValue);
	};

	const onCountryChange = (iso2: string) => {
		const dialCode = getDialCode(iso2);

		const newValue = { ...numberValue, dialCode };
		setValue(newValue);
		setCountry(iso2);
		onChange(newValue);
	};

	return (
		<div className="horizontal">
			<CountrySelect value={selectedCountry} onChange={onCountryChange} formatFunction={formatDropdownOption} />
			<TextField
				name={name}
				type="text"
				label={label}
				value={new AsYouType(selectedCountry.toUpperCase() as CountryCode).input(numberValue.number as string)}
				onChange={handleChange}
				//@ts-ignore
				placeholder={rest.placeholder}
				//ref={ref}
			/>
		</div>
	);
}
