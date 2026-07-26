import { expect, test } from "@playwright/test";
test("les ancres principales ciblent des sections existantes", async ({ page }) => {
  await page.goto("/");
  for (const id of ["assistance", "projects", "notes", "contact"]) {
    expect(await page.locator(`#${id}`).count()).toBeGreaterThan(0);
    expect(await page.locator(`a[href="#${id}"]`).count()).toBeGreaterThan(0);
  }
});
test("la navigation mobile permet d'atteindre une section", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"), "Navigation réservée au mobile");
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Navigation mobile principale" });
  await expect(nav).toBeVisible();
  await nav.getByRole("link", { name: "Assistance" }).click();
  await expect(page).toHaveURL(/#assistance$/);
  await expect(page.locator("#assistance")).toBeInViewport();
});
test("la navigation mobile n'est pas affichée sur grand écran", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.startsWith("mobile"), "Contrôle desktop et tablette");
  await page.goto("/");
  await expect(page.getByRole("navigation", { name: "Navigation mobile principale" })).toBeHidden();
});
