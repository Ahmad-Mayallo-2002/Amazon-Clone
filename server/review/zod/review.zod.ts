import { object, number, infer as zInfer } from "zod";

export const ReviewSchema = object({
  value: number().positive().min(0).max(5),
});

export type AddReview = zInfer<typeof ReviewSchema>;