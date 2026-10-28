import { connectToDatabase } from "@/lib/mongodb";
import { Contact, ContactDocument } from "@/models/Contact";
import { ContactFormData } from "@/types";

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

    return contact;
  }
}

