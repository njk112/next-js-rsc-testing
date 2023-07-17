module.exports = {
	setupFilesAfterEnv: ["./jest/setup.js"],
	testEnvironment: "jest-environment-jsdom",
	transform: {
		"^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
	},
};
