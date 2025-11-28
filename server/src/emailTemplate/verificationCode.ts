import { readFileSync } from "fs";
import mjml2html from "mjml";
import { join } from "path";

const emailTemplate = readFileSync(join(__dirname, "./verificationCode.mjml"), {
  encoding: "utf-8",
});

export const getVerificationEmailTemplate = (code: string, to: string) => {
  let template = emailTemplate
    .replace("{{ code }}", code)
    .replace("{{ username }}", to);
  let result = mjml2html(template);
  return result.html;
};
