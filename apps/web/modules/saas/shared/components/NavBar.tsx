"use client";

import { UserMenu } from "@marketing/shared/components/UserMenu";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@ui/components/navigation-menu";
import type { ApiOutput } from "api/trpc/router";
import type { Team } from "database";
import { UserRoleSchema } from "database";
import { Bell } from "lucide-react";
import { useTranslations } from "next-intl";
import type { PropsWithChildren } from "react";
import React from "react";

type User = ApiOutput["auth"]["user"];

export function NavBar({
	teams,
	user,
}: PropsWithChildren<{ teams: Team[]; user: User }>) {
	const t = useTranslations();
	const isAdmin = user?.role === UserRoleSchema.Values.ADMIN;

	const menuItems = [
		{
			label: t("dashboard.menu.dashboard"),
			href: "/app/dashboard",
		},
		{
			label: t("dashboard.menu.accountPlanning"),
			href: "/app/account-planning",
		},
		{
			label: t("dashboard.menu.contentSelection"),
			href: "/app/content-selection",
		},
		{
			label: t("dashboard.menu.contentCreation"),
			href: "/app/content-creation",
		},
		{
			label: t("dashboard.menu.publishManagement"),
			href: "/app/publish-management",
		},
		{
			label: t("dashboard.menu.clueManagement"),
			href: "/app/clue-management",
		},
		{
			label: t("dashboard.menu.materialCenter"),
			href: "/app/material-center",
		},
		{
			label: t("dashboard.menu.settings"),
			href: "/app/settings",
		},
		{
			label: "AI 私域系统",
			href: "/app/private-domain",
		},
		{
			label: "行业案例",
			href: "/app/industry-cases",
		},
		{
			label: "使用教程",
			href: "/app/tutorials",
		},
		{
			label: "关于我们",
			href: "/app/about-us",
		},
		...(isAdmin
			? [
					{
						label: t("dashboard.menu.admin"),
						href: "/app/admin",
					},
				]
			: []),
	];

	return (
		<header className="bg-white shadow-sm">
			<div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>AI 公域获客系统</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
									{menuItems.map((item) => (
										<ListItem
											key={item.href}
											title={item.label}
											href={item.href}
										>
											{item.label}
										</ListItem>
									))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger>AI 私域进宝系统</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
									{/* 这里可以添加私域进宝系统的子菜单项 */}
									<ListItem href="/app/private-domain" title="私域进宝系统">
										私域进宝系统的描述
									</ListItem>
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger>关于我们</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
									<ListItem href="/app/about-us" title="关于我们">
										关于我们的描述
									</ListItem>
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
				<div className="flex items-center space-x-4">
					<button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
						<Bell className="h-6 w-6" />
					</button>
					<button className="bg-indigo-600 text-white rounded-full px-4 py-2 text-sm font-medium hover:bg-indigo-700">
						新建项目
					</button>
					<UserMenu />
				</div>
			</div>
		</header>
	);
}

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";
