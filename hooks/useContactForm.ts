import { useState } from "react";
import { ContactFormData } from "@/types";
import { ContactApiService } from "@/services/frontend/contactService";

export type FormStatus = "idle" | "loading" | "success" | "error";

export interface UseContactFormOptions {
  defaultSuccessMessage?: string;
  defaultErrorMessage?: string;
}

export function useContactForm(options?: UseContactFormOptions) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const reset = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setStatus("idle");
    setFeedbackMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setFeedbackMessage("");

    try {
      const result = await ContactApiService.submit(formData);
      setStatus("success");
      setFeedbackMessage(
        result.message ||
          options?.defaultSuccessMessage ||
          "Message sent successfully!"
      );
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err: unknown) {
      setStatus("error");
      const message =
        err instanceof Error
          ? err.message
          : options?.defaultErrorMessage || "An unexpected error occurred.";
      setFeedbackMessage(message);
    }
  };

  return {
    formData,
    status,
    feedbackMessage,
    handleChange,
    handleSubmit,
    reset,
  };
}

export default useContactForm;

