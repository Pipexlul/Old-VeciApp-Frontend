/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BING_PROD_KEY: string;
  readonly BING_DEV_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
