declare module 'tailwindcss' {
  export type Config = {
    darkMode?: boolean | 'media' | 'class';
    content: string[];
    theme?: {
      extend?: Record<string, any>;
    };
    plugins?: any[];
  };
} 