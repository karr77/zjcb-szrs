import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@ui/components/accordion";
import { cn } from "@ui/lib";
import { useTranslations } from "next-intl";

export function FaqSection({ className }: { className?: string }) {
	const t = useTranslations();

	const items = [
		{
			question: "这个平台适合哪些人使用？",
			answer:
				"我们的平台适合各类小红书内容创作者和团队，包括个人创作者、企业品牌、媒体机构等。无论您是刚起步的新手还是经验丰富的运营团队，都能从我们的智能化工具中受益。",
		},
		{
			question: "如何开始使用 AI 生成文章？",
			answer:
				"注册并登录后，您可以在仪表板中找到`AI 写作助手`功能。只需输入主题关键词、选择文章类型和风格，AI 就会为您生成高质量的初稿。您可以进一步编辑和优化内容。",
		},
		{
			question: "平台支持多个小红书账号管理吗？",
			answer:
				"是的，我们支持多账号管理。您可以在一个平台上管理多个小红书账号，实现集中化运营和内容管理。",
		},
		{
			question: "如何确保 AI 生成的内容质量？",
			answer:
				"我们的 AI 模型经过专业训练，能生成高质量的初稿。此外，平台还提供人工审核和编辑功能，确保最终发布的内容符合您的质量标准。",
		},
	];

	if (!items) {
		return null;
	}

	return (
		<section className={cn("bg-primary/5 py-16 lg:py-24", className)} id="faq">
			<div className="container max-w-3xl">
				<div className="mb-12 text-center">
					<h1 className="mb-2 font-bold text-5xl">{t("faq.title")}</h1>
					<p className="text-lg opacity-50">{t("faq.description")}</p>
				</div>
				<Accordion type="single" collapsible className="flex flex-col gap-3">
					{items.map((item, i) => (
						<AccordionItem
							key={i}
							value={`faq-item-${i}`}
							className="rounded-xl border bg-card px-6 py-4"
						>
							<AccordionTrigger className="py-2 text-lg">
								{item.question}
							</AccordionTrigger>
							<AccordionContent className="">{item.answer}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}
