import { z } from "zod";

export const personFormSchema = z.object({
    firstname: z.string().min(2, {
      message: "Firstname must be at least 2 characters.",
    }),
    lastname: z.string().min(2, {
      message: "Lastname must be at least 2 characters.",
    })
})