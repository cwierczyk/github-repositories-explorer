/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GITHUB_API_URL: string;
  readonly VITE_GITHUB_AUTH_TOKEN: string;
  readonly VITE_BASE_APP_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
