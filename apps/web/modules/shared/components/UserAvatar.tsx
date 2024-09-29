import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/avatar";
import { forwardRef, useMemo } from "react";

export const UserAvatar = forwardRef<
	HTMLSpanElement,
	{
		name: string;
		avatarUrl?: string | null;
		className?: string;
	}
>(({ name, avatarUrl, className }, ref) => {
	// 生成用户名首字母作为备用显示
	const initials = useMemo(
		() =>
			name
				.split(" ")
				.slice(0, 2)
				.map((n) => n[0])
				.join(""),
		[name],
	);

	// 使用提供的avatarUrl或undefined
	const avatarSrc = useMemo(() => avatarUrl ?? undefined, [avatarUrl]);

	return (
		<Avatar ref={ref} className={className}>
			<AvatarImage src={avatarSrc} />
			<AvatarFallback className="bg-primary/10 text-primary">
				{initials}
			</AvatarFallback>
		</Avatar>
	);
});

UserAvatar.displayName = "UserAvatar";
