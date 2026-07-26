import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("une note ouvre un billet complet, navigable et refermable au clavier", async ({ page }) => {
  await page.goto("/");
  const notes = page.locator(".notes:visible");
  const trigger = notes.getByRole("button", { name: /Checklist rapide avant intervention/i });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: /Checklist rapide avant intervention/i });
  await expect(dialog).toBeVisible();
  await expect(dialog).toBeFocused();
  await expect(dialog.getByRole("heading", { name: "Gardez le contrôle" })).toBeVisible();
  await dialog.getByRole("button", { name: /Note suivante/i }).click();
  await expect(
    page.getByRole("dialog", { name: /Pourquoi garder ses logiciels à jour/i }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("un billet peut basculer vers le diagnostic contextuel", async ({ page }) => {
  await page.goto("/");
  const notes = page.locator(".notes:visible");
  await notes.getByRole("button", { name: /Nettoyage système/i }).click();
  await page.getByRole("button", { name: /Ce problème me concerne/i }).click();
  await expect(page.getByRole("dialog", { name: /Diagnostic guidé/i })).toBeVisible();
});

test("@a11y le lecteur de billet ne présente aucune violation sérieuse ou critique", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .locator(".notes:visible")
    .getByRole("button", { name: /Sauvegardes/i })
    .click();
  const results = await new AxeBuilder({ page }).analyze();
  const blocking = results.violations.filter(
    ({ impact }) => impact === "critical" || impact === "serious",
  );
  expect(blocking, blocking.map(({ id, help }) => `${id}: ${help}`).join("\n")).toEqual([]);
});
