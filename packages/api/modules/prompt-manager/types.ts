import { PromptSchema as DatabasePromptSchema } from "database";
import { z } from "zod";

// 重新导出 PromptSchema
export const PromptSchema = DatabasePromptSchema;

export const GetPromptsInputSchema = z.object({
	userId: z.string(),
	searchTerm: z.string().optional(),
});

export const GetPromptsOutputSchema = z.object({
	prompts: z.array(PromptSchema),
});

export const CreatePromptInputSchema = z.object({
	userId: z.string(),
	name: z.string(),
	content: z.string(),
	references: z.array(z.string()),
	referenceType: z.enum(["TEXT", "LINKS", "FILES"]).nullable(), // 添加这一行
});

export const UpdatePromptInputSchema = z.object({
	id: z.string(),
	name: z.string(),
	content: z.string(),
	references: z.array(z.string()),
	referenceType: z.enum(["TEXT", "LINKS", "FILES"]).nullable(), // 添加这一行
});

export const DeletePromptInputSchema = z.object({
	id: z.string(),
});

export type GetPromptsInput = z.infer<typeof GetPromptsInputSchema>;
export type GetPromptsOutput = z.infer<typeof GetPromptsOutputSchema>;
export type CreatePromptInput = z.infer<typeof CreatePromptInputSchema>;
export type UpdatePromptInput = z.infer<typeof UpdatePromptInputSchema>;
export type DeletePromptInput = z.infer<typeof DeletePromptInputSchema>;
