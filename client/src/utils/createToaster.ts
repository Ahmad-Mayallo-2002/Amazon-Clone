import { toaster } from "@/components/ui/toaster";

type ToasterType = "info" | "error" | "loading" | "success";

export const createToaster = (
  title: string,
  description: string,
  type: ToasterType
) =>
  toaster.create({
    closable: true,
    duration: 3000,
    title,
    description,
    type,
  });
