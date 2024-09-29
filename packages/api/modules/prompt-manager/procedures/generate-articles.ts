import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { logger } from "logs";
import { z } from "zod";
import { protectedProcedure } from "../../../trpc/base";

export const generateArticles = protectedProcedure
	.input(
		z.object({
			promptContent: z.string(),
			topicInfo: z.string(),
			referenceType: z.enum(["TEXT", "LINKS", "FILES"]).nullable(),
			references: z.array(z.string()),
		}),
	)
	.mutation(async function* ({
		input: { promptContent, topicInfo, referenceType, references },
	}) {
		logger.info("开始生成文章");
		try {
			const model = new ChatOpenAI({
				modelName: "claude-3-5-sonnet-20240620",
				streaming: true,
				openAIApiKey: process.env.OPENAI_API_KEY,
				configuration: {
					baseURL: process.env.OPENAI_BASE_URL,
				},
			});
			logger.info("ChatOpenAI 模型初始化成功");

			let referencesContent = "";
			if (referenceType && references.length > 0) {
				// 根据 referenceType 处理引用内容
				switch (referenceType) {
					case "TEXT":
						referencesContent = references.join("\n");
						break;
					case "LINKS":
						// 这里可能需要获取链接内容
						referencesContent = `链接引用：${references.join(", ")}`;
						break;
					case "FILES":
						// 这里可能需要读取文件内容
						referencesContent = `文件引用：${references.join(", ")}`;
						break;
				}
			}

			const promptTemplate = ChatPromptTemplate.fromMessages([
				["system", "{promptContent}"],
				["human", "主题信息：{topicInfo}\n\n请生成一篇文章。"],
			]);
			logger.info("提示模板创建成功");

			const outputParser = new StringOutputParser();
			const chain = promptTemplate.pipe(model).pipe(outputParser);
			logger.info("LangChain 链创建成功");

			const stream = await chain.stream({
				promptContent,
				topicInfo,
				referencesContent,
			});
			logger.info("开始流式生成内容");

			let fullContent = "";
			for await (const chunk of stream) {
				yield chunk;
				fullContent += chunk;
				logger.debug(`生成内容片段: ${chunk}`);
			}

			logger.info("内容生成完成", { contentLength: fullContent.length });
		} catch (error) {
			logger.error("生成文章时发生错误", error);
			throw error;
		}
	});
