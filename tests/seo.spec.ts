import { expect, test } from "@playwright/test";
test("les fondations SEO et sociales sont présentes", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/DMAMPRO/i);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /^https:\/\//);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.+/);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /.+/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /^https:\/\//);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", /summary/);
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
});
test("robots et sitemap sont accessibles", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toContain("Sitemap:");
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  expect(await sitemap.text()).toContain("<urlset");
});
