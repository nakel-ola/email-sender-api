import { HtmlValidate } from "html-validate";

const htmlValidator = new HtmlValidate({
  extends: ["html-validate:recommended"],
});

async function validateHTML(html: string): Promise<boolean> {
  const validationResults = await htmlValidator.validateString(html);
  return validationResults.valid;
}

export default validateHTML;
