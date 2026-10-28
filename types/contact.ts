export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactDocument extends ContactFormData {
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  id?: string;
}

