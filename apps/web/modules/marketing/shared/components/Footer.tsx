import { Link } from "@i18n";
import { Logo } from "@shared/components/Logo";

export function Footer() {
	return (
		<footer className="bg-card py-12 text-card-foreground">
			<div className="container grid grid-cols-1 gap-6 lg:grid-cols-3">
				<div>
					<Logo className="opacity-70 grayscale" />
					<p className="mt-3 text-sm opacity-70">
						© {new Date().getFullYear()} 招财进宝 - 小红书公域自媒体IP打造工具.
						版权所有.
					</p>
					<p className="mt-1 text-sm opacity-70">由 9000AI 团队倾情打造</p>
				</div>

				<div className="flex flex-col gap-2">
					<Link href="/blog" className="block">
						博客
					</Link>

					<a href="#features" className="block">
						功能模块
					</a>

					<a href="/pricing" className="block">
						定价
					</a>
				</div>

				<div className="flex flex-col gap-2">
					<Link href="/legal/privacy-policy" className="block">
						隐私政策
					</Link>

					<Link href="/legal/terms" className="block">
						使用条款
					</Link>
				</div>
			</div>
		</footer>
	);
}
