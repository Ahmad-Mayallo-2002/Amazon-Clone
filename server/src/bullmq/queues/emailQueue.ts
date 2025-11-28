import { Queue } from "bullmq";
import { redis } from "../../utils/redis";

export const emailQueue = new Queue("emailQueue", {
  connection: redis,
});
