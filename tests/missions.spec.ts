import { expect, test } from "@playwright/test";

test("chaque mission peut être sélectionnée et expose son état", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "tablet864", "Vue tablette compacte");
  await page.goto("/");
  const buttons = page.locator("#assistance:visible button[aria-pressed]");
  await expect(buttons).toHaveCount(4);

  for (const button of await buttons.all()) {
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(button).toHaveClass(/sel/);
    await expect(page.getByRole("dialog", { name: /Diagnostic guidé/i })).toBeVisible();
    await page.keyboard.press("Escape");
  }
});

test("le CTA de mission ouvre le diagnostic guidé sans lancer d'application externe", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name === "tablet864", "Vue tablette compacte");
  await page.goto("/");
  await page
    .locator("#assistance:visible")
    .getByRole("button", { name: /Préparer mon besoin/i })
    .click();
  const dialog = page.getByRole("dialog", { name: /Diagnostic guidé/i });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator("button").first()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});
