declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN_SECRET: string;
      DATABASE_URL: string;
    }
  }
}

export {};
