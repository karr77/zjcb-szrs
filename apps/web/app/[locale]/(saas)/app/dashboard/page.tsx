import { redirect } from "@i18n";
import { currentUser } from "@saas/auth/lib/current-user";
import dynamic from "next/dynamic";

const DynamicDashboardContent = dynamic(
	() =>
		import("@saas/dashboard/components/DashboardContent").then(
			(mod) => mod.DashboardContent,
		),
	{ ssr: false },
);

export default async function DashboardPage() {
	const { user } = await currentUser();

	if (!user) {
		return redirect("/auth/login");
	}

	return (
		<div className="container max-w-full py-4">
			<DynamicDashboardContent user={user} />
		</div>
	);
}
