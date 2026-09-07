export const prerender = false;
import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { resend } from "$lib/server/resend";
import { CONTACT_EMAIL_TO } from "$env/static/private";

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    const honeypot = formData.get("website")?.toString().trim();

    if (honeypot) return { success: true };
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const message = formData.get("message")?.toString().trim() ?? "";

    if (!name || !email || !message) {
      return fail(400, {
        error: "Fill all required fields!",
        values: { name, email, message },
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return fail(400, {
        error: "Invalid email.",
        values: { name, email, message },
      });
    }

    const { error } = await resend.emails.send({
      from: "Contact <onboarding@resend.dev>",
      to: [CONTACT_EMAIL_TO],
      replyTo: email,
      subject: `New message from ${name}`,
      text: `Name: ${name}}\nE-mail: ${email}\nMessage: ${message}`,
      html: `
        <h2>New message through portfolio forms</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
    });

    if (error) {
      console.log("Resend error: ", error.message);
      return fail(500, {
        error: "Failed to send message. Please try again later.",
        values: { name, email, message },
      });
    }
    return { success: true };
  },
};
