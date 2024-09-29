"use client";

import { useUser } from "@saas/auth/hooks/use-user";
import { UserAvatar } from "@shared/components/UserAvatar";
import { apiClient } from "@shared/lib/api-client";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuid } from "uuid";
import { CropImageDialog } from "./CropImageDialog";

// 添加这一行来导入环境变量
const avatarFolder = process.env.NEXT_PUBLIC_AVATAR_FOLDER || "avatars";

export function UserAvatarUpload({
	onSuccess,
	onError,
}: {
	onSuccess: () => void;
	onError: () => void;
}) {
	// 获取当前用户信息和更新用户信息的方法
	const { user, updateUser } = useUser();
	// 用来控制上传状态、裁剪对话框和选中的图片
	const [uploading, setUploading] = useState(false);
	const [cropDialogOpen, setCropDialogOpen] = useState(false);
	const [image, setImage] = useState<File | null>(null);

	// 获取上传URL的mutation和更新用户信息的mutation
	const getSignedUploadUrlMutation =
		apiClient.uploads.signedUploadUrl.useMutation();
	const updateUserMutation = apiClient.auth.update.useMutation();

	// 使用react-dropzone来处理文件拖放
	const { getRootProps, getInputProps } = useDropzone({
		onDrop: (acceptedFiles) => {
			// 当文件被放下时,设置图片并打开裁剪对话框
			setImage(acceptedFiles[0]);
			setCropDialogOpen(true);
		},
		// 只接受png和jpeg格式的图片
		accept: {
			"image/png": [".png"],
			"image/jpeg": [".jpg", ".jpeg"],
		},
		multiple: false, // 只允许单个文件
	});

	if (!user) {
		return null;
	}

	// 处理裁剪后的图片上传
	const onCrop = async (croppedImageData: Blob | null) => {
		if (!croppedImageData) {
			return;
		}

		setUploading(true);
		try {
			// 修改这一行,使用环境变量
			const path = `${avatarFolder}/${user.id}-${uuid()}.png`;
			// 获取签名后的上传URL
			const uploadUrl = await getSignedUploadUrlMutation.mutateAsync({
				path,
				bucket: process.env.NEXT_PUBLIC_WECHATPUB_BUCKET_NAME as string,
			});

			// 直接上传裁剪后的图片到存储桶
			const response = await fetch(uploadUrl, {
				method: "PUT",
				body: croppedImageData,
				headers: {
					"Content-Type": "image/png",
				},
			});

			if (!response.ok) {
				throw new Error("Failed to upload image");
			}

			// 更新用户信息,设置新的头像URL
			const updatedUser = await updateUserMutation.mutateAsync({
				avatarUrl: path,
			});

			// 更新本地用户状态
			updateUser({
				avatarUrl: updatedUser.avatarUrl,
			});

			onSuccess();
		} catch (e) {
			onError();
		} finally {
			setUploading(false);
		}
	};

	// 渲染上传区域和裁剪对话框
	return (
		<>
			<div className="relative rounded-full" {...getRootProps()}>
				<input {...getInputProps()} />
				<UserAvatar
					className="size-24 cursor-pointer text-xl"
					avatarUrl={user.avatarUrl}
					name={user.name ?? ""}
				/>

				{uploading && (
					<div className="absolute inset-0 z-20 flex items-center justify-center bg-card/90">
						<LoaderIcon className="size-6 animate-spin text-primary" />
					</div>
				)}
			</div>

			<CropImageDialog
				image={image}
				open={cropDialogOpen}
				onOpenChange={setCropDialogOpen}
				onCrop={onCrop}
			/>
		</>
	);
}
