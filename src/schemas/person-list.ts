import { z } from "zod";

export const personFormSchema = z.object({
  id: z.string().optional(),
  user_id: z.string(), // TODO: update when we have auth
  firstname: z
    .string({
      required_error: "Required",
      invalid_type_error: "Invalid first name. Must be a string.",
    })
    .min(1, {
      message: "Required",
    })
    .max(50, { message: "Maximum 50 characters" })
    .regex(/^[\p{L}\p{M}\s]/u, {
      message: "Only alphabeth characters are allowed",
    }),
  lastname: z
    .string({
      required_error: "Required",
      invalid_type_error: "Invalid last name. Must be a string.",
    })
    .min(1, {
      message: "Required",
    })
    .max(50, { message: "Maximum 50 characters" })
    .regex(/^[\p{L}\p{M}\s]+$/u, {
      message: "Only alphabeth characters are allowed",
    }),
  phone: z
    .string({
      required_error: "Required",
      invalid_type_error:
        "Invalid phone number. Must be numbers with/out extension.",
    })
    .regex(/^(\+61|0)[2-478]( ?\d){8}$/, {
      message:
        "Invalid AUS phone number format. Enter 10 numbers, 13 if using +61",
    }).describe('Only Australian phone number.'),
  dob: z.date({
    required_error: "Required",
    invalid_type_error: "Invalid date",
  }),
});