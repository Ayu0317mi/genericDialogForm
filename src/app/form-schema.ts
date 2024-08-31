import { z } from "zod";

export const personFormSchema = z.object({
  id: z.number().optional(),
    firstname: z.string().min(2, {
      message: "Firstname must be at least 2 characters.",
    }),
    lastname: z.string().min(2, {
      message: "Lastname must be at least 2 characters.",
    }),
    phone: z.string().min(10, { 
      message: "Phone number must be at least 10 characters."
    }),
    stateName: z.string().min(2, {
      message: "State name must be at least 2 characters."
    }),
    cityName: z.string().min(2, {
      message: "City name must be at least 2 characters."
    }),
    role: z.string().min(2, {
      message: "Role must be at least 2 characters."
    }),
})