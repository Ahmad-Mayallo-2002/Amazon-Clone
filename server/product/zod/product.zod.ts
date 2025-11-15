import { infer as zInfer, any, number, object, string, uuid } from "zod";

export const ProductSchema = object({
  title: string().max(255),
  image: any(),
  description: string(),
  price: number().default(0),
  stock: number().int().default(1),
  discount: number().default(0),
  categoryId: uuid()
});

const updateProduct = ProductSchema.partial();

export type CreateProduct = zInfer<typeof ProductSchema>;
export type UpdateProduct = zInfer<typeof updateProduct>;
