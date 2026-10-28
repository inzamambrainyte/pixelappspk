import mongoose, { Schema, Model, models } from "mongoose";
import { ContactFormData } from "@/types";
import { EMAIL_REGEX } from "@/lib/helpers/regex";

export interface ContactDocument extends ContactFormData, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<ContactDocument>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      minlength: [5, "Email must be at least 5 characters"],
      maxlength: [100, "Email cannot exceed 100 characters"],
      match: [EMAIL_REGEX, "Please provide a valid email address"],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      minlength: [3, "Subject must be at least 3 characters"],
      maxlength: [100, "Subject cannot exceed 100 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: [10, "Message must be at least 10 characters"],
      maxlength: [1000, "Message cannot exceed 1000 characters"],
    },
  },
  {
    collection: "contacts",
    timestamps: true,
  }
);

export const Contact: Model<ContactDocument> =
  models.Contact || mongoose.model<ContactDocument>("Contact", ContactSchema);

export default Contact;

