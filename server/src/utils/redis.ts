import { config } from "dotenv";
import Redis from "ioredis";

config();

export const redis = new Redis({
  port: Number(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST,
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});
