import { TRPCError } from "@trpc/server";
import { db } from "database";
import { protectedProcedure } from "../../../trpc/base";
import { PromptSchema, UpdatePromptInputSchema } from "../types";

export const updatePrompt = protectedProcedure
	.input(UpdatePromptInputSchema)
	.output(PromptSchema)
	.mutation(async ({ input, ctx }) => {
		const { id, name, content, references, referenceType } = input;

		const prompt = await db.prompt.findUnique({ where: { id } });

		if (!prompt) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "提示词不存在",
			});
		}

		if (!ctx.abilities.isAdmin && prompt.userId !== ctx.user.id) {
			throw new TRPCError({
				code: "UNAUTHORIZED",
				message: "哎呀，你没有权限更新这个提示词哦！",
			});
		}

		try {
			const updatedPrompt = await db.prompt.update({
				where: { id },
				data: {
					name,
					content,
					references,
					referenceType,
				},
			});

			return updatedPrompt;
		} catch (error) {
			console.error("更新提示词时发生错误:", error);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "更新提示词时发生错误，请稍后再试。",
			});
		}
	});
