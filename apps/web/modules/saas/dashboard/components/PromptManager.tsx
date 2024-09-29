"use client";

import { useUser } from "@saas/auth/hooks/use-user";
import { apiClient } from "@shared/lib/api-client";
import {} from "@ui/components/alert-dialog";
import { Button } from "@ui/components/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@ui/components/dialog";
import { Input } from "@ui/components/input";
import { Label } from "@ui/components/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@ui/components/popover";
import { ScrollArea } from "@ui/components/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/components/tabs";
import { Textarea } from "@ui/components/textarea";
import { useToast } from "@ui/hooks/use-toast";
import type { Prompt, ReferenceTypeType } from "database";
import { PlusCircle, Search, Trash2, Upload } from "lucide-react";
import { FileText, Link, Loader2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactMarkdown from "react-markdown";

// 主题色
const colors = {
	primary: "bg-indigo-600 hover:bg-indigo-700",
	secondary: "bg-pink-600 hover:bg-pink-700",
	accent: "bg-purple-600 hover:bg-purple-700",
};

// 文章卡片组件
interface Article {
	id: string;
	title: string;
	content: string;
}

const ArticleCard = ({
	article,
	onSelect,
	isSelected,
}: {
	article: Article;
	onSelect: (article: Article) => void;
	isSelected: boolean;
}) => (
	<div
		className={`cursor-pointer p-4 rounded-lg transition-all duration-200 ${
			isSelected ? "bg-pink-100 shadow-md" : "hover:bg-gray-100"
		} border border-gray-200 min-w-[250px] max-w-[250px]`}
		onClick={() => onSelect(article)}
		onKeyDown={(e) => e.key === "Enter" && onSelect(article)}
		role="button"
		tabIndex={0}
	>
		<h3 className="font-medium text-gray-800 truncate mb-2">{article.title}</h3>
		<p className="text-xs text-gray-500 line-clamp-2">{article.content}</p>
	</div>
);

// 文章骨架组件
const ArticleSkeleton = () => (
	<div className="border border-gray-200 p-4 rounded-lg animate-pulse min-w-[250px] max-w-[250px]">
		<div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
		<div className="h-3 bg-gray-200 rounded w-full mb-1" />
		<div className="h-3 bg-gray-200 rounded w-2/3" />
	</div>
);

// 更新 FileUpload 组件的类型定义
type FileUploadProps = {
	onFileUpload: (files: File[]) => void;
	maxFiles?: number;
	initialReferences?: string[];
};

// 文件上传组件
const FileUpload: React.FC<FileUploadProps> = ({
	onFileUpload,
	maxFiles = 5,
	initialReferences = [],
}) => {
	const [files, setFiles] = useState<File[]>([]);

	useEffect(() => {
		// 将初始引用转换为 File 对象
		const initialFiles = initialReferences.map((ref) => {
			const fileName = ref.startsWith("file:") ? ref.slice(5) : ref;
			return new File([], fileName, { type: "application/octet-stream" });
		});
		setFiles(initialFiles);
	}, [initialReferences]);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop: (acceptedFiles) => {
			const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles);
			setFiles(newFiles);
			onFileUpload(newFiles);
		},
		accept: {
			"text/plain": [".txt"],
			"application/pdf": [".pdf"],
			"application/msword": [".doc"],
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document":
				[".docx"],
		},
		multiple: true,
		maxFiles: maxFiles - files.length,
	});

	const handleDeleteFile = (index: number) => {
		const newFiles = files.filter((_, i) => i !== index);
		setFiles(newFiles);
		onFileUpload(newFiles);
	};

	return (
		<div>
			<div {...getRootProps()} className="cursor-pointer">
				<input {...getInputProps()} />
				<div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
					<Upload className="w-4 h-4" />
					<span>上传文件 (最多{maxFiles}个)</span>
				</div>
			</div>
			{files.length > 0 && (
				<div className="mt-2 grid grid-cols-1 gap-2">
					{files.map((file, index) => (
						<div
							key={index}
							className="flex items-center justify-between p-2 border rounded-md bg-white shadow-sm"
						>
							<span className="text-sm text-gray-600 truncate max-w-xs">
								{file.name}
							</span>
							<Button
								variant="ghost"
								size="sm"
								onClick={() => handleDeleteFile(index)}
								className="text-gray-500 hover:text-red-500"
							>
								<Trash2 className="w-4 h-4" />
							</Button>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

// 提示词表单组件
const PromptForm = ({
	prompt,
	onSave,
	onCancel,
	onChangeDetected,
}: {
	prompt: Prompt;
	onSave: (prompt: Prompt) => void;
	onCancel: () => void;
	onChangeDetected: () => void;
}) => {
	const [name, setName] = useState(prompt?.name || "");
	const [content, setContent] = useState(prompt?.content || "");
	const [referenceType, setReferenceType] = useState<ReferenceTypeType | null>(
		prompt?.referenceType || null,
	);
	const { toast } = useToast();
	const { user } = useUser();

	const [isClonePopoverOpen, setIsClonePopoverOpen] = useState(false);
	const [cloneInputMode, setCloneInputMode] = useState<
		"text" | "links" | "files"
	>("text");
	const [cloneTextInput, setCloneTextInput] = useState("");
	const [cloneLinksInput, setCloneLinksInput] = useState("");
	const [cloneFilesInput, setCloneFilesInput] = useState<File[]>([]);
	const [isCloning, setIsCloning] = useState(false);

	const [cloneFileReferences, setCloneFileReferences] = useState<string[]>([]);

	const clonePromptMutation =
		apiClient.promptManager.clonePromptFromReferences.useMutation();

	useEffect(() => {
		setName(prompt?.name || "");
		setContent(prompt?.content || "");
		setReferenceType(prompt?.referenceType || null);
		// 初始化克隆输入
		if (prompt?.references && prompt.references.length > 0) {
			setCloneInputMode(
				(prompt.referenceType?.toLowerCase() as "text" | "links" | "files") ||
					"text",
			);
			switch (prompt.referenceType) {
				case "FILES":
					setCloneFileReferences(prompt.references);
					break;
				case "LINKS":
					setCloneLinksInput(prompt.references.join("\n"));
					break;
				case "TEXT":
					setCloneTextInput(prompt.references.join("\n"));
					break;
			}
		}
	}, [prompt]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!name.trim() || !content.trim()) {
			toast({
				title: "错误",
				description: "提示词名称和内容不能为空。",
				variant: "error",
			});
			return;
		}
		onSave({ ...prompt, name, content, referenceType });
	};

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
		onChangeDetected();
	};

	const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setContent(e.target.value);
		onChangeDetected();
	};

	const handleClonePrompt = async () => {
		if (!prompt.id) return;

		setIsCloning(true);
		try {
			let references: string[] = [];
			let newReferenceType: ReferenceTypeType | null = null;

			switch (cloneInputMode) {
				case "text":
					references = cloneTextInput.split("\n").filter((line) => line.trim());
					newReferenceType = "TEXT";
					break;
				case "links":
					references = cloneLinksInput
						.split("\n")
						.filter((line) => line.trim());
					newReferenceType = "LINKS";
					break;
				case "files":
					references = cloneFileReferences;
					newReferenceType = "FILES";
					break;
			}

			const stream = await clonePromptMutation.mutateAsync({
				promptId: prompt.id,
				references,
				referenceType: newReferenceType,
			});

			let clonedContent = "";
			for await (const chunk of stream) {
				clonedContent += chunk;
			}

			setContent(clonedContent);
			setReferenceType(newReferenceType);
			onChangeDetected();
			toast({
				title: "成功",
				description: "提示词已成功克隆并更新。",
				variant: "default",
			});
		} catch (error) {
			console.error("克隆提示词时发生错误:", error);
			toast({
				title: "错误",
				description: "克隆提示词时发生错误，请稍后再试。",
				variant: "error",
			});
		} finally {
			setIsCloning(false);
			setIsClonePopoverOpen(false);
		}
	};

	const handleFileUpload = async (files: File[]): Promise<string[]> => {
		// 实现文件上传逻辑，返回上传后的文件路径数组
		// 这里需要根据你的实际上传逻辑进行实现
		// 返回示例：
		return files.map((file) => `file:${file.name}`);
	};

	// 新增的克隆 Popover 组件
	const ClonePopover = () => (
		<Popover open={isClonePopoverOpen} onOpenChange={setIsClonePopoverOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" onClick={() => setIsClonePopoverOpen(true)}>
					克隆提示词
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80 max-h-96 overflow-y-auto p-8">
				<div className="grid gap-4">
					<div className="space-y-2">
						<h4 className="font-medium leading-none">克隆提示词</h4>
						<p className="text-sm text-muted-foreground">
							请选择输入模式并提供参考内容来克隆提示词。克隆操作将覆盖当前提示词内容。
						</p>
					</div>
					<Tabs
						value={cloneInputMode}
						onValueChange={(value) =>
							setCloneInputMode(value as "text" | "links" | "files")
						}
					>
						<TabsList className="grid w-full grid-cols-3">
							<TabsTrigger value="text">
								<FileText className="h-4 w-4 mr-2" />
								文本
							</TabsTrigger>
							<TabsTrigger value="links">
								<Link className="h-4 w-4 mr-2" />
								链接
							</TabsTrigger>
							<TabsTrigger value="files">
								<Upload className="h-4 w-4 mr-2" />
								文件
							</TabsTrigger>
						</TabsList>
						<TabsContent value="text">
							<Textarea
								placeholder="请输入参考文本"
								value={cloneTextInput}
								onChange={(e) => setCloneTextInput(e.target.value)}
								className="min-h-[200px]"
							/>
						</TabsContent>
						<TabsContent value="links">
							<Textarea
								placeholder="请输入链接，每行一个，最多5个"
								value={cloneLinksInput}
								onChange={(e) => setCloneLinksInput(e.target.value)}
								className="min-h-[200px]"
							/>
						</TabsContent>
						<TabsContent value="files">
							<FileUpload
								onFileUpload={(files) => setCloneFilesInput(files)}
								maxFiles={5}
								initialReferences={cloneFileReferences}
							/>
						</TabsContent>
					</Tabs>
					<div className="flex justify-end space-x-2">
						<Button
							variant="outline"
							onClick={() => setIsClonePopoverOpen(false)}
						>
							取消
						</Button>
						<Button onClick={handleClonePrompt} disabled={isCloning}>
							{isCloning ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									克隆中...
								</>
							) : (
								"确认克隆"
							)}
						</Button>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<Label htmlFor="promptName">提示词名称</Label>
				<Input
					id="promptName"
					value={name}
					onChange={handleNameChange}
					placeholder="输入提示词名称"
				/>
			</div>
			<div>
				<Label htmlFor="promptContent">提示词内容</Label>
				<Textarea
					id="promptContent"
					value={content}
					onChange={handleContentChange}
					placeholder="输入提示词内容"
					rows={5}
				/>
			</div>
			<div className="flex justify-between items-center mt-4">
				<ClonePopover />
				<div className="flex space-x-2">
					<Button type="button" variant="outline" onClick={onCancel}>
						取消
					</Button>
					<Button type="submit" className={colors.primary}>
						保存
					</Button>
				</div>
			</div>
		</form>
	);
};

// 搜索栏组件
const SearchBar = ({ onSearch }: { onSearch: (term: string) => void }) => (
	<div className="relative">
		<Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
		<Input
			className="pl-8 pr-4 py-1 w-full text-sm"
			placeholder="搜索提示词..."
			onChange={(e) => onSearch(e.target.value)}
		/>
	</div>
);

// 生成进度提示组件
const GenerationProgress = ({
	isGenerating,
	generatedCount,
	totalCount,
}: {
	isGenerating: boolean;
	generatedCount: number;
	totalCount: number;
}) => {
	if (!isGenerating) return null;

	return (
		<div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-md z-50">
			<p className="text-sm font-medium text-gray-700">
				正在生成文章: {generatedCount} / {totalCount}
			</p>
			<div className="mt-2 h-2 w-full bg-gray-200 rounded-full">
				<div
					className="h-full bg-indigo-600 rounded-full transition-all duration-300 ease-in-out"
					style={{ width: `${(generatedCount / totalCount) * 100}%` }}
				/>
			</div>
		</div>
	);
};

// 提示词项组件
const PromptItem = ({
	prompt,
	onSelect,
	onDelete,
	isSelected,
	isTemporary,
}: {
	prompt: Prompt;
	onSelect: (prompt: Prompt) => void;
	onDelete: (id: string) => void;
	isSelected: boolean;
	isTemporary: boolean;
}) => {
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	return (
		<li
			className={`flex justify-between items-center cursor-pointer p-2 rounded-lg transition-all duration-200 ${
				isSelected ? "bg-indigo-100 shadow-md" : "hover:bg-gray-100"
			} ${isTemporary ? "bg-yellow-50" : ""}`}
			onClick={() => onSelect(prompt)}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					onSelect(prompt);
				}
			}}
			// biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <explanation>
			role="button"
			tabIndex={0}
		>
			<span className="font-medium text-gray-800 truncate">{prompt.name}</span>
			<Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<DialogTrigger asChild>
					<Button
						variant="ghost"
						size="sm"
						onClick={(e) => {
							e.stopPropagation();
							setIsDeleteDialogOpen(true);
						}}
						className="text-gray-500 hover:text-red-500"
					>
						<Trash2 className="w-4 h-4" />
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>确认删除</DialogTitle>
						<DialogDescription>
							您确定要删除提示词 "{prompt.name}" 吗？此操作无法撤销。
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setIsDeleteDialogOpen(false)}
						>
							取消
						</Button>
						<Button
							variant="error"
							onClick={() => {
								onDelete(prompt.id);
								setIsDeleteDialogOpen(false);
							}}
						>
							删除
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</li>
	);
};

export function PromptManager() {
	const { user } = useUser();
	const [searchTerm, setSearchTerm] = useState("");
	const [articles, setArticles] = useState<Article[]>([]);
	const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
	const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
	const [articleCount, setArticleCount] = useState(1);
	const [isGenerating, setIsGenerating] = useState(false);
	const [generatedCount, setGeneratedCount] = useState(0);
	const { toast } = useToast();
	const articleListRef = useRef<HTMLDivElement>(null);
	const [temporaryPrompt, setTemporaryPrompt] = useState<Prompt | null>(null);
	const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
	const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
	const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
	const [topicInfo, setTopicInfo] = useState("");

	const generateArticlesMutation =
		apiClient.promptManager.generateArticles.useMutation();

	const getSignedUploadUrlMutation =
		apiClient.uploads.signedUploadUrl.useMutation();

	// 获取提示词列表
	const { data: promptsData, refetch: refetchPrompts } =
		apiClient.promptManager.getPrompts.useQuery(
			{
				userId: user?.id || "",
				searchTerm: searchTerm || undefined,
			},
			{
				enabled: !!user?.id,
				refetchOnWindowFocus: false,
			},
		);

	// 创建提示词
	const createPromptMutation =
		apiClient.promptManager.createPrompt.useMutation();

	// 更新提示词
	const updatePromptMutation =
		apiClient.promptManager.updatePrompt.useMutation();

	// 删除提示词
	const deletePromptMutation =
		apiClient.promptManager.deletePrompt.useMutation();

	const handlePromptSave = useCallback(
		async (updatedPrompt: Prompt) => {
			try {
				let savedPrompt: Prompt;
				if (updatedPrompt.id.startsWith("temp-")) {
					savedPrompt = await createPromptMutation.mutateAsync({
						userId: user?.id || "",
						name: updatedPrompt.name,
						content: updatedPrompt.content,
						references: updatedPrompt.references,
						referenceType: updatedPrompt.referenceType,
					});
					setTemporaryPrompt(null);
				} else {
					savedPrompt = await updatePromptMutation.mutateAsync(updatedPrompt);
				}
				setSelectedPrompt(savedPrompt); // 立即更新选中的提示词
				refetchPrompts();
				toast({
					title: "成功",
					description: `提示词${updatedPrompt.id.startsWith("temp-") ? "创建" : "更新"}成功。`,
					variant: "default",
				});
				setHasUnsavedChanges(false);
			} catch (error) {
				console.error("保存提示词时发生错误:", error);
				toast({
					title: "错误",
					description: "保存提示词时发生错误，请稍后再试。",
					variant: "error",
				});
			}
		},
		[user?.id, updatePromptMutation, createPromptMutation, refetchPrompts],
	);

	const handlePromptDelete = useCallback(
		async (id: string) => {
			try {
				await deletePromptMutation.mutateAsync({ id });
				refetchPrompts();
				toast({
					title: "成功",
					description: "提示词删除成功。",
					variant: "default",
				});
			} catch (error) {
				console.error("删除提示词时发生错误:", error);
				toast({
					title: "错误",
					description: "删除提示词时发生错误，请稍后再试。",
					variant: "error",
				});
			}
		},
		[deletePromptMutation, refetchPrompts],
	);

	const filteredPrompts = promptsData?.prompts || [];

	const handlePromptSelect = useCallback(
		(prompt: Prompt) => {
			const switchPrompt = () => {
				setSelectedPrompt(prompt);
				setArticles([]);
				setSelectedArticle(null);
				setHasUnsavedChanges(false);
			};

			if (hasUnsavedChanges) {
				setIsConfirmDialogOpen(true);
				setPendingAction(() => switchPrompt);
			} else {
				switchPrompt();
			}
		},
		[hasUnsavedChanges],
	);

	const handleSearch = useCallback((term: string) => {
		setSearchTerm(term);
	}, []);

	const generateArticles = useCallback(async () => {
		if (!selectedPrompt) {
			toast({
				title: "错误",
				description: "请先选择一个提词。",
				variant: "error",
			});
			return;
		}

		// 先保存当前提示词
		await handlePromptSave(selectedPrompt);

		setIsGenerating(true);
		setGeneratedCount(0);
		const newArticles: Article[] = Array.from(
			{ length: articleCount },
			(_, i) => ({
				id: (Date.now() + i).toString(),
				title: `基于 "${selectedPrompt.name}" 的文章 ${i + 1}`,
				content: "",
			}),
		);
		setArticles(newArticles);

		try {
			for (let i = 0; i < articleCount; i++) {
				const stream = await generateArticlesMutation.mutateAsync({
					promptContent: selectedPrompt.content,
					topicInfo: topicInfo,
					referenceType: selectedPrompt.referenceType,
					references: selectedPrompt.references,
				});

				if (stream && typeof stream[Symbol.asyncIterator] === "function") {
					let articleContent = "";

					// 如果是第一篇文章，立即设置为选中状态
					if (i === 0) {
						setSelectedArticle(newArticles[0]);
					}

					for await (const chunk of stream) {
						articleContent += chunk;
						// 实时更新文章内容
						setArticles((prev) => {
							const updated = [...prev];
							updated[i] = {
								...updated[i],
								content: articleContent,
							};
							// 如果是第一篇文章，同时更新选中的文章
							if (i === 0) {
								setSelectedArticle(updated[i]);
							}
							return updated;
						});
					}

					// 更新文章标题
					setArticles((prev) => {
						const updated = [...prev];
						updated[i] = {
							...updated[i],
							title: `${selectedPrompt.name} - 文章 ${i + 1}`,
							content: articleContent, // 确保完整的内容被保存
						};
						return updated;
					});
				} else {
					throw new Error("无效的响应格式");
				}

				setGeneratedCount(i + 1);
			}

			toast({
				title: "成功",
				description: `已生成 ${articleCount} 篇新文章。`,
				variant: "default",
			});
		} catch (error) {
			console.error("生成文章时发生错误:", error);
			toast({
				title: "错误",
				description: "生成文章时发生错误，请稍后再试。",
				variant: "error",
			});
		} finally {
			setIsGenerating(false);
		}
	}, [
		selectedPrompt,
		articleCount,
		generateArticlesMutation,
		toast,
		topicInfo,
		handlePromptSave,
	]);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === "ArrowLeft") {
				setSelectedArticle((prev) => {
					if (!prev) return prev;
					const currentIndex = articles.findIndex((a) => a.id === prev.id);
					return currentIndex > 0 ? articles[currentIndex - 1] : prev;
				});
			} else if (e.key === "ArrowRight") {
				setSelectedArticle((prev) => {
					if (!prev) return prev;
					const currentIndex = articles.findIndex((a) => a.id === prev.id);
					return currentIndex < articles.length - 1 &&
						articles[currentIndex + 1].content
						? articles[currentIndex + 1]
						: prev;
				});
			}
		},
		[articles],
	);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyDown]);

	const currentArticleIndex = selectedArticle
		? articles.findIndex((a) => a.id === selectedArticle.id) + 1
		: 0;

	const handleNewPrompt = () => {
		const newPrompt: Prompt = {
			id: `temp-${Date.now()}`, // 使用临时 ID
			name: "未命名提示词",
			content: "",
			references: [],
			referenceType: null,
			userId: user?.id || "",
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		setTemporaryPrompt(newPrompt);
		setSelectedPrompt(newPrompt);
	};

	const handleCancelPrompt = () => {
		const cancelPrompt = () => {
			if (selectedPrompt?.id.startsWith("temp-")) {
				setTemporaryPrompt(null);
			}
			setSelectedPrompt(null);
			setHasUnsavedChanges(false);
		};

		if (hasUnsavedChanges) {
			setIsConfirmDialogOpen(true);
			setPendingAction(() => cancelPrompt);
		} else {
			cancelPrompt();
		}
	};

	const handleConfirmAction = () => {
		setIsConfirmDialogOpen(false);
		if (pendingAction) {
			pendingAction();
			setPendingAction(null);
		}
	};

	const handleCancelAction = () => {
		setIsConfirmDialogOpen(false);
		setPendingAction(null);
	};

	return (
		<div className="flex overflow-hidden">
			<GenerationProgress
				isGenerating={isGenerating}
				generatedCount={generatedCount}
				totalCount={articleCount}
			/>
			{/* 提示词列表 */}
			<div className="w-1/5 p-4 border-r border-gray-200 overflow-auto">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold text-gray-800">提示词列表</h2>
					<Button
						className={`${colors.primary} text-white text-sm px-2 py-1`}
						onClick={handleNewPrompt}
					>
						<PlusCircle className="w-4 h-4 mr-1" />
						新建
					</Button>
				</div>
				<SearchBar onSearch={handleSearch} />
				<ScrollArea className=" mt-3">
					<ul className="space-y-1">
						{temporaryPrompt && (
							<PromptItem
								key={temporaryPrompt.id}
								prompt={temporaryPrompt}
								onSelect={handlePromptSelect}
								onDelete={() => setTemporaryPrompt(null)}
								isSelected={selectedPrompt?.id === temporaryPrompt.id}
								isTemporary={true}
							/>
						)}
						{filteredPrompts.map((prompt: Prompt) => (
							<PromptItem
								key={prompt.id}
								prompt={prompt}
								onSelect={handlePromptSelect}
								onDelete={handlePromptDelete}
								isSelected={selectedPrompt?.id === prompt.id}
								isTemporary={false}
							/>
						))}
					</ul>
				</ScrollArea>
			</div>

			{/* 提示词编辑栏 */}
			<div className="w-1/4 p-4 border-r border-gray-200 overflow-auto">
				<h2 className="text-xl font-bold text-gray-800 mb-4">提示词详情</h2>
				{selectedPrompt ? (
					<>
						<PromptForm
							prompt={selectedPrompt}
							onSave={handlePromptSave}
							onCancel={handleCancelPrompt}
							onChangeDetected={() => setHasUnsavedChanges(true)}
						/>
						<div className="mt-4">
							<Label htmlFor="topicInfo">输入信息</Label>
							<Input
								id="topicInfo"
								value={topicInfo}
								onChange={(e) => setTopicInfo(e.target.value)}
								placeholder="输入主题、关键词等信息"
								className="mt-1"
							/>
							<p className="text-sm text-gray-500 mt-1">
								提示：可以输入主题、关键词等，用于控制生成的文章内容
							</p>

							<Label htmlFor="articleCount" className="mt-4 block">
								生成文章数量（最多10篇）
							</Label>
							<Input
								id="articleCount"
								type="number"
								min="1"
								max="10"
								value={articleCount}
								onChange={(e) =>
									setArticleCount(
										Math.min(
											10,
											Math.max(1, Number.parseInt(e.target.value) || 1),
										),
									)
								}
								className="w-full mt-1"
							/>
							<Button
								onClick={generateArticles}
								className={`${colors.accent} w-full mt-2`}
								disabled={isGenerating || !selectedPrompt}
							>
								{isGenerating ? "生成中..." : "使用此提示词生成文章"}
							</Button>
						</div>
					</>
				) : (
					<p className="text-gray-500">选择一个提示词来查看或编辑其详情。</p>
				)}
			</div>

			{/* 文章预览和生成的文章 */}
			<div className="flex-1 flex flex-col overflow-hidden">
				<div className="flex-1 overflow-hidden flex flex-col max-h-[calc(100vh-400px)]">
					<h2 className="text-2xl font-bold text-gray-800 p-4">文章预览</h2>
					<div className="flex-1 overflow-auto px-4 pb-4">
						{selectedArticle ? (
							<div className="bg-gray-50 p-4 rounded-lg mb-4">
								<h3 className="text-xl font-semibold mb-2">
									{selectedArticle.title}
								</h3>
								<div className="prose max-w-none text-sm">
									<ReactMarkdown>{selectedArticle.content}</ReactMarkdown>
								</div>
							</div>
						) : (
							<p className="text-gray-500">选择一篇文章来预览其内容。</p>
						)}
					</div>
				</div>

				{/* 生成的文章列表 */}
				{articles.length > 0 && (
					<div className="border-t border-gray-200 p-4 bg-white">
						<h3 className="text-lg font-semibold mb-2">
							生成的文章 ({currentArticleIndex}/{generatedCount})
						</h3>
						<div className="flex overflow-x-auto space-x-4 py-2">
							{articles.map((article) =>
								article.content ? (
									<ArticleCard
										key={article.id}
										article={article}
										onSelect={setSelectedArticle}
										isSelected={selectedArticle?.id === article.id}
									/>
								) : (
									<ArticleSkeleton key={article.id} />
								),
							)}
						</div>
					</div>
				)}
			</div>

			{/* 确认对话框 */}
			<Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>未保存的更改</DialogTitle>
						<DialogDescription>
							你有未保存的更改。是否确要离开？未保存的更改将会丢失。
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button variant="outline" onClick={handleCancelAction}>
							取消
						</Button>
						<Button variant="error" onClick={handleConfirmAction}>
							确定离开
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
