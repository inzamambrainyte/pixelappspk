import { connectToDatabase } from "@/lib/mongodb";
import { Contact, ContactDocument } from "@/models/Contact";
import { ContactFormData } from "@/types";
import { MailService } from "./services.mail";

export class ContactService {
  public static async createContactSubmission(
    data: ContactFormData
  ): Promise<ContactDocument> {
    await connectToDatabase();

    const contact = await Contact.create({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });

    await MailService.sendContactNotification(data);

    return contact;
  }
}

export default ContactService;

