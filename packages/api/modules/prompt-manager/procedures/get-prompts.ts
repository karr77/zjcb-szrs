import { TRPCError } from "@trpc/server";
import { db } from "database";
import { protectedProcedure } from "../../../trpc/base";
import { GetPromptsInputSchema, GetPromptsOutputSchema } from "../types";

export const getPrompts = protectedProcedure
	.input(GetPromptsInputSchema)
	.output(GetPromptsOutputSchema)
	.query(async ({ input, ctx }) => {
		const { userId, searchTerm } = input;

		if (!ctx.abilities.isAdmin && userId !== ctx.user.id) {
			throw new TRPCError({
				code: "UNAUTHORIZED",
				message: "哎呀，你没有权限查看这个用户的提示词哦！",
			});
		}

		try {
			const prompts = await db.prompt.findMany({
				where: {
					userId,
					...(searchTerm && {
						OR: [
							{ name: { contains: searchTerm, mode: "insensitive" } },
							{ content: { contains: searchTerm, mode: "insensitive" } },
						],
					}),
				},
				orderBy: { updatedAt: "desc" },
			});

			return { prompts };
		} catch (error) {
			console.error("获取提示词时发生错误:", error);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "获取提示词时发生错误，请稍后再试。",
			});
		}
	});
