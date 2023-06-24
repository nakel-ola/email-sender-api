

export type APIKey = {
  id: string;
  key: string;
  plan: string;
  remainingCalls: number;
  totalCalls: number;
}


declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      STMP_PASSWORD: string;
      STMP_EMAIL: string;
      MONGODB_URI: string;
    }
  }
}