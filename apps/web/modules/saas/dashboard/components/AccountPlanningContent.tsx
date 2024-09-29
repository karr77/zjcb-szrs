"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/avatar";
import { Badge } from "@ui/components/badge";
import { Button } from "@ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/components/card";
import { Input } from "@ui/components/input";
import { ScrollArea } from "@ui/components/scroll-area";
import {} from "@ui/components/toggle-group";
import {
	BookOpen,
	CheckCircle2,
	Crown,
	Eye,
	Heart,
	MessageCircle,
	Search,
	Send,
	TrendingUp,
	Users,
} from "lucide-react";

export function AccountPlanningContent() {
	const steps = [
		{ title: "搜索", status: "complete", result: "找到相关笔记和博主" },
		{ title: "分析", status: "complete", result: "提取关键内容特征" },
		{ title: "总结", status: "current", result: "生成内容策略..." },
		{ title: "建议", status: "upcoming", result: "等待中" },
	];

	const influencers = [
		{
			name: "情感大师",
			fans: "500k+",
			avatar: "https://i.pravatar.cc/100?img=1",
		},
		{
			name: "心理学专家",
			fans: "300k+",
			avatar: "https://i.pravatar.cc/100?img=2",
		},
		{
			name: "恋爱顾问",
			fans: "200k+",
			avatar: "https://i.pravatar.cc/100?img=3",
		},
	];
	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 to-pink-100">
			<nav className="bg-white shadow-lg py-6 mb-6">
				<div className="container mx-auto px-4">
					<div className="flex flex-col md:flex-row md:items-center md:space-x-12">
						<div className="flex items-center space-x-4 mb-4 md:mb-0">
							<BookOpen className="h-8 w-8 text-red-500" />
							<div>
								<h1 className="text-2xl font-bold text-red-600">
									小红书账号规划
								</h1>
								<p className="text-sm text-gray-500">
									定制你的内容，成为红人达人
								</p>
							</div>
						</div>
						<div className="flex-grow">
							<div className="w-full max-w-2xl flex items-center">
								<div className="relative flex-grow">
									<Input
										className="w-full pl-10 pr-4 py-3 rounded-l-full border-2 border-red-200 focus:border-red-400 transition-all duration-300 shadow-sm"
										placeholder="输入你想做的小红书内容分类（如：旅行博主、美食测评）"
										type="search"
									/>
									<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
								</div>
								<Button className="rounded-r-full px-6 py-3 bg-red-500 hover:bg-red-600 transition-colors duration-300 shadow-md">
									AI 账号规划
								</Button>
							</div>
						</div>
					</div>
				</div>
			</nav>

			<div className="flex-grow flex px-6 space-x-6">
				<div className="w-64 flex-shrink-0 space-y-6">
					<Card className="shadow-lg rounded-2xl overflow-hidden">
						<CardContent className="p-6">
							<h2 className="text-xl font-semibold mb-6 text-center text-gray-800">
								分析进度
							</h2>
							<div className="flex justify-center">
								<ol className="relative border-l-2 border-gray-200">
									{steps.map((step, index) => (
										<li key={index} className="mb-8 ml-6">
											<span
												className={`absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-white ${
													step.status === "complete"
														? "bg-green-500"
														: step.status === "current"
															? "bg-blue-500"
															: "bg-gray-200"
												} shadow-md`}
											>
												{step.status === "complete" ? (
													<CheckCircle2 className="w-4 h-4 text-white" />
												) : (
													<span className="text-white text-sm font-bold">
														{index + 1}
													</span>
												)}
											</span>
											<h3
												className={`font-medium text-base ${
													step.status === "complete"
														? "text-green-600"
														: step.status === "current"
															? "text-blue-600"
															: "text-gray-500"
												}`}
											>
												{step.title}
											</h3>
											<p className="text-sm text-gray-500 mt-1">
												{step.result}
											</p>
										</li>
									))}
								</ol>
							</div>
						</CardContent>
					</Card>

					<Card className="shadow-lg rounded-2xl overflow-hidden">
						<CardHeader className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4">
							<CardTitle className="text-xl font-bold text-white flex items-center">
								<Crown className="mr-2" /> 达人榜
							</CardTitle>
						</CardHeader>
						<CardContent className="p-4">
							{influencers.map((influencer, index) => (
								<div
									key={index}
									className="flex items-center space-x-4 mb-4 last:mb-0"
								>
									<div className="relative">
										<Avatar className="w-12 h-12">
											<AvatarImage
												src={influencer.avatar}
												alt={influencer.name}
											/>
											<AvatarFallback>{influencer.name[0]}</AvatarFallback>
										</Avatar>
										<div className="absolute -top-1 -left-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
											<span className="text-xs font-bold text-white">
												{index + 1}
											</span>
										</div>
									</div>
									<div>
										<p className="font-semibold text-gray-800">
											{influencer.name}
										</p>
										<p className="text-sm text-gray-500">
											{influencer.fans} 粉丝
										</p>
									</div>
								</div>
							))}
						</CardContent>
					</Card>
				</div>

				<div className="flex-grow overflow-hidden">
					<ScrollArea className="h-[calc(100vh-12rem)] rounded-2xl border border-gray-200 shadow-lg bg-white">
						<div className="p-6 space-y-6">
							<Card className="overflow-hidden shadow-xl rounded-2xl border-0">
								<CardHeader className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 p-6">
									<CardTitle className="text-2xl font-bold">
										热门情感博主笔记
									</CardTitle>
								</CardHeader>
								<CardContent className="p-6">
									<div className="space-y-6">
										<div className="flex space-x-4">
											<img
												src={`/placeholder.svg?height=120&width=120`}
												alt="Note thumbnail"
												className="w-30 h-30 rounded-lg object-cover"
											/>
											<div className="flex-1">
												<h3 className="font-semibold text-lg mb-2">
													你的执念，可能是心理创伤
												</h3>
												<p className="text-gray-600 text-sm mb-2">
													我们常常被一些想法或行为所困扰，这些可能源于过去的创伤经历。
													<Badge variant="secondary" className="ml-2">
														心理学解析
													</Badge>
												</p>
												<div className="flex items-center space-x-4 text-gray-500">
													<span className="flex items-center">
														<Heart className="w-4 h-4 mr-1" /> 8.7k
													</span>
													<span className="flex items-center">
														<MessageCircle className="w-4 h-4 mr-1" /> 342
													</span>
													<span className="flex items-center">
														<TrendingUp className="w-4 h-4 mr-1" /> 热度 98%
													</span>
												</div>
											</div>
										</div>
										<div className="flex space-x-4">
											<img
												src={`/placeholder.svg?height=120&width=120`}
												alt="Note thumbnail"
												className="w-30 h-30 rounded-lg object-cover"
											/>
											<div className="flex-1">
												<h3 className="font-semibold text-lg mb-2">
													为什么你总是遇到渣男？心理学告诉你真相
												</h3>
												<p className="text-gray-600 text-sm mb-2">
													反复遇到不靠谱的人，可能与你的依恋类型有关。让我们一起探讨如何打破这个循环。
													<Badge variant="secondary" className="ml-2">
														情感分析
													</Badge>
												</p>
												<div className="flex items-center space-x-4 text-gray-500">
													<span className="flex items-center">
														<Heart className="w-4 h-4 mr-1" /> 12.3k
													</span>
													<span className="flex items-center">
														<MessageCircle className="w-4 h-4 mr-1" /> 876
													</span>
													<span className="flex items-center">
														<Eye className="w-4 h-4 mr-1" /> 阅读量 50k+
													</span>
												</div>
											</div>
										</div>
										<div className="flex space-x-4">
											<img
												src={`/placeholder.svg?height=120&width=120`}
												alt="Note thumbnail"
												className="w-30 h-30 rounded-lg object-cover"
											/>
											<div className="flex-1">
												<h3 className="font-semibold text-lg mb-2">
													恋爱中的5种依恋类型，你是哪一种？
												</h3>
												<p className="text-gray-600 text-sm mb-2">
													了解你的依恋类型，可以帮助你更好地经营感情。这篇文章将带你深入探索。
													<Badge variant="secondary" className="ml-2">
														心理测试
													</Badge>
												</p>
												<div className="flex items-center space-x-4 text-gray-500">
													<span className="flex items-center">
														<Heart className="w-4 h-4 mr-1" /> 15.6k
													</span>
													<span className="flex items-center">
														<MessageCircle className="w-4 h-4 mr-1" /> 1.2k
													</span>
													<span className="flex items-center">
														<Users className="w-4 h-4 mr-1" /> 互动率 8.9%
													</span>
												</div>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className="overflow-hidden shadow-xl rounded-2xl border-0">
								<CardHeader className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 p-6">
									<CardTitle className="text-2xl font-bold">
										推荐关注的情感博主
									</CardTitle>
								</CardHeader>
								<CardContent className="p-6">
									<div className="space-y-6">
										{[
											{
												name: "心理学家小王",
												fans: "200k+",
												notes: "800+",
												specialty: "情感心理分析",
												avatar: "https://i.pravatar.cc/100?img=4",
											},
											{
												name: "情感顾问小李",
												fans: "150k+",
												notes: "600+",
												specialty: "关系修复",
												avatar: "https://i.pravatar.cc/100?img=5",
											},
											{
												name: "恋爱达人小张",
												fans: "100k+",
												notes: "500+",
												specialty: "约会技巧",
												avatar: "https://i.pravatar.cc/100?img=6",
											},
										].map((blogger, index) => (
											<div key={index} className="flex items-center space-x-4">
												<Avatar className="w-12 h-12">
													<AvatarImage
														src={blogger.avatar}
														alt={blogger.name}
													/>
													<AvatarFallback>{blogger.name[0]}</AvatarFallback>
												</Avatar>
												<div>
													<h3 className="font-semibold">{blogger.name}</h3>
													<p className="text-sm text-gray-500">
														粉丝 {blogger.fans} | 笔记 {blogger.notes}
													</p>
													<Badge variant="outline" className="mt-1">
														{blogger.specialty}
													</Badge>
												</div>
												<Button variant="outline" className="ml-auto">
													关注
												</Button>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						</div>
					</ScrollArea>
				</div>

				<div className="w-96 flex-shrink-0">
					<Card className="h-[calc(100vh-12rem)] flex flex-col shadow-lg rounded-2xl overflow-hidden">
						<CardHeader className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-6">
							<CardTitle className="text-2xl font-semibold">
								AI 助手分析
							</CardTitle>
						</CardHeader>
						<CardContent className="flex-grow overflow-y-auto p-6">
							<div className="space-y-6">
								<div className="bg-gray-50 p-4 rounded-xl shadow-sm">
									<h3 className="font-semibold text-lg mb-2">用户简介</h3>
									<p className="text-sm text-gray-800">
										小杰，90后，想做情感自媒体。有心理学背景，希望做正能量、轻松的情感内容。
									</p>
								</div>
								<div className="bg-gray-100 p-4 rounded-xl shadow-sm">
									<h3 className="font-semibold text-lg mb-2">内容方向建议</h3>
									<ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
										<li>结合心理学知识，解读情感问题</li>
										<li>制作《你的执念，可能是心理创伤》等吸引眼球的内容</li>
										<li>
											创作《为什么你总是遇到渣男？心理学告诉你真相》类型的分析文章
										</li>
										<li>推出"恋爱中的5种依恋类型"等专业知识普及内容</li>
									</ul>
								</div>
								<div className="bg-gray-50 p-4 rounded-xl shadow-sm">
									<h3 className="font-semibold text-lg mb-2">内容形式建议</h3>
									<ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
										<li>短视频：讲述情感小故事，用心理学知识做结尾点睛</li>
										<li>图文：制作干货知识图解，易于传播</li>
										<li>直播：与粉丝互动，回答情感问题，展示专业性</li>
									</ul>
								</div>
								<div className="bg-gray-100 p-4 rounded-xl shadow-sm">
									<h3 className="font-semibold text-lg mb-2">差异化策略</h3>
									<p className="text-sm text-gray-800">
										打造"懂情感，懂心理"的知性博主形象，用专业知识解读情感问题，让内容既有温度又有深度。
									</p>
								</div>
							</div>
						</CardContent>
						<div className="p-6 border-t border-gray-200 bg-gray-50">
							<div className="flex items-center space-x-2">
								<Input
									className="flex-grow rounded-full border-2 border-gray-200 focus:border-gray-400 transition-all duration-300"
									placeholder="询问AI助手..."
								/>
								<Button
									size="icon"
									className="rounded-full bg-red-500 hover:bg-red-600 transition-colors duration-300"
								>
									<Send className="h-5 w-5 text-white" />
									<span className="sr-only">发送</span>
								</Button>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
}
