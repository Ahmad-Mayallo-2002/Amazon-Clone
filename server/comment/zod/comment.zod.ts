import { infer as zInfer, object, string } from "zod";

export const CommentSchema = object({
  content: string(),
});

const UpdateComment = CommentSchema.partial();

export type CreateCommentType = zInfer<typeof CommentSchema>;
export type UpdateCommentType = zInfer<typeof UpdateComment>;
