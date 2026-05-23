import Image from "next/image";

import logoWithWordmark from "@/assets/images/logo-with-wordmark.svg";

/**
 * Renders the Digest Engine logo for Sanity Studio chrome.
 */
export function LogoComponent() {
	return (
		<Image
			src={logoWithWordmark}
			alt="Digest Engine"
			priority
			style={{ height: 32, width: "auto" }}
		/>
	);
}
