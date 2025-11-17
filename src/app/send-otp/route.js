import nodemailer from 'nodemailer';

export async function POST(req) {
  const { email, otp } = await req.json();

  if (!email || !otp) {
    return new Response(JSON.stringify({ error: 'Email and OTP required' }), {
      status: 400,
    });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: '"My App" <no-reply@myapp.com>',
      to: email,
      subject: 'Your OTP code',
      text: `Your OTP is: ${otp}`,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
