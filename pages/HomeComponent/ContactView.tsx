"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  EnvelopeSimple,
  MapPin,
  CheckCircle,
  WarningCircle,
} from "@phosphor-icons/react";
import data from "@/content/data.json";

export const ContactView: React.FC = () => {
  const { badge, title, description, form } = data.Contact;

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
    <main className="w-full flex-grow pt-36 sm:pt-44 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1300px] mx-auto flex flex-col items-center">
        <motion.div
          initial={{
            opacity: 0.001,
            scale: 0.9,
            y: 80,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 1.8,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="w-full max-w-3xl text-center flex flex-col items-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center px-5 py-2 rounded-full bg-[#ecedf1] shadow-neu-badge text-xs font-semibold uppercase tracking-wider text-[#46bab4] mb-4">
            {badge}
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-[56px] font-semibold text-[#1c1c1c] tracking-tight leading-[1.2] mb-4">
            {title.includes("to hear") ? (
              <>
                {title.split("to hear")[0]}{" "}
                <span className="text-[#46bab4]">
                  to hear{title.split("to hear")[1]}
                </span>
              </>
            ) : (
              title
            )}
          </h1>

          <p className="text-base sm:text-lg text-[#4d4d4d] leading-relaxed max-w-xl">
            {description}
          </p>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0.001,
            scale: 0.9,
            y: 80,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 1.8,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-[#ecedf1] rounded-[25px] p-6 sm:p-8 shadow-neu-card border border-white/50 flex items-start gap-5">
              <div className="w-[60px] h-[60px] rounded-full bg-[#ecedf1] shadow-neu-icon flex items-center justify-center text-[#46bab4] shrink-0">
                <EnvelopeSimple size={28} weight="regular" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold text-[#1c1c1c]">Email Support</h3>
                <a
                  href={`mailto:${data.config.contactEmail}`}
                  className="text-base font-medium text-[#46bab4] hover:underline"
                >
                  {data.config.contactEmail}
                </a>
                <p className="text-sm text-[#666666] mt-1">
                  We typically reply within 24 business hours.
                </p>
              </div>
            </div>

            <div className="bg-[#ecedf1] rounded-[25px] p-6 sm:p-8 shadow-neu-card border border-white/50 flex items-start gap-5">
              <div className="w-[60px] h-[60px] rounded-full bg-[#ecedf1] shadow-neu-icon flex items-center justify-center text-[#46bab4] shrink-0">
                <MapPin size={28} weight="regular" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold text-[#1c1c1c]">Company</h3>
                <p className="text-base text-[#1c1c1c] font-medium">
                  {data.config.siteName}
                </p>
                <p className="text-sm text-[#666666]">
                  DriveConnect & AI Chatbot Solutions
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#ecedf1] rounded-[25px] p-8 sm:p-10 shadow-neu-card border border-white/50">
            <h2 className="text-2xl font-semibold text-[#1c1c1c] mb-6">
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="flex-1 flex flex-col gap-2">
                  <label htmlFor="contact-page-name" className="text-sm font-medium text-[#1c1c1c]">
                    {form?.nameLabel || "Name"}
                  </label>
                  <input
                    id="contact-page-name"
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
                  <label htmlFor="contact-page-email" className="text-sm font-medium text-[#1c1c1c]">
                    {form?.emailLabel || "Email"}
                  </label>
                  <input
                    id="contact-page-email"
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
                <label htmlFor="contact-page-subject" className="text-sm font-medium text-[#1c1c1c]">
                  {form?.subjectLabel || "Subject"}
                </label>
                <input
                  id="contact-page-subject"
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
                <label htmlFor="contact-page-message" className="text-sm font-medium text-[#1c1c1c]">
                  {form?.messageLabel || "Message"}
                </label>
                <textarea
                  id="contact-page-message"
                  name="message"
                  rows={5}
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

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-[50px] text-base font-normal text-white bg-[#46bab4] hover:bg-black disabled:opacity-60 transition-all duration-300 shadow-neu-button active:shadow-neu-button-inset cursor-pointer self-start"
              >
                <span>
                  {status === "loading"
                    ? form?.submittingButton || "Sending..."
                    : form?.submitButton || "Send Message"}
                </span>
              </button>
            </form>
          </div>
        </motion.div>
      </main>
    );
  };

export default ContactView;

