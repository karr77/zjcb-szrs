"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { apiClient } from "@shared/lib/api-client";
import { Alert, AlertDescription, AlertTitle } from "@ui/components/alert";
import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";
import { BellIcon, CheckCircleIcon } from "lucide-react";

import { useTranslations } from "next-intl";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
	email: z.string().email(),
});
type FormValues = z.infer<typeof formSchema>;

export function Newsletter() {
	const t = useTranslations();
	const newsletterSignupMutation = apiClient.newsletter.signup.useMutation();

	const {
		handleSubmit,
		register,
		formState: { isSubmitSuccessful },
	} = useForm<FormValues>({
		resolver: zodResolver(formSchema),
	});

	const onSubmit: SubmitHandler<FormValues> = async ({ email }) => {
		try {
			await newsletterSignupMutation.mutateAsync({ email });
		} catch {
			// TODO: handle error
		}
	};

	return (
		<section className="py-24">
			<div className="container">
				<div className="mb-12 text-center">
					<BellIcon className="mx-auto mb-3 size-12 text-primary" />
					<h1 className="font-bold text-3xl lg:text-4xl">订阅我们的更新通知</h1>
					<p className="mt-3 text-lg opacity-70">
						获取最新的功能更新和运营技巧
					</p>
				</div>

				<div className="mx-auto max-w-lg">
					{isSubmitSuccessful ? (
						<Alert variant="success">
							<CheckCircleIcon className="size-6" />
							<AlertTitle>订阅成功！</AlertTitle>
							<AlertDescription>
								感谢您的订阅，我们会定期发送有价值的内容给您。
							</AlertDescription>
						</Alert>
					) : (
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="flex items-start">
								<Input
									type="email"
									required
									placeholder="输入您的邮箱地址"
									{...register("email")}
								/>
								<Button type="submit" className="ml-4">
									订阅
								</Button>
							</div>
						</form>
					)}
				</div>
			</div>
		</section>
	);
}
