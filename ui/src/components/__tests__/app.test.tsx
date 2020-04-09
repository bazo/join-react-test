import React from "react";
import { shallow } from "enzyme";
import App from "../app";

test("renders without crashing", () => {
	const wrapper = shallow(<App />);
	expect(wrapper).toMatchSnapshot();
});
