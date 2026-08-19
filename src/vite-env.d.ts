/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_CLARITY_ID?: string;
  readonly VITE_OPS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
