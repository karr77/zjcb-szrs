"use client";

import { apiClient } from "@shared/lib/api-client";
import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";
import { Wand2Icon } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export function ProductNameGenerator() {
	const [topic, setTopic] = useState("");
	const [generatedContent, setGeneratedContent] = useState("");
	const [isGenerating, setIsGenerating] = useState(false);

	const generateContentMutation =
		apiClient.ai.generateProductNames.useMutation();

	const generateContent = async () => {
		setIsGenerating(true);
		setGeneratedContent("");

		try {
			console.log("开始生成内容，主题:", topic);
			const stream = await generateContentMutation.mutateAsync({ topic });

			if (stream && typeof stream[Symbol.asyncIterator] === "function") {
				console.log("收到流式响应");
				for await (const chunk of stream) {
					console.log("接收到内容片段:", chunk);
					setGeneratedContent((prev) => prev + chunk);
				}
			} else {
				console.error("预期接收到 AsyncIterable，但实际收到:", stream);
				throw new Error("无效的响应格式");
			}
		} catch (error) {
			console.error("生成内容时出错:", error);
			setGeneratedContent("生成内容时出错，请稍后再试。");
		} finally {
			setIsGenerating(false);
			console.log("内容生成过程结束");
		}
	};

	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					generateContent();
				}}
			>
				<label htmlFor="topic" className="mb-2 block font-bold">
					文章主题
				</label>
				<Input
					id="topic"
					value={topic}
					onChange={(e) => setTopic(e.target.value)}
					placeholder="输入你想要生成文章的主题"
				/>
				<Button className="mt-4 w-full" disabled={isGenerating}>
					<Wand2Icon className="mr-2 size-4" />
					{isGenerating ? "正在生成..." : "生成公众号文章"}
				</Button>
			</form>

			{generatedContent && (
				<div className="mt-8">
					<h2 className="mb-4 text-xl font-bold">生成的文章:</h2>
					<div className="rounded-md border bg-muted p-4">
						<ReactMarkdown>{generatedContent}</ReactMarkdown>
					</div>
				</div>
			)}
		</div>
	);
}
