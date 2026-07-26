import { expect, test } from "@playwright/test";
test("le bouton vCard produit un fichier téléchargeable", async ({ page }) => {
  await page.goto("/");
  const button = page.getByRole("button", { name: /Ajouter aux contacts/i }).first();
  const downloadPromise = page.waitForEvent("download");
  await button.click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/\.vcf$/i);
  expect(await download.failure()).toBeNull();
});
