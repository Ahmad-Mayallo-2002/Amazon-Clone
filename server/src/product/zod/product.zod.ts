import z, { any, coerce, infer as _infer, object, string, uuid } from "zod";

export const ProductSchema = object({
  title: string().max(255),
  image: any(),
  description: string(),
  price: string().regex(/\d/),
  stock: coerce.number().gte(1).int(),
  discount: coerce.number(),
  categoryId: uuid(),
});

export const updateProduct = ProductSchema.partial();

export type CreateProduct = _infer<typeof ProductSchema>;
export type UpdateProduct = _infer<typeof updateProduct>;

const x: UpdateProduct = { categoryId: "" };
