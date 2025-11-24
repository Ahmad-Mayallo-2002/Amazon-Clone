import { infer as zInfer, object, string } from "zod";

export const CategorySchema = object({
  name: string().max(255),
});

const UpdateCategory = CategorySchema.partial();

export type CreateCategoryType = zInfer<typeof CategorySchema>;
export type UpdateCategoryType = zInfer<typeof UpdateCategory>;