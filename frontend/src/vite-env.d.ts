/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Formspree form ID (public identifier). Defaults to the project's form if unset. */
  readonly VITE_FORMSPREE_FORM_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
