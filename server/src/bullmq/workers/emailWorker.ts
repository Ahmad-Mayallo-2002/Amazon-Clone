import { Worker } from "bullmq";
import { sendVerificationCode } from "../../utils/sendVerificationCode";
import { redis } from "../../utils/redis";

export const emailWorker = new Worker(
  "emailQueue",
  async (job) => {
    const { email, username } = job.data;

    console.log("Sending Verification Code to: ", email);

    const code = await sendVerificationCode(email, username);

    console.log("Verification Code sent: ", code);

    await redis.set(code, email, "EX", 600); // Code expires in 10 minutes

    return { code };
  },
  {
    connection: redis,
    autorun: false,
    concurrency: 5,
  }
);

emailWorker.on("completed", (job) => {
  console.log(`Job with id ${job.id} has been completed`);
});

emailWorker.on("failed", (job, err) => {
  console.log(`Job with id ${job?.id} has failed with error ${err.message}`);
});
