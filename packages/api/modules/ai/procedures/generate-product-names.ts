import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { logger } from "logs"; // 确保已导入 logger
import { z } from "zod";
import { protectedProcedure } from "../../../trpc/base";

export const generateProductNames = protectedProcedure
	.input(
		z.object({
			topic: z.string(),
		}),
	)
	.mutation(async function* ({ input: { topic } }) {
		logger.info(`开始生成产品名称，主题: ${topic}`);
		console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY);
		console.log("OPENAI_BASE_URL:", process.env.OPENAI_BASE_URL);
		try {
			const model = new ChatOpenAI({
				modelName: "gpt-4o-mini",
				streaming: true,
				openAIApiKey: process.env.OPENAI_API_KEY,
				configuration: {
					baseURL: process.env.OPENAI_BASE_URL,
				},
			});
			logger.info("ChatOpenAI 模型初始化成功");

			const promptTemplate = ChatPromptTemplate.fromMessages([
				["system", "请为以下主题生成一篇高质量的微信公众号文章:"],
				[
					"human",
					"{topic}\n\n要求:\n1. 文章结构清晰,包含引言、正文(2-3个小节)和总结\n2. 语言风格要通俗易懂,适合大众阅读\n3. 内容要有深度,包含相关数据或案例支撑\n4. 标题要吸引人,能引起读者兴趣\n5. 结尾要有号召性,鼓励读者互动或分享\n6. 字数控制在800-1200字之间\n7. 请使用markdown格式输出",
				],
			]);
			logger.info("提示模板创建成功");

			const outputParser = new StringOutputParser();
			const chain = promptTemplate.pipe(model).pipe(outputParser);
			logger.info("LangChain 链创建成功");

			const stream = await chain.stream({
				topic: topic,
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
			logger.error("生成产品名称时发生错误", error);
			throw error;
		}
	});
