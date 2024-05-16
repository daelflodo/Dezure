declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    DB_HOST: string;
    DB_USER: string;
    DB_PORT: number;
    DB_PASSWORD: string;
    DB_NAME: string;
    HASH_SALT: string;
    JWT_SECRET: string;
    JWT_EXPIRE: string;
  }
}
