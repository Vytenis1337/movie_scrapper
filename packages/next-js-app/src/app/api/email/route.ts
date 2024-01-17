import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export async function POST(request: NextRequest) {
    const { email, name, message } = await request.json();
    const transport = nodemailer.createTransport({
        service: 'gmail',

        auth: {
            user: process.env.NEXT_PUBLIC_MAIL_URL,
            pass: process.env.NEXT_PUBLIC_MAIL_PASS,
        },
    });

    const mailOptions: Mail.Options = {
        from: email,
        to: process.env.NEXT_PUBLIC_MAIL_URL,
        // cc: email, (uncomment this line if you want to send a copy to the sender)
        subject: `Message from ${name} (${email})`,
        text: message,
    };

    const sendMailPromise = () =>
        new Promise<string>((resolve, reject) => {
            transport.sendMail(mailOptions, function (err) {
                if (!err) {
                    resolve('Email sent');
                } else {
                    reject(err.message);
                }
            });
        });

    try {
        await sendMailPromise();
        return NextResponse.json({ message: 'Email sent' });
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}
