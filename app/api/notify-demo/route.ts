// app/api/notify-demo/route.ts

import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  // Skip if Resend is not configured
  if (!process.env.RESEND_API_KEY || !process.env.NOTIFICATION_EMAIL) {
    return NextResponse.json({ success: true }); // Don't fail the request
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { email, name, company } = await request.json();

    const notificationEmail = process.env.NOTIFICATION_EMAIL;

    // Send notification email to yourself
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Ventura Demo <onboarding@resend.dev>",
      to: [notificationEmail],
      subject: "🎯 New Demo Request - Ventura",
      html: `
        <h2>New Demo Request</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Name:</strong> ${name || "Not provided"}</p>
        <p><strong>Company:</strong> ${company || "Not provided"}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <hr>
        <p><a href="https://app.supabase.com">View in Supabase</a></p>
      `,
    });

    // Optionally: Send confirmation email to user (only if configured)
    if (process.env.SEND_CONFIRMATION_EMAIL === "true") {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "Ventura <onboarding@resend.dev>",
        to: [email],
        subject: "Thanks for requesting a Ventura demo!",
        html: `
          <h2>Thanks for your interest!</h2>
          <p>Hi ${name || "there"},</p>
          <p>We received your demo request and will be in touch within 24 hours to schedule your personalized Ventura demo.</p>
          <p>In the meantime, feel free to explore our <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://ventura.com"}/learn">resources</a>.</p>
          <p>Best,<br>The Ventura Team</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending notification:", error);
    // Don't fail - the demo request was already saved to Supabase
    return NextResponse.json({ success: true });
  }
}
