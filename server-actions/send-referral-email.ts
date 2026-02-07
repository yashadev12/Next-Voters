"use server";

import nodemailer from "nodemailer";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendReferralEmail(referrerEmail: string, referredEmail: string) {
  const host = requireEnv("EMAIL_HOST");
  const port = Number(requireEnv("EMAIL_PORT"));
  const user = requireEnv("EMAIL_USER");
  const pass = requireEnv("EMAIL_PASS");

  const subject = `Your friend (${referrerEmail}) wants you to check this out`;

  const signupUrl = "https://nextvoters.com/civic-line";

  const text = [
    "Hi,",
    "",
    `Your friend with the email ${referrerEmail} is referring you to sign up for the Next Voters Line, a free, bias-free way to get emailed weekly summaries of the NYC politics you care about.`,
    "",
    "No pressure, but you can sign up here for a week in 30 seconds to see what the hype is about.",
    "",
    signupUrl,
    "",
  ].join("\n");

  const html = `
    <p>Hi,</p>
    <p>
      Your friend with the email <strong>${escapeHtml(referrerEmail)}</strong> is referring you to sign up for the Next Voters Line, a free, bias-free way to get emailed weekly summaries of the NYC politics you care about.
    </p>
    <p>
      No pressure, but you can sign up <a href="${signupUrl}">here</a> for a week in 30 seconds to see what the hype is about.
    </p>
  `;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: true,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `Next Voters Line <${user}>`,
    to: referredEmail,
    subject,
    text,
    html,
  });
}

