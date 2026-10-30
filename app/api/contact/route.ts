import { withErrorHandler } from "@/lib/middleware/errorHandler";
import { ContactController } from "@/controllers/controllers.contact";

export const POST = withErrorHandler(ContactController.handleSubmission);
