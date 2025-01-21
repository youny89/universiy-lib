import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient, resend } from "@upstash/qstash";
import { config } from "./config";

const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

export const sendMail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  await qstashClient.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: config.env.resendApiKey! }),
    },
    body: {
      from: "Acme <onboarding@resend.dev>",
      to: ["delivered@resend.dev"],
      subject: subject,
      html: message,
    },
  });
};
