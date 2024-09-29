import { unstable_httpBatchStreamLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import type { ApiRouter } from "api/trpc/router";
import superjson from "superjson";

export const apiClient = createTRPCReact<ApiRouter>();

export const apiClientProvider = apiClient.createClient({
	links: [
		unstable_httpBatchStreamLink({
			url: "http://localhost:3000/api",
			transformer: superjson,
		}),
	],
});
