import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER, // e.g. us1
});

export async function POST(request: Request) {
  const email = request.headers.get("email");

  if (!email) {
    return Response.json({ error: "Email is required" });
  }
  try {
    const res = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID,
      {
        email_address: email,
        status: "subscribed",
      }
    );
    return Response.json(res);
  } catch (error) {
    return Response.json(error);
  }
}
