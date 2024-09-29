"use client";

import { Link } from "@i18n";
import { Logo } from "@shared/components/Logo";
import {
	BarChartIcon,
	ChevronDownIcon,
	ChevronRightIcon,
	ClipboardListIcon,
	EditIcon,
	ImageIcon,
	MessageSquareIcon,
	SettingsIcon,
	UploadIcon,
	UserCogIcon,
	VideoIcon,
	Wand2Icon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export function Sidebar() {
	const router = useRouter();
	const pathname = usePathname();
	const [openMenu, setOpenMenu] = useState<string | null>(null);

	const menuItems = [
		{
			label: "仪表盘",
			href: "/app/dashboard",
			icon: BarChartIcon,
		},
		{
			label: "账号规划",
			href: "/app/account-planning",
			icon: ClipboardListIcon,
			subItems: [
				{
					label: "IP 打造",
					href: "/app/account-planning/ip-creation",
					icon: ClipboardListIcon,
				},
				{
					label: "账号打造",
					href: "/app/account-planning/account-creation",
					icon: EditIcon,
				},
			],
		},
		{
			label: "内容选题",
			href: "/app/content-selection",
			icon: Wand2Icon,
			subItems: [
				{
					label: "热点追踪",
					href: "/app/content-selection/hot-tracking",
					icon: BarChartIcon,
				},
				{
					label: "爆款分析",
					href: "/app/content-selection/hot-analysis",
					icon: ClipboardListIcon,
				},
				{
					label: "行业选题",
					href: "/app/content-selection/industry-topics",
					icon: EditIcon,
				},
			],
		},
		{
			label: "内容创作",
			href: "/app/content-creation",
			icon: EditIcon,
			subItems: [
				{
					label: "图文创作",
					href: "/app/content-creation/editor",
					icon: ImageIcon,
				},
				{
					label: "数字人创作",
					href: "/app/content-creation/digital-human",
					icon: VideoIcon,
				},
			],
		},
		{
			label: "发布管理",
			href: "/app/publish-management",
			icon: UploadIcon,
			subItems: [
				{
					label: "账号授权",
					href: "/app/publish-management/account-auth",
					icon: SettingsIcon,
				},
				{
					label: "作品发布",
					href: "/app/publish-management/publish",
					icon: UploadIcon,
				},
				{
					label: "发布记录",
					href: "/app/publish-management/records",
					icon: BarChartIcon,
				},
			],
		},
		{
			label: "线索管理",
			href: "/app/clue-management",
			icon: MessageSquareIcon,
			subItems: [
				{
					label: "数据洞察",
					href: "/app/clue-management/data-insights",
					icon: BarChartIcon,
				},
				{
					label: "评论管理",
					href: "/app/clue-management/comment-management",
					icon: MessageSquareIcon,
				},
			],
		},
		{
			label: "素材中心",
			href: "/app/prompt-manager", // /app/material-center
			icon: ImageIcon,
		},
		{
			label: "设置",
			href: "/app/settings",
			icon: SettingsIcon,
			subItems: [
				{
					label: "个人信息",
					href: "/app/settings/personal-info",
					icon: UserCogIcon,
				},
				{
					label: "账户设置",
					href: "/app/settings/account-settings",
					icon: SettingsIcon,
				},
				{
					label: "系统设置",
					href: "/app/settings/system-settings",
					icon: SettingsIcon,
				},
			],
		},
	];

	const isActiveMenuItem = (href: string) => pathname === href;

	const handleMenuClick = (href: string, hasSubItems: boolean) => {
		if (!hasSubItems) {
			router.push(href);
		}
	};

	const toggleMenu = (label: string) => {
		setOpenMenu(openMenu === label ? null : label);
	};

	return (
		<aside className="w-64 bg-white shadow-md">
			<div className="p-6">
				<Logo />
			</div>
			<nav className="mt-6">
				{menuItems.map((item) => (
					<div key={item.href}>
						<div
							className={`flex items-center justify-between py-3 px-6 font-medium border-l-4 cursor-pointer ${
								isActiveMenuItem(item.href)
									? "text-indigo-600 bg-indigo-50 border-indigo-600"
									: "text-gray-600 hover:bg-gray-100 border-transparent"
							}`}
							onClick={() => {
								handleMenuClick(item.href, !!item.subItems);
								if (item.subItems) toggleMenu(item.label);
							}}
						>
							<div className="flex items-center">
								<item.icon className="inline-block w-5 h-5 mr-2" />
								{item.label}
							</div>
							{item.subItems && (
								<span>
									{openMenu === item.label ? (
										<ChevronDownIcon className="w-4 h-4" />
									) : (
										<ChevronRightIcon className="w-4 h-4" />
									)}
								</span>
							)}
						</div>
						{item.subItems && (
							<div
								className={`overflow-hidden transition-all duration-300 ${
									openMenu === item.label ? "max-h-screen" : "max-h-0"
								}`}
							>
								{item.subItems.map((subItem) => (
									<Link key={subItem.href} href={subItem.href}>
										<div
											className={`flex items-center py-2 pl-10 pr-6 font-medium border-l-4 cursor-pointer ${
												isActiveMenuItem(subItem.href)
													? "text-indigo-600 bg-indigo-50 border-indigo-600"
													: "text-gray-600 hover:bg-gray-100 border-transparent"
											}`}
										>
											<subItem.icon className="inline-block w-4 h-4 mr-2" />
											{subItem.label}
										</div>
									</Link>
								))}
							</div>
						)}
					</div>
				))}
			</nav>
		</aside>
	);
}
