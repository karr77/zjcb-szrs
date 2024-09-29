import { ChangelogSection } from "@marketing/changelog/components/ChangelogSection";
import { getTranslations } from "next-intl/server";

export default async function ChangelogPage() {
	const t = await getTranslations();

	return (
		<div className="container max-w-3xl pt-32 pb-16">
			<div className="mb-12 text-balance pt-8 text-center">
				<h1 className="mb-2 font-bold text-5xl">{t("changelog.title")}</h1>
				<p className="text-lg opacity-50">{t("changelog.description")}</p>
			</div>
			<ChangelogSection
				items={[
					{
						date: "2024-03-01",
						changes: ["🚀 性能提升"],
					},
					{
						date: "2024-02-01",
						changes: ["🎨 设计更新", "🐞 修复了一个bug"],
					},
					{
						date: "2024-01-01",
						changes: ["🎉 新增功能", "🐞 修复了一个bug"],
					},
				]}
			/>
		</div>
	);
}
