import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function sendMessageNotification({
  to,
  senderName,
  message,
  sessionTitle,
  sessionUrl,
}: {
  to: string[];
  senderName: string;
  message: string;
  sessionTitle: string;
  sessionUrl: string;
}) {
  await getResend().emails.send({
    from: "BerrylBaby <noreply@berrylbaby.nl>",
    to,
    subject: `Nieuw bericht bij ${sessionTitle}`,
    html: `
      <div style="font-family: sans-serif; color: #666; max-width: 600px;">
        <h2 style="color: #9b6745;">${sessionTitle}</h2>
        <p><strong>${senderName}</strong> schreef:</p>
        <blockquote style="border-left: 3px solid #9b6745; padding-left: 12px; color: #444;">${message}</blockquote>
        <a href="${sessionUrl}" style="display:inline-block;margin-top:16px;padding:10px 20px;background:#9b6745;color:#fff;border-radius:6px;text-decoration:none;">Bekijk sessie</a>
      </div>
    `,
  });
}
