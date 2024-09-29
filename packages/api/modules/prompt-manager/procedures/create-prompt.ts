import { TRPCError } from "@trpc/server";
import { db } from "database";
import { protectedProcedure } from "../../../trpc/base";
import { CreatePromptInputSchema, PromptSchema } from "../types";

export const createPrompt = protectedProcedure
	.input(CreatePromptInputSchema)
	.output(PromptSchema)
	.mutation(async ({ input, ctx }) => {
		const { userId, name, content, references, referenceType } = input;

		if (!ctx.abilities.isAdmin && userId !== ctx.user.id) {
			throw new TRPCError({
				code: "UNAUTHORIZED",
				message: "哎呀，你没有权限创建提示词哦！",
			});
		}

		try {
			const prompt = await db.prompt.create({
				data: {
					userId,
					name,
					content,
					references,
					referenceType,
				},
			});

			return prompt;
		} catch (error) {
			console.error("创建提示词时发生错误:", error);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "创建提示词时发生错误，请稍后再试。",
			});
		}
	});
