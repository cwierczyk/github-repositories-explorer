import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: process.env.VITE_BASE_APP_URL,
    locale: 'en',
    colorScheme: 'light',
  },
  webServer: {
    command: 'pnpm run dev',
    port: 5173,
    reuseExistingServer: !process.env.CI,
  },
});
