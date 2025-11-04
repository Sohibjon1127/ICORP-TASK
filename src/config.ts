import { config } from 'dotenv';
config();

export const Config = {
  API_URL: `${process.env.API_URL}`,
  PORT: +(process.env.PORT ?? 6000),
  TASK_URL: `${process.env.TASK_URL}`,
};
