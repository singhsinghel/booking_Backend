const { z } = require("zod");

const tourPackageSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be a positive number"),
  image: z.string().url("Image must be a valid URL"),
  availableDates: z.array(
    z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Dates must be in YYYY-MM-DD format")
  ),
});


const bookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?\d{10,15}$/, "Phone number must be valid"),
  numberOfTravelers: z
    .number()
    .positive("Number of travelers must be a positive number"),
  specialRequests: z.string().optional(),
  packageId: z.string().min(1, "Package ID is required"),
});


module.exports = { tourPackageSchema, bookingSchema };
