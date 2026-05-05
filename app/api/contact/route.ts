import { NextResponse } from 'next/server';

// Contact API - Processes incoming messages
// Appends [YCP] to the subject for easy sorting
export async function POST(request: Request) {
  try {
    const { name, email, message, subjectPrefix, token } = await request.json();
    
    // 1. Verify Turnstile Token
    const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${token}`,
    });

    const verification = await verifyResponse.json();
    if (!verification.success) {
      return NextResponse.json({ success: false, error: "Security verification failed" }, { status: 403 });
    }

    // 2. Construct the subject with the prefix
    const subject = `${subjectPrefix || '[YCP]'} New Message from ${name}`;
    
    console.log("--- New Contact Form Submission ---");
    console.log("Subject:", subject);
    console.log("From:", email);
    console.log("Message:", message);
    
    /* 
    TODO: To enable real email sending:
    1. Install resend: npm install resend
    2. Add RESEND_API_KEY to .env.local
    3. Uncomment the logic below
    
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: 'your-email@example.com', // Set this to your actual email
      subject: subject,
      text: `From: ${name} (${email})\n\nMessage:\n${message}`,
    });
    */

    return NextResponse.json({ success: true, message: "Transmission received" });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
