import { NextRequest, NextResponse } from "next/server";
import { isValidEmail, sanitizeText } from "@/lib/helpers/regex";
import { ValidationError } from "@/lib/middleware/errorHandler";
import { ContactService } from "@/services/contactService";

export class ContactController {
  public static async handleSubmission(req: NextRequest): Promise<NextResponse> {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      throw new ValidationError("Invalid JSON request body.");
    }

    if (!body || typeof body !== "object") {
      throw new ValidationError("Request payload must be a valid object.");
    }

    const { name, email, subject, message } = body as Record<string, unknown>;

    const sanitizedName = sanitizeText(typeof name === "string" ? name : "");
    const sanitizedEmail = sanitizeText(typeof email === "string" ? email.toLowerCase() : "");
    const sanitizedSubject = sanitizeText(typeof subject === "string" ? subject : "");
    const sanitizedMessage = sanitizeText(typeof message === "string" ? message : "");

    if (!sanitizedName || sanitizedName.length < 2 || sanitizedName.length > 50) {
      throw new ValidationError("Name must be between 2 and 50 characters.");
    }

    if (!sanitizedEmail || !isValidEmail(sanitizedEmail) || sanitizedEmail.length < 5 || sanitizedEmail.length > 100) {
      throw new ValidationError("Please provide a valid email address between 5 and 100 characters.");
    }

    if (!sanitizedSubject || sanitizedSubject.length < 3 || sanitizedSubject.length > 100) {
      throw new ValidationError("Subject must be between 3 and 100 characters.");
    }

    if (!sanitizedMessage || sanitizedMessage.length < 10 || sanitizedMessage.length > 1000) {
      throw new ValidationError("Message must be between 10 and 1000 characters.");
    }

    const submission = await ContactService.createContactSubmission({
      name: sanitizedName,
      email: sanitizedEmail,
      subject: sanitizedSubject,
      message: sanitizedMessage,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully.",
        id: submission._id,
      },
      { status: 201 }
    );
  }
}

export default ContactController;

