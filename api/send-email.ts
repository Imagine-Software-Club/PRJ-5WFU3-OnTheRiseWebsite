import type { NextApiRequest, NextApiResponse } from "next";
import { render } from "@react-email/render";
import ContactUs from "../app/contact-us/page";
import { sendEmail } from "../app/lib/email";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await sendEmail({
    to: "5wfu3.imagine@gmail.com",
    subject: "Welcome to NextAPI",
    html: render(ContactUs()),
  });

  return res.status(200).json({ message: "Email sent successfully" });
}