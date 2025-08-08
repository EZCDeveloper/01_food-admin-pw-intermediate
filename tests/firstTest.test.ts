import { test } from '../fixtures/base.fixture.ts';
import { expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';


test('TC01-Navigate to homepage', async ({ page, basePage }) => {
    await basePage.navigateTo("/orders");
    await basePage.waitForPageLoad('networkidle');

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Export' }).click();
    const download = await downloadPromise;

    // Verify that the downloaded file has a .csv extension
    const fileName = download.suggestedFilename();
    expect(fileName).toMatch(/\.csv$/i);

    // Create downloads directory if it doesn't exist
    const downloadsDir = path.join(process.cwd(), 'downloads');
    if (!fs.existsSync(downloadsDir)) {
        fs.mkdirSync(downloadsDir, { recursive: true });
    }

    // Download the file and verify headers
    const downloadPath = path.join(downloadsDir, fileName);
    await download.saveAs(downloadPath);
    const fileContent = fs.readFileSync(downloadPath, 'utf-8');
    const lines = fileContent.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());

    const expectedHeaders = ["id", "amount", "orderNumber", "status", "store", "user"];
    expect(headers).toEqual(expect.arrayContaining(expectedHeaders));
});