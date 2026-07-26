import { expect, test } from "@playwright/test";
test("le panneau contact mobile s'ouvre, se ferme et rend le focus", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"), "Panneau réservé au mobile");
  await page.goto("/");
  const contact = page
    .getByRole("navigation", { name: "Navigation mobile principale" })
    .getByRole("button", { name: "Contact" });
  await contact.click();
  const dialog = page.getByRole("dialog", { name: /Choisissez le canal/ });
  await expect(dialog).toBeVisible();
  await expect(contact).toHaveAttribute("aria-expanded", "true");
  await expect(dialog).toBeFocused();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(contact).toBeFocused();
});
test("les canaux de contact possèdent des destinations sûres", async ({ page }) => {
  await page.goto("/");
  const links = page.locator("#contact a[href]");
  expect(await links.count()).toBeGreaterThan(0);
  for (const link of await links.all()) {
    const href = await link.getAttribute("href");
    expect(href).toBeTruthy();
    expect(href).not.toBe("#");
    expect(href).not.toMatch(/^javascript:/i);
  }
});
