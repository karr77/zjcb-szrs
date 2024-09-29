import baseConfig from "tailwind-config";
import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    presets: [baseConfig],
	content: ["./app/**/*.tsx", "./modules/**/*.tsx"],
	safelist: ["ml-2", "ml-4", "ml-6", "ml-8", "ml-10"],
    theme: {
    	extend: {
    		keyframes: {
    			marquee: {
    				from: {
    					transform: 'translateX(0)'
    				},
    				to: {
    					transform: 'translateX(calc(-100% - var(--gap)))'
    				}
    			},
    			'marquee-vertical': {
    				from: {
    					transform: 'translateY(0)'
    				},
    				to: {
    					transform: 'translateY(calc(-100% - var(--gap)))'
    				}
    			}
    		},
    		animation: {
    			marquee: 'marquee var(--duration) infinite linear',
    			'marquee-vertical': 'marquee-vertical var(--duration) linear infinite'
    		}
    	}
    }
} satisfies Config;
