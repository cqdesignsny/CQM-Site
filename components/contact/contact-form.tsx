"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

/**
 * Contact Form Component
 *
 * Approach: Simple form that can integrate with Tally/Typeform
 * TODO: Replace with actual form integration
 * Options:
 * - Tally: Embed via iframe (easiest, recommended)
 * - Typeform: Embed via iframe
 * - Custom: React Hook Form + API route + email service
 */
export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    track("form_submit", {
      form_type: "contact",
      service: formData.service,
    });
    // TODO: Integrate with Tally/Typeform or API route
    alert("Form submission will be handled by Tally/Typeform integration");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Name *
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          Email *
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-medium">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <div>
        <label htmlFor="service" className="mb-2 block text-sm font-medium">
          Service Interest
        </label>
        <select
          id="service"
          value={formData.service}
          onChange={(e) =>
            setFormData({ ...formData, service: e.target.value })
          }
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">Select a service</option>
          <option value="web">Web Development</option>
          <option value="seo">SEO</option>
          <option value="paid-ads">Paid Ads</option>
          <option value="social-media">Social Media</option>
          <option value="email-marketing">Email Marketing</option>
          <option value="video">Video Production</option>
          <option value="studio">Podcast Studio</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium">
          Message *
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <Button type="submit" className="w-full">
        Send Message
      </Button>

      <p className="text-xs text-muted-foreground">
        * Required fields. By submitting this form, you agree to our privacy
        policy.
      </p>
    </form>
  );
}





