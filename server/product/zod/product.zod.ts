import { infer as zInfer ,any, number, object, string } from "zod";

export const ProductSchema = object({
  title: string().max(255),
  image: any(),
  description: string(),
  price: number().default(0),
  stock: number().int().default(1),
  discount: number().default(0),
}).refine(
  (data) =>
    typeof data.image.mimetype === "string" &&
    data.image.mimetype.startsWith("image/"),
  {
    message: "File must be an image",
    path: ["image"],
  }
);

const updateProduct = ProductSchema.partial();

export type CreateProduct = zInfer<typeof ProductSchema>;
export type UpdateProduct = zInfer<typeof updateProduct>;