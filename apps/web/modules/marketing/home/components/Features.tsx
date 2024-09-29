import { Button } from "@ui/components/button";
import {
	ArrowRightIcon,
	BarChartIcon,
	BrainCircuitIcon,
	FileCheckIcon,
	RocketIcon,
	SparklesIcon,
	UsersIcon,
} from "lucide-react";
import Image from "next/image";
import heroDarkImage from "../../../../public/images/hero-dark.svg";
import heroImage from "../../../../public/images/hero.svg";

export function Features() {
	return (
		<section className="py-24 text-card-foreground">
			<div className="container">
				<div className="text-center">
					<h1 className="font-bold text-4xl lg:text-5xl">
						强大功能，助您轻松管理公众号
					</h1>
					<p className="mt-3 text-foreground/60 text-lg">
						我们的平台提供全方位的功能，满足您的所有需求
					</p>
				</div>

				<div className="mt-12 grid grid-cols-1 gap-8">
					{/* 仪表盘 */}
					<div className="grid items-center gap-8 rounded-2xl border bg-card/50 p-8 lg:grid-cols-2 lg:gap-16">
						<div className="overflow-hidden rounded-xl bg-primary/10 p-12">
							<Image
								src={heroImage}
								className="block dark:hidden"
								alt="仪表盘"
							/>
							<Image
								src={heroDarkImage}
								className="hidden dark:block"
								alt="仪表盘"
							/>
						</div>

						<div>
							<h3 className="font-bold text-3xl">仪表盘</h3>
							<p className="mt-2 text-foreground/60 leading-normal">
								提供用户整体运营情况的快速概览，显示关键指标、最近发布的内容表现和待处理任务提醒。
							</p>
							<Button variant="secondary" size="sm" className="mt-4">
								了解更多
								<ArrowRightIcon className="ml-2 size-4" />
							</Button>

							<div className="mt-6 grid grid-cols-2 gap-4">
								<div className="text-card-foreground">
									<BrainCircuitIcon className="size-6 text-3xl text-highlight" />
									<strong className="mt-2 block">关键指标</strong>
									<p className="text-foreground/60">
										显示粉丝总数、内容总浏览量、总互动量、近7天增长趋势等
									</p>
								</div>
								<div className="text-card-foreground">
									<SparklesIcon className="size-6 text-3xl text-highlight" />
									<strong className="mt-2 block">热门内容</strong>
									<p className="text-foreground/60">推荐热门内容和热点话题</p>
								</div>
							</div>
						</div>
					</div>

					{/* 账号规划 */}
					<div className="grid items-center gap-8 rounded-2xl border bg-card/50 p-8 lg:grid-cols-2 lg:gap-16">
						<div className="overflow-hidden rounded-xl bg-primary/10 p-12 lg:order-2">
							<Image
								src={heroImage}
								className="block dark:hidden"
								alt="账号规划"
							/>
							<Image
								src={heroDarkImage}
								className="hidden dark:block"
								alt="账号规划"
							/>
						</div>

						<div className="lg:order-1">
							<h3 className="font-bold text-3xl">账号规划</h3>
							<p className="mt-2 text-foreground/60 leading-normal">
								通过AI对话采集用户信息，为用户生成个性化的小红书IP运营策略。
							</p>
							<Button variant="secondary" size="sm" className="mt-4">
								了解更多
								<ArrowRightIcon className="ml-2 size-4" />
							</Button>

							<div className="mt-6 grid grid-cols-2 gap-4">
								<div className="text-card-foreground">
									<FileCheckIcon className="size-6 text-3xl text-highlight" />
									<strong className="mt-2 block">IP定位分析</strong>
									<p className="text-foreground/60">生成初步IP定位</p>
								</div>
								<div className="text-card-foreground">
									<UsersIcon className="size-6 text-3xl text-highlight" />
									<strong className="mt-2 block">运营策略</strong>
									<p className="text-foreground/60">生成全面的IP运营策略文档</p>
								</div>
							</div>
						</div>
					</div>

					{/* 内容选题 */}
					<div className="grid items-center gap-8 rounded-2xl border bg-card/50 p-8 lg:grid-cols-2 lg:gap-16">
						<div className="overflow-hidden rounded-xl bg-primary/10 p-12">
							<Image
								src={heroImage}
								className="block dark:hidden"
								alt="内容选题"
							/>
							<Image
								src={heroDarkImage}
								className="hidden dark:block"
								alt="内容选题"
							/>
						</div>

						<div>
							<h3 className="font-bold text-3xl">内容选题</h3>
							<p className="mt-2 text-foreground/60 leading-normal">
								帮助用户发现和选择适合的内容主题。
							</p>
							<Button variant="secondary" size="sm" className="mt-4">
								了解更多
								<ArrowRightIcon className="ml-2 size-4" />
							</Button>

							<div className="mt-6 grid grid-cols-2 gap-4">
								<div className="text-card-foreground">
									<SparklesIcon className="size-6 text-3xl text-highlight" />
									<strong className="mt-2 block">热点追踪</strong>
									<p className="text-foreground/60">
										实时抓取和分析小红书平台的热门话题和趋势
									</p>
								</div>
								<div className="text-card-foreground">
									<BarChartIcon className="size-6 text-3xl text-highlight" />
									<strong className="mt-2 block">爆款分析</strong>
									<p className="text-foreground/60">
										分析平台内高性能内容，提取可复制的成功要素
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* 内容创作 */}
					<div className="grid items-center gap-8 rounded-2xl border bg-card/50 p-8 lg:grid-cols-2 lg:gap-16">
						<div className="overflow-hidden rounded-xl bg-primary/10 p-12 lg:order-2">
							<Image
								src={heroImage}
								className="block dark:hidden"
								alt="内容创作"
							/>
							<Image
								src={heroDarkImage}
								className="hidden dark:block"
								alt="内容创作"
							/>
						</div>

						<div className="lg:order-1">
							<h3 className="font-bold text-3xl">内容创作</h3>
							<p className="mt-2 text-foreground/60 leading-normal">
								提供专为小红书平台优化的内容创作工具，包括图文编辑器、视频制作和AI写作助手。
							</p>
							<Button variant="secondary" size="sm" className="mt-4">
								了解更多
								<ArrowRightIcon className="ml-2 size-4" />
							</Button>

							<div className="mt-6 grid grid-cols-2 gap-4">
								<div className="text-card-foreground">
									<RocketIcon className="size-6 text-3xl text-highlight" />
									<strong className="mt-2 block">图文编辑器</strong>
									<p className="text-foreground/60">富文本编辑功能和图片编辑</p>
								</div>
								<div className="text-card-foreground">
									<BarChartIcon className="size-6 text-3xl text-highlight" />
									<strong className="mt-2 block">AI写作助手</strong>
									<p className="text-foreground/60">智能生成内容大纲和文案</p>
								</div>
							</div>
						</div>
					</div>

					{/* 发布管理 */}
					<div className="grid items-center gap-8 rounded-2xl border bg-card/50 p-8 lg:grid-cols-2 lg:gap-16">
						<div className="overflow-hidden rounded-xl bg-primary/10 p-12">
							<Image
								src={heroImage}
								className="block dark:hidden"
								alt="发布管理"
							/>
							<Image
								src={heroDarkImage}
								className="hidden dark:block"
								alt="发布管理"
							/>
						</div>

						<div>
							<h3 className="font-bold text-3xl">发布管理</h3>
							<p className="mt-2 text-foreground/60 leading-normal">
								管理所有待发布和已发布的内容。
							</p>
							<Button variant="secondary" size="sm" className="mt-4">
								了解更多
								<ArrowRightIcon className="ml-2 size-4" />
							</Button>

							<div className="mt-6 grid grid-cols-2 gap-4">
								<div className="text-card-foreground">
									<SparklesIcon className="size-6 text-3xl text-highlight" />
									<strong className="mt-2 block">发布队列</strong>
									<p className="text-foreground/60">
										显示待发布内容列表，定时发布功能，发布状态跟踪
									</p>
								</div>
								<div className="text-card-foreground">
									<BarChartIcon className="size-6 text-3xl text-highlight" />
									<strong className="mt-2 block">矩阵发布</strong>
									<p className="text-foreground/60">
										支持同一内容在多个账号上发布，内容微调功能，发布时间错峰设置
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* 线索管理 */}
					<div className="grid items-center gap-8 rounded-2xl border bg-card/50 p-8 lg:grid-cols-2 lg:gap-16">
						<div className="overflow-hidden rounded-xl bg-primary/10 p-12 lg:order-2">
							<Image
								src={heroImage}
								className="block dark:hidden"
								alt="线索管理"
							/>
							<Image
								src={heroDarkImage}
								className="hidden dark:block"
								alt="线索管理"
							/>
						</div>

						<div className="lg:order-1">
							<h3 className="font-bold text-3xl">线索管理</h3>
							<p className="mt-2 text-foreground/60 leading-normal">
								集中管理和回复所有内容的评论和私信，并深入分析内容表现和账号增长情况。
							</p>
							<Button variant="secondary" size="sm" className="mt-4">
								了解更多
								<ArrowRightIcon className="ml-2 size-4" />
							</Button>

							<div className="mt-6 grid grid-cols-2 gap-4">
								<div className="text-card-foreground">
									<SparklesIcon className="size-6 text-3xl text-highlight" />
									<strong className="mt-2 block">评论管理</strong>
									<p className="text-foreground/60">
										评论汇总和分类，AI辅助快速回复，评论者画像分析，评论情感分析
									</p>
								</div>
								<div className="text-card-foreground">
									<BarChartIcon className="size-6 text-3xl text-highlight" />
									<strong className="mt-2 block">私信管理</strong>
									<p className="text-foreground/60">
										多账号私信汇总，智能分类和优先级排序，快速回复模板，私信用户画像分析
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
