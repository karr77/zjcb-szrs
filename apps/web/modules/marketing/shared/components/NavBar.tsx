"use client";

import { Link } from "@i18n";
import { usePathname } from "@i18n";
import { useUser } from "@saas/auth/hooks/use-user";
import { ColorModeToggle } from "@shared/components/ColorModeToggle";
import { LocaleSwitch } from "@shared/components/LocaleSwitch";
import { Logo } from "@shared/components/Logo";
import { Button } from "@ui/components/button";
import { Sheet, SheetContent, SheetTrigger } from "@ui/components/sheet";
import { cn } from "@ui/lib";
import { MenuIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

export function NavBar() {
	const t = useTranslations();
	const { user } = useUser();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const pathname = usePathname();
	const [isTop, setIsTop] = useState(true);
	const [visibleElements, setVisibleElements] = useState([false, false, false, false, false, false]);

	const debouncedScrollHandler = useDebounceCallback(
		() => {
			setIsTop(window.scrollY <= 10);
		},
		150,
		{
			maxWait: 150,
		},
	);

	useEffect(() => {
		window.addEventListener("scroll", debouncedScrollHandler);
		debouncedScrollHandler();
		return () => {
			window.removeEventListener("scroll", debouncedScrollHandler);
		};
	}, [debouncedScrollHandler]);

	useEffect(() => {
		setMobileMenuOpen(false);
	}, [pathname]);

	useEffect(() => {
		const timers = visibleElements.map((_, index) => 
			setTimeout(() => {
				setVisibleElements(prev => {
					const newState = [...prev];
					newState[index] = true;
					return newState;
				});
			}, 100 + index * 100)
		);

		return () => timers.forEach(clearTimeout);
	}, []);

	const menuItems: {
		label: string;
		href: string;
	}[] = [
		{
			label: t("common.menu.pricing"),
			href: "/pricing",
		},
		{
			label: t("common.menu.blog"),
			href: "/blog",
		},
		{
			label: t("common.menu.changelog"),
			href: "/changelog",
		},
		{
			label: t("common.menu.docs"),
			href: "/docs",
		},
	];

	const isMenuItemActive = (href: string) => pathname.startsWith(href);

	return (
		<nav
			className={`fixed top-0 left-0 z-50 w-full ${isTop ? "shadow-none" : "bg-card/80 shadow-sm backdrop-blur-lg"} transition-shadow duration-200`}
			data-test="navigation"
		>
			<div className="container">
				<div
					className={`flex items-center justify-stretch gap-6 ${isTop ? "py-8" : "py-4"} transition-[padding] duration-200`}
				>
					<div className={`flex flex-1 justify-start transition-all duration-500 ${visibleElements[0] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
						<Link
							href="/"
							className="block hover:no-underline active:no-underline"
						>
							<Logo />
						</Link>
					</div>

					<div className="hidden flex-1 items-center justify-center md:flex">
						{menuItems.map((menuItem, index) => (
							<Link
								key={menuItem.href}
								href={menuItem.href}
								className={cn(
									"block px-3 py-2 font-medium text-foreground/80 text-sm transition-all duration-500",
									isMenuItemActive(menuItem.href)
										? "font-bold text-foreground"
										: "",
									visibleElements[index + 1] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
								)}
							>
								{menuItem.label}
							</Link>
						))}
					</div>

					<div className="flex flex-1 items-center justify-end gap-3">
						<div className={`transition-all duration-500 ${visibleElements[5] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
							<ColorModeToggle />
						</div>
						<div className={`transition-all duration-500 ${visibleElements[5] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
							<LocaleSwitch />
						</div>

						<Sheet
							open={mobileMenuOpen}
							onOpenChange={(open) => setMobileMenuOpen(open)}
						>
							<SheetTrigger asChild>
								<Button
									className={`md:hidden transition-all duration-500 ${visibleElements[5] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
									size="icon"
									variant="outline"
									aria-label="Menu"
								>
									<MenuIcon className="size-4" />
								</Button>
							</SheetTrigger>
							<SheetContent className="w-[250px]" side="right">
								<div className="flex flex-col items-start justify-center">
									{menuItems.map((menuItem) => (
										<Link
											key={menuItem.href}
											href={menuItem.href}
											className={cn(
												"block px-3 py-2 font-medium text-base text-foreground/80",
												isMenuItemActive(menuItem.href)
													? "font-bold text-foreground"
													: "",
											)}
										>
											{menuItem.label}
										</Link>
									))}

									<Link
										key={user ? "dashboard" : "login"}
										href={user ? "/app" : "/auth/login"}
										className="block px-3 py-2 text-base"
										prefetch={!user}
									>
										{user ? t("common.menu.dashboard") : t("common.menu.login")}
									</Link>
								</div>
							</SheetContent>
						</Sheet>

						{user ? (
							<Button
								key="dashboard"
								className={`hidden md:flex transition-all duration-500 ${visibleElements[5] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
								asChild
								variant="secondary"
							>
								<Link href="/app">{t("common.menu.dashboard")}</Link>
							</Button>
						) : (
							<Button
								key="login"
								className={`hidden md:flex transition-all duration-500 ${visibleElements[5] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
								asChild
								variant="secondary"
							>
								<Link href="/auth/login">{t("common.menu.login")}</Link>
							</Button>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}
