import { PromptManager } from "@saas/dashboard/components/PromptManager";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
	const t = await getTranslations();

	return {
		title: t("dashboard.menu.promptManager"),
	};
}

export default function PromptManagerPage() {
	return (
		<div className="container w-full max-w-full py-8">
			<PromptManager />
		</div>
	);
}
