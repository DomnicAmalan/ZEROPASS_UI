declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      NEXTAUTH_SECRET: string;
      NEXT_PUBLIC_RECAPTCHA_SITE_KEY:string
      GOOGLE_RECAPTCHA_SECRET_KEY:string

      NEXT_PUBLIC_RECAPTCHA_SITE_KEY_INVISIBLE:string
      GOOGLE_RECAPTCHA_SECRET_KEY_INVISIBLE:string
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      PWD: string;
    }
  }
}


export {}