"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { Input, Textarea, Button } from "@/components/ui";
import { useContactForm } from "@/hooks";
import data from "@/content/data.json";

export const Contact: React.FC = () => {
  const { badge, title, description, form, ctaLink } = data.Contact;

  const {
    formData,
    status,
    feedbackMessage,
    handleChange,
    handleSubmit,
  } = useContactForm({
    defaultSuccessMessage: form?.successMessage,
    defaultErrorMessage: form?.errorMessage,
  });

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
              <Input
                label={form?.nameLabel || "Name"}
                name="name"
                type="text"
                required
                minLength={2}
                maxLength={50}
                value={formData.name}
                onChange={handleChange}
                placeholder={form?.namePlaceholder || "Your Full Name"}
              />

              <Input
                label={form?.emailLabel || "Email"}
                name="email"
                type="email"
                required
                minLength={5}
                maxLength={100}
                value={formData.email}
                onChange={handleChange}
                placeholder={form?.emailPlaceholder || "name@example.com"}
              />
            </div>

            <Input
              label={form?.subjectLabel || "Subject"}
              name="subject"
              type="text"
              required
              minLength={3}
              maxLength={100}
              value={formData.subject}
              onChange={handleChange}
              placeholder={form?.subjectPlaceholder || "Subject of inquiry"}
            />

            <Textarea
              label={form?.messageLabel || "Message"}
              name="message"
              rows={4}
              required
              minLength={10}
              maxLength={1000}
              value={formData.message}
              onChange={handleChange}
              placeholder={form?.messagePlaceholder || "Tell us how we can help..."}
            />

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
              <Button
                type="submit"
                isLoading={status === "loading"}
                loadingText={form?.submittingButton || "Sending..."}
                className="w-full sm:w-auto"
              >
                {form?.submitButton || "Send Message"}
              </Button>

              <Link
                href={ctaLink || "/contact"}
                className="text-xs sm:text-sm text-[#666666] hover:text-[#46bab4] underline transition-colors"
              >
                Go to Contact Us Page →
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
