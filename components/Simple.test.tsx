import { render } from "@testing-library/react";

import Simple from "./Simple";
jest.mock("next/headers", () => ({
	cookies: jest.fn(),
}));

describe("<Simple />", () => {
	it("should render Simple component", () => {
		render(<Simple />);
	});
});
