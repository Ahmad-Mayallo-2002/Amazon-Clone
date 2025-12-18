import { infer as zInfer, any, number, object, string, uuid, coerce } from "zod";

export const ProductSchema = object({
  title: string().max(255),
  image: any(),
  description: string(),
  price: coerce.number().gt(0),
  stock: coerce.number().gt(0).int().default(1),
  discount: coerce.number().default(0),
  categoryId: uuid(),
});

const updateProduct = ProductSchema.partial();

export type CreateProduct = zInfer<typeof ProductSchema>;
export type UpdateProduct = zInfer<typeof updateProduct>;
