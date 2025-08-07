import { test, expect } from '@playwright/test';

test('TC01-Navigate to homepage', async ({ page }) => {
    await page.goto(process.env.BASE_URL as string)
})