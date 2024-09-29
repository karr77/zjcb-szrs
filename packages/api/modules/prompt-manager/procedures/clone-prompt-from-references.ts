import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { TRPCError } from "@trpc/server";
import { db } from "database";
import { logger } from "logs";
import { getSignedUrl } from "storage";
import { z } from "zod";
import { protectedProcedure } from "../../../trpc/base";

export const clonePromptFromReferences = protectedProcedure
	.input(
		z.object({
			promptId: z.string(),
			references: z.array(z.string()),
			referenceType: z.enum(["TEXT", "LINKS", "FILES"]).nullable(),
		}),
	)
	.mutation(async function* ({ input, ctx }) {
		const { promptId, references, referenceType } = input;

		try {
			// 1. 获取原始提示词
			const originalPrompt = await db.prompt.findUnique({
				where: { id: promptId },
			});
			if (!originalPrompt) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "原始提示词不存在",
				});
			}

			if (!ctx.abilities.isAdmin && originalPrompt.userId !== ctx.user.id) {
				// 2. 检查权限
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "你没有权限克隆这个提示词",
				});
			}

			// 3. 获取参考文件的内容
			const referencesContent = await Promise.all(
				references.map(async (reference) => {
					try {
						if (referenceType === "LINKS" && reference.startsWith("http")) {
							// 处理链接
							const response = await fetch(reference);
							if (!response.ok) {
								throw new Error(
									`Failed to fetch reference: ${response.statusText}`,
								);
							}
							return await response.text();
						} else if (
							referenceType === "FILES" &&
							reference.startsWith("file:")
						) {
							// 处理文件
							const filePath = reference.slice(5); // 移除 'file:' 前缀
							const signedUrl = await getSignedUrl(filePath, {
								bucket: process.env.NEXT_PUBLIC_WECHATPUB_BUCKET_NAME as string,
								expiresIn: 60,
							});
							const response = await fetch(signedUrl);
							if (!response.ok) {
								throw new Error(
									`Failed to fetch reference: ${response.statusText}`,
								);
							}
							return await response.text();
						} else {
							// 直接使用文本内容
							return reference;
						}
					} catch (error) {
						logger.error(`Error fetching reference ${reference}:`, error);
						return ""; // 返回空字符串，而不是中断整个过程
					}
				}),
			);

			// 4. 使用 AI 生成新的提示词内容
			const model = new ChatOpenAI({
				modelName: "claude-3-5-sonnet-20240620",
				streaming: true,
				openAIApiKey: process.env.OPENAI_API_KEY,
				configuration: {
					baseURL: process.env.OPENAI_BASE_URL,
				},
			});
			const promptTemplate = ChatPromptTemplate.fromMessages([
				[
					"system",
					`你是一位经验丰富的写作专家，擅长模仿和复刻各种独特的写作风格。你的任务是根据给定的参考文章，创造一个能够指导AI模型生成相同风格文章的详细提示词。请严格遵循以下指南：

          1. 语言风格分析：
             - 仔细观察参考文章中的语言特点，包括句式结构、词语选择、修辞手法等。
             - 识别作者常用的表达方式，如口头禅、独特的措辞或句式。
             - 注意作者的语气和态度，是幽默、严肃、讽刺还是温和？

          2. 内容结构模仿：
             - 分析文章的整体结构，包括开头、主体和结尾的组织方式。
             - 观察段落之间的过渡和连接方式。
             - 注意作者如何引入新话题或展开论述。

          3. 写作技巧复制：
             - 模仿作者使用的写作技巧，如比喻、排比、反问等修辞手法。
             - 复制作者的叙事方式，是直接叙述还是借助故事或案例？
             - 注意作者如何使用细节描写来增强文章的生动性。

          4. 口语化和拟人化处理：
             - 模仿作者的口语化表达，包括口头语、俚语或方言特色。
             - 注意作者如何通过拟人化手法使文章更加生动有趣。
             - 避免使用明显的AI或机器生成的语言风格。

          5. 情感和态度复刻：
             - 捕捉作者在文章中表现出的情感色彩和态度。
             - 模仿作者表达观点的方式，是直接还是含蓄？
             - 注意作者如何与读者互动，建立亲和力。

          6. 专业知识融入：
             - 识别作者在文章中展现的专业知识领域。
             - 模仿作者解释复杂概念的方式，使其通俗易懂。
             - 注意作者如何使用专业术语，以及解释这些术语的方式。

          7. 文章节奏把控：
             - 分析作者如何控制文章的节奏，包括长短句的搭配。
             - 注意作者如何使用段落长度来影响阅读体验。
             - 模仿作者创造紧凑或舒缓阅读感的技巧。

          8. 标题和小标题设计：
             - 分析作者的标题设计风格，是否使用吸引眼球的词语或问题形式。
             - 注意小标题的使用方式，是否简洁有力或富有创意。

          9. 结论和呼吁方式：
             - 模仿作者总结文章的方式，是否有力、简洁或发人深省。
             - 注意作者如何在结尾处呼吁读者行动或思考。

          10. 个性化元素添加：
              - 识别并模仿作者独特的个人特色，如特定的引用、典故或文化参考。
              - 注意作者是否有特定的签名式结束语或开场白。

          11. 读者互动技巧：
              - 模仿作者与读者互动的方式，如使用反问、直接提问或邀请读者思考。
              - 注意作者如何预anticipate并回应读者可能的疑问或反对意见。

          12. 多样性和一致性平衡：
              - 在保持风格一致的同时，确保文章内容的多样性和丰富性。
              - 模仿作者如何在不同主题间切换，保持文章的连贯性。

          请基于以上指南，生成一个极致详细的提示词，使AI模型能够精确一比一复刻模仿参考文章的风格，同时适应不同的主题创作。提示词应直接给出，无需额外解释。

          提示词模板示例：
          你是一位[角色描述]，擅长[特定技能]。你的任务是[具体任务描述]。在写作过程中，请注意以下几点：
          1. [风格特点1] 例句：
          2. [风格特点2] 例句：
          3. [风格特点3] 例句：
          ...

          请按照以下结构组织你的文章：
          [文章结构描述]

          在表达时，请使用以下特征：
          - [表达特征1] 例句：
          - [表达特征2] 例句：
          - [表达特征3] 例句：
          ...

          记住，你的写作应该[总体风格描述]。请开始你的创作。`,
				],
				[
					"human",
					`以下是参考文章的内容：

          {referencesContent}

          请根据这些参考文章，创建一个详细的提示词，指导AI模型生成与之风格一致的文章。记住，直接输出提示词内容，不要包含任何解释或其他内容。`,
				],
			]);

			const chain = promptTemplate.pipe(model).pipe(new StringOutputParser());

			const stream = await chain.stream({
				referencesContent: referencesContent.join("\n\n"),
			});

			let fullContent = "";
			for await (const chunk of stream) {
				yield chunk;
				fullContent += chunk;
			}
			logger.info("内容生成完成", fullContent);
		} catch (error) {
			logger.error("Error in clonePromptFromReferences:", error);
			if (error instanceof TRPCError) {
				throw error;
			}
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "克隆提示词时发生错误",
				cause: error,
			});
		}
	});
