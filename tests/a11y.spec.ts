import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
test("@a11y aucune violation critique ou sérieuse sur l'accueil", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  const blocking = results.violations.filter(
    ({ impact }) => impact === "critical" || impact === "serious",
  );
  expect(blocking, blocking.map(({ id, help }) => `${id}: ${help}`).join("\n")).toEqual([]);
});
