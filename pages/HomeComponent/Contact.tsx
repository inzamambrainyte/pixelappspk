"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import data from "@/content/data.json";

export const Contact: React.FC = () => {
  const { badge, title, description, form, ctaLink } = data.Contact;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setFeedbackMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        setFeedbackMessage(form?.successMessage || "Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus("error");
        setFeedbackMessage(result.error || form?.errorMessage || "Failed to send message.");
      }
    } catch {
      setStatus("error");
      setFeedbackMessage(form?.errorMessage || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#ecedf1] rounded-[25px] p-8 sm:p-12 md:p-16 shadow-neu-card border border-white/50 flex flex-col items-center"
        >
          <div className="inline-flex items-center px-5 py-2 rounded-full bg-[#ecedf1] shadow-neu-badge text-xs font-semibold uppercase tracking-wider text-[#46bab4] mb-6">
            {badge}
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1c1c1c] mb-6 text-center">
            {title.includes("to hear") ? (
              <>
                {title.split("to hear")[0]} <span className="font-light">to hear{title.split("to hear")[1]}</span>
              </>
            ) : (
              title
            )}
          </h2>

          <p className="text-base sm:text-lg text-[#4d4d4d] leading-relaxed max-w-lg mb-10 text-center">
            {description}
          </p>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl flex flex-col gap-5 text-left"
          >
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="flex-1 flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-[#1c1c1c]"
                >
                  {form?.nameLabel || "Name"}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  minLength={2}
                  maxLength={50}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={form?.namePlaceholder || "Your Full Name"}
                  className="w-full px-4 py-3 rounded-[18px] bg-[#ecedf1] text-[#1c1c1c] placeholder:text-[#8c909e] shadow-neu-badge focus:outline-none focus:ring-2 focus:ring-[#46bab4] transition-all text-sm sm:text-base border border-white/30"
                />
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-[#1c1c1c]"
                >
                  {form?.emailLabel || "Email"}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  minLength={5}
                  maxLength={100}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={form?.emailPlaceholder || "name@example.com"}
                  className="w-full px-4 py-3 rounded-[18px] bg-[#ecedf1] text-[#1c1c1c] placeholder:text-[#8c909e] shadow-neu-badge focus:outline-none focus:ring-2 focus:ring-[#46bab4] transition-all text-sm sm:text-base border border-white/30"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="subject"
                className="text-sm font-medium text-[#1c1c1c]"
              >
                {form?.subjectLabel || "Subject"}
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                minLength={3}
                maxLength={100}
                value={formData.subject}
                onChange={handleChange}
                placeholder={form?.subjectPlaceholder || "Subject of inquiry"}
                className="w-full px-4 py-3 rounded-[18px] bg-[#ecedf1] text-[#1c1c1c] placeholder:text-[#8c909e] shadow-neu-badge focus:outline-none focus:ring-2 focus:ring-[#46bab4] transition-all text-sm sm:text-base border border-white/30"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="text-sm font-medium text-[#1c1c1c]"
              >
                {form?.messageLabel || "Message"}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                minLength={10}
                maxLength={1000}
                value={formData.message}
                onChange={handleChange}
                placeholder={form?.messagePlaceholder || "Tell us how we can help..."}
                className="w-full px-4 py-3 rounded-[18px] bg-[#ecedf1] text-[#1c1c1c] placeholder:text-[#8c909e] shadow-neu-badge focus:outline-none focus:ring-2 focus:ring-[#46bab4] transition-all text-sm sm:text-base border border-white/30 resize-none"
              />
            </div>

            {status === "success" && (
              <div className="p-4 rounded-[18px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 flex items-center gap-3 text-sm">
                <CheckCircle size={20} weight="fill" className="text-emerald-500 shrink-0" />
                <span>{feedbackMessage}</span>
              </div>
            )}

            {status === "error" && (
              <div className="p-4 rounded-[18px] bg-rose-500/10 border border-rose-500/20 text-rose-700 flex items-center gap-3 text-sm">
                <WarningCircle size={20} weight="fill" className="text-rose-500 shrink-0" />
                <span>{feedbackMessage}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-[50px] text-base font-normal text-white bg-[#46bab4] hover:bg-black disabled:opacity-60 transition-all duration-300 shadow-neu-button active:shadow-neu-button-inset cursor-pointer"
              >
                <span>
                  {status === "loading"
                    ? form?.submittingButton || "Sending..."
                    : form?.submitButton || "Send Message"}
                </span>
              </button>

              <a
                href={ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-[#666666] hover:text-[#46bab4] underline transition-colors"
              >
                Prefer direct email? Click here
              </a>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
