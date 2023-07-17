import { cookies } from "next/headers";

function Simple() {
	console.log({ cookies });
	return <div>Simple</div>;
}

export default Simple;
