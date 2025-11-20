/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_WEATHER_API_URL: string;
  readonly PUBLIC_GEOCODING_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
