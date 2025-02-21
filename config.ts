export const config = {
	i18n: {
		locales: {
			zh: {
				currency: "CNY",
				label: "中文",
			},
			en: {
				currency: "USD",
				label: "English",
			},
		},
		defaultLocale: "zh",
		defaultCurrency: "CNY",
		cookieName: "NEXT_LOCALE",
	},
	teams: {
		avatarColors: ["#4e6df5", "#e5a158", "#9dbee5", "#ced3d9"],
	},
	auth: {
		redirectAfterLogout: "/",
	},
	mailing: {
		provider: "nodemailer",
		from: "liuhai@9000aigc.com",
	},
} as const satisfies Config;

export type Config = {
	i18n: {
		locales: { [locale: string]: { currency: string; label: string } };
		defaultLocale: string;
		defaultCurrency: string;
		cookieName: string;
	};
	teams: { avatarColors: string[] };
	auth: { redirectAfterLogout: string };
	mailing: {
		provider:
			| "custom"
			| "console"
			| "plunk"
			| "resend"
			| "postmark"
			| "nodemailer";
		from: string;
	};
};

export type Locale = keyof (typeof config)["i18n"]["locales"];
