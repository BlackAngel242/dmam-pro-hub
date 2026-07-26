import { expect, test } from "@playwright/test";

test("la vedette ne réapparaît pas dans la liste et les images projet chargent", async ({
  page,
}) => {
  await page.goto("/");
  const deck = page.locator(".project-deck:visible");
  await expect(deck.getByRole("heading", { name: /DrShop/i })).toHaveCount(0);
  for (const image of await deck.locator("img").all()) {
    await expect(image).toHaveJSProperty("complete", true);
    expect(await image.evaluate((node) => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(
      0,
    );
  }
});

test("les commandes font circuler les groupes de projets", async ({ page }) => {
  await page.goto("/");
  const module = page.locator(".projects:visible");
  await expect(module.getByText("1 / 2")).toBeVisible();
  await module.getByRole("button", { name: "Projets suivants" }).click();
  await expect(module.getByText("2 / 2")).toBeVisible();
  await expect(module.getByRole("heading", { name: /Nzoto/i })).toBeVisible();
});

test("la rotation automatique respecte le délai de lecture de 15 secondes", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop1536", "Chronomètre validé une fois sur desktop");
  await page.goto("/");
  const module = page.locator(".projects:visible");
  await expect(module.getByText("1 / 2")).toBeVisible();
  await page.waitForTimeout(15_500);
  await expect(module.getByText("2 / 2")).toBeVisible();
});
