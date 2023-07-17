# Overview

This repository serves as a small demonstrative space to address a specific issue related to Next.js 13 and Jest testing, previously raised on both [Stackoverflow](https://stackoverflow.com/questions/74891205/next-13-jest-test-fails-using-next-headers) and [Github Issues](https://github.com/vercel/next.js/discussions/44270)

## Issue Description

While executing `yarn test`, if any component imports anything from the server-components, Jest tests fail. I.e. the issue
in `Simple.tsx` occurs because of an error relating to the next/headers import as illustrated below:

```
  x NEXT_RSC_ERR_CLIENT_IMPORT: next/headers
       ,-[1:1]
     1 | import { cookies } from 'next/headers';
       : ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     2 |
     3 | function Simple() {
     4 |   console.log({ cookies });
```

## Current Solution

I have observed that the issue stems from the `next/jest` setup, where `SWC` is used as the transform. To mitigate this issue, the following changes are made:

Added new `jest.config.js` file with the following configuration:

```javascript
module.exports = {
	setupFilesAfterEnv: ["./jest/setup.js"],
	testEnvironment: "jest-environment-jsdom",
	transform: {
		"^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
	},
};
```

The purpose of this new configuration file is to replace SWC with Babel for transforming JS, JSX, TS, and TSX files.

Added `server-only.js` file to mock directory to simulate the server components. This mock prevents the error from being thrown.

```javascript
module.exports = {};
```

With these changes in place, Jest tests involving components that import anything from the server-components should now pass without any issues.
