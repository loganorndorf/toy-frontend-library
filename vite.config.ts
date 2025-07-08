/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	test: {
		environment: 'browser',
		browser: {
			enabled: true,
			provider: 'playwright',
			instances: [
				{
					browser: 'chromium'
				}
			]
		},
		include: ['src/**/*.{test,spec}.{js,ts}'],
		setupFiles: ['./vitest-setup-client.ts']
	}
});
