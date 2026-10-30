import { EMAIL, SITE_NAME } from "content/site";

// Server-only, and deliberately not the NEXT_PUBLIC_BREVO_API_KEY the blog
// subscribe widget ships to the browser. This one can send mail, so it stays
// on the server.
const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

// Not 502: Cloudflare sits in front of Vercel and swaps an origin 502 for its
// own HTML error page, so the form never sees the JSON message below.
const SEND_FAILED = 500;

type ContactPayload = {
  name?: string;
  email?: string;
  projectType?: string;
  message?: string;
  // The page the visitor came from, set by the form, not typed by them.
  ref?: string;
  // Honeypot. Real people leave it empty because they never see it.
  company?: string;
};

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Bots fill every field they can see, so a filled honeypot is a bot. Answer
  // 200 so it has nothing to tune against.
  if (payload.company) {
    return Response.json({ ok: true }, { status: 200 });
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const message = payload.message?.trim() ?? "";
  const projectType = payload.projectType?.trim() || "Not specified";
  // Capped because it arrives from the browser like everything else here.
  const ref = payload.ref?.trim().slice(0, 300) || "Unknown";

  if (!name || !email || !message) {
    return Response.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (!isEmail(email)) {
    return Response.json(
      { error: "That email address does not look right." },
      { status: 400 }
    );
  }

  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.error("BREVO_API_KEY is not set, contact form cannot send mail.");
    return Response.json(
      { error: "The form is not available right now. Please email me instead." },
      { status: SEND_FAILED }
    );
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Project type", projectType],
    ["Message", message],
  ];
  // Not a row: one plain line at the foot, "Ref: /blog/some-post".
  const refLine = `Ref: ${ref}`;

  try {
    const response = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        // Must be a sender verified in Brevo, so it cannot be the submitter's
        // address. Their address goes in replyTo instead.
        sender: { name: `${SITE_NAME} website`, email: EMAIL },
        to: [{ email: EMAIL, name: SITE_NAME }],
        replyTo: { email, name },
        subject: `New enquiry: ${projectType} from ${name}`,
        htmlContent: `<html><body>${rows
          .map(
            ([label, value]) =>
              `<p><strong>${label}:</strong><br />${escapeHtml(value).replace(
                /\n/g,
                "<br />"
              )}</p>`
          )
          .join("")}<p>${escapeHtml(refLine)}</p></body></html>`,
        textContent: [
          ...rows.map(([label, value]) => `${label}: ${value}`),
          refLine,
        ].join("\n\n"),
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Brevo rejected the contact email:", response.status, detail);
      return Response.json(
        { error: "Could not send the message. Please email me instead." },
        { status: SEND_FAILED }
      );
    }

    return Response.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form failed:", error);
    return Response.json(
      { error: "Could not send the message. Please email me instead." },
      { status: SEND_FAILED }
    );
  }
}
