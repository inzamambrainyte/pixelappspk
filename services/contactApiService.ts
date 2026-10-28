import { ContactFormData } from "@/types";

export interface ContactApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  id?: string;
}

export class ContactApiService {
  public static async submit(
    data: ContactFormData
  ): Promise<ContactApiResponse> {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || "Failed to submit message");
    }

    return result;
  }
}

export default ContactApiService;

