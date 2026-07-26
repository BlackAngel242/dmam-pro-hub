import { defineConfig } from "@playwright/test";
const baseURL = "http://127.0.0.1:4190";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: 2,
  reporter: process.env.CI
    ? [["line"], ["html", { open: "never", outputFolder: "playwright-report" }]]
    : "list",
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: process.env.CI ? "retain-on-failure" : "off",
    channel: process.env.CI ? undefined : "chrome",
  },
  outputDir: "test-results",
  projects: [
    { name: "desktop1536", use: { viewport: { width: 1536, height: 1024 } } },
    { name: "tablet864", use: { viewport: { width: 864, height: 1200 } } },
    {
      name: "mobile390",
      use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
    },
    {
      name: "mobile320",
      use: { viewport: { width: 320, height: 700 }, isMobile: true, hasTouch: true },
    },
  ],
  webServer: {
    command: "npm run preview -- --host 127.0.0.1 --port 4190 --strictPort",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
