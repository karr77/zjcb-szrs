import { TRPCError } from "@trpc/server";
import { db } from "database";
import { getSignedUrl } from "storage";
import { protectedProcedure } from "../../../trpc/base";
import { DeletePromptInputSchema } from "../types";

export const deletePrompt = protectedProcedure
	.input(DeletePromptInputSchema)
	.mutation(async ({ input, ctx }) => {
		const { id } = input;

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
				message: "哎呀，你没有权限删除这个提示词哦！",
			});
		}

		try {
			// 删除相关的参考文件
			for (const reference of prompt.references) {
				try {
					// 获取文件的签名 URL
					const signedUrl = await getSignedUrl(reference, {
						bucket: process.env.NEXT_PUBLIC_PROMPTMANAGER_BUCKET_NAME as string,
						expiresIn: 60, // URL 有效期为 60 秒
					});

					// 发送删除请求
					const response = await fetch(signedUrl, {
						method: "DELETE",
					});

					if (!response.ok) {
						console.error(`删除文件 ${reference} 失败: ${response.statusText}`);
					}
				} catch (error) {
					console.error(`删除文件 ${reference} 时发生错误:`, error);
					// 继续删除其他文件，不中断整个过程
				}
			}

			// 删除提示词
			await db.prompt.delete({ where: { id } });
			return { success: true };
		} catch (error) {
			console.error("删除提示词时发生错误:", error);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "删除提示词时发生错误，请稍后再试。",
			});
		}
	});
