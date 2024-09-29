import { redirect } from "@i18n";
import { currentUser } from "@saas/auth/lib/current-user";
import { UserContextProvider } from "@saas/auth/lib/user-context";
import { Sidebar } from "@saas/dashboard/components/Sidebar";
import { Footer } from "@saas/shared/components/Footer";
import { NavBar } from "@saas/shared/components/NavBar";
import type { PropsWithChildren } from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Layout({ children }: PropsWithChildren) {
	const { user, teamMembership } = await currentUser();

	if (!user) {
		return redirect("/auth/login");
	}

	if (!user.onboardingComplete) {
		return redirect("/onboarding");
	}

	if (!user.teamMemberships?.length) {
		return redirect("/onboarding");
	}

	if (!teamMembership) {
		return redirect("/");
	}

	return (
		<UserContextProvider initialUser={user} teamMembership={teamMembership}>
			<div className="flex h-screen bg-gray-100">
				<Sidebar />
				<main className="flex-1 overflow-x-hidden overflow-y-auto">
					<NavBar
						user={user}
						teams={
							user?.teamMemberships?.map((membership) => membership.team) ?? []
						}
					/>
					<div className="min-h-[calc(100vh-12rem)]">{children}</div>
					<Footer />
				</main>
			</div>
		</UserContextProvider>
	);
}
