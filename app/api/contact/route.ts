import { withErrorHandler } from "@/lib/middleware/errorHandler";
import { ContactController } from "@/controllers/contactController";

export const POST = withErrorHandler(ContactController.handleSubmission);
