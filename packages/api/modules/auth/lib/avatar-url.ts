import { getSignedUrl } from "storage";

const avatarFolder = process.env.NEXT_PUBLIC_AVATAR_FOLDER || "avatars";

export async function getUserAvatarUrl(pathOrUrl: string | undefined | null) {
	let avatarUrl = pathOrUrl ?? null;
	if (avatarUrl && !avatarUrl.startsWith("http")) {
		// 如果路径不以avatarFolder开头,添加它
		if (!avatarUrl.startsWith(avatarFolder)) {
			avatarUrl = `${avatarFolder}/${avatarUrl}`;
		}
		// 获取签名URL,设置过期时间为360秒
		avatarUrl = await getSignedUrl(avatarUrl, {
			bucket: process.env.NEXT_PUBLIC_WECHATPUB_BUCKET_NAME as string,
			expiresIn: 360,
		});
	}

	return avatarUrl;
}
