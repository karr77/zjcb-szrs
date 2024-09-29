"use client";
import { Eye, MessageSquare, Users, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type DashboardContentProps = {
	user: {
		name: string;
	} | null;
};

export function DashboardContent({ user }: DashboardContentProps) {
	const t = useTranslations();
	const [stats, setStats] = useState([
		{
			title: "粉丝总数",
			icon: Users,
			value: "0",
			trend: "+0%",
			trendColor: "text-green-500",
		},
		{
			title: "总浏览量",
			icon: Eye,
			value: "0",
			trend: "+0%",
			trendColor: "text-green-500",
		},
		{
			title: "总互动量",
			icon: MessageSquare,
			value: "0",
			trend: "+0%",
			trendColor: "text-green-500",
		},
		{
			title: "待处理任务",
			icon: Zap,
			value: "0",
			trend: "0",
			trendColor: "text-red-500",
		},
	]);

	useEffect(() => {
		// 模拟从API获取数据
		const fetchData = async () => {
			// 这里应该是实际的API调用
			const newStats = [
				{
					title: "粉丝总数",
					icon: Users,
					value: "12,345",
					trend: "+5.2%",
					trendColor: "text-green-500",
				},
				{
					title: "总浏览量",
					icon: Eye,
					value: "1.2M",
					trend: "+8.7%",
					trendColor: "text-green-500",
				},
				{
					title: "总互动量",
					icon: MessageSquare,
					value: "45.6K",
					trend: "+3.1%",
					trendColor: "text-green-500",
				},
				{
					title: "待处理任务",
					icon: Zap,
					value: "7",
					trend: "-2",
					trendColor: "text-red-500",
				},
			];
			setStats(newStats);
		};

		fetchData();
	}, []);

	return (
		<div className="bg-gray-100 min-h-screen">
			<main className="flex-1 overflow-x-hidden overflow-y-auto">
				<div className="container max-w-full mx-auto py-4">
					{/* Welcome message and quick stats */}
					<div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
						<div>
							<h1 className="text-3xl font-bold mb-2">
								你好~ {user?.name} | 欢迎使用招财进宝
							</h1>
							<p className="text-gray-600">小红书公域自媒体IP打造工具</p>
						</div>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
							{stats.map((stat, index) => (
								<div key={index} className="bg-white rounded-lg p-4 shadow-sm">
									<div className="flex items-center justify-between mb-2">
										<stat.icon className="h-6 w-6 text-indigo-600" />
										<span className={`${stat.trendColor} text-sm font-medium`}>
											{stat.trend}
										</span>
									</div>
									<p className="text-2xl font-bold mb-1">{stat.value}</p>
									<p className="text-gray-500 text-sm">{stat.title}</p>
								</div>
							))}
						</div>
					</div>
					{/* Main features */}
					<div className="mb-8">
						<h2 className="text-xl font-semibold mb-4">核心功能</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
							{[
								{
									title: "IP打造",
									desc: "AI驱动的账号规划和IP操盘手笔记",
									color: "from-purple-700 to-purple-900",
								},
								{
									title: "内容制作",
									desc: "智能选题和AI辅助创作",
									color: "from-blue-600 to-blue-800",
								},
								{
									title: "矩阵发布",
									desc: "多账号协同发布和管理",
									color: "from-green-600 to-green-800",
								},
								{
									title: "线索管理",
									desc: "评论私信聚合和商机发现",
									color: "from-orange-500 to-orange-700",
								},
							].map((item, index) => (
								<div
									key={index}
									className={`bg-gradient-to-r ${item.color} rounded-xl p-6 text-white relative overflow-hidden`}
								>
									<h3 className="text-xl font-bold mb-2">{item.title}</h3>
									<p className="text-sm opacity-80">{item.desc}</p>
									<button className="mt-4 bg-white bg-opacity-20 rounded-full px-4 py-1 text-sm">
										立即使用
									</button>
									<div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white bg-opacity-10 rounded-full" />
								</div>
							))}
						</div>
					</div>
					{/* Recent content performance */}
					<div className="mb-8">
						<h2 className="text-xl font-semibold mb-4">最近发布内容表现</h2>
						<div className="bg-white rounded-lg shadow-sm overflow-hidden">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											标题
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											发布时间
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											浏览量
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											点赞数
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											评论数
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{[
										{
											title: "10分钟学会化妆",
											time: "2小时前",
											views: "1.2K",
											likes: 89,
											comments: 12,
										},
										{
											title: "夏日清爽减脂餐",
											time: "5小时前",
											views: "3.5K",
											likes: 256,
											comments: 45,
										},
										{
											title: "居家办公必备神器",
											time: "1天前",
											views: "8.7K",
											likes: 721,
											comments: 98,
										},
										{
											title: "周末遛娃好去处",
											time: "2天前",
											views: "5.4K",
											likes: 432,
											comments: 67,
										},
									].map((content, index) => (
										<tr key={index}>
											<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
												{content.title}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{content.time}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{content.views}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{content.likes}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{content.comments}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					{/* Hot topics */}
					<div>
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-xl font-semibold">热门话题推荐</h2>
							<button className="text-indigo-600 font-semibold">
								查看更多 &gt;
							</button>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
							{[
								"夏日穿搭技巧",
								"居家减肥秘诀",
								"职场加薪攻略",
								"亲子互动游戏",
								"旅行必备好物",
							].map((topic, index) => (
								<div
									key={index}
									className="bg-white rounded-lg overflow-hidden shadow-sm"
								>
									<div className="p-4">
										<h3 className="font-semibold text-sm mb-1">{topic}</h3>
										<p className="text-xs text-gray-500">
											热度：{Math.floor(Math.random() * 1000) + 500}
										</p>
										<button className="mt-2 text-indigo-600 text-sm font-medium">
											选用话题
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
