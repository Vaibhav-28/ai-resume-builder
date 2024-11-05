/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STRAPI_API_KEY: string;
  readonly VITE_GEMINI_API_KEY: string;
  // add more environment variables if you have others
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
