import { test } from '../fixtures/base.fixture.ts';
import { expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('1. Orders', () => {

    test('TC-1.1. Export Orders by CSV file', async ({ page, basePage }) => {
        // 1. Navigate to Orders page
        await basePage.navigateTo("/orders");
        await basePage.waitForPageLoad('networkidle');

        // 2. Click on Export button
        const downloadPromise = page.waitForEvent('download');
        await page.getByRole('button', { name: 'Export' }).click();
        const download = await downloadPromise;

        // 3. Verify that the downloaded file has a .csv extension
        const fileName = download.suggestedFilename();
        expect(fileName).toMatch(/\.csv$/i);

        // 4. Create downloads directory if it doesn't exist
        const downloadsDir = path.join(process.cwd(), 'downloads');
        if (!fs.existsSync(downloadsDir)) {
            fs.mkdirSync(downloadsDir, { recursive: true });
        }

        // 5. Download the file and cleanup only
        const downloadPath = path.join(downloadsDir, fileName);
        await download.saveAs(downloadPath);
        try {
            // 6. no content assertions in this test
        } finally {
            try {
                if (fs.existsSync(downloadPath)) {
                    await fs.promises.unlink(downloadPath);
                }
            } catch {
                // ignore cleanup errors
            }
        }
    });

    test('TC-1.2. Verify that the CSV content is correct', async ({ page, basePage }) => {
        // 1. Navigate to Orders page
        await basePage.navigateTo("/orders");
        await basePage.waitForPageLoad('networkidle');

        // 2. Click on Export button
        const downloadPromise = page.waitForEvent('download');
        await page.getByRole('button', { name: 'Export' }).click();
        const download = await downloadPromise;

        // 3. Verify that the downloaded file has a .csv extension
        const fileName = download.suggestedFilename();
        expect(fileName).toMatch(/\.csv$/i);

        // 4. Create downloads directory if it doesn't exist
        // Create downloads directory if it doesn't exist
        const downloadsDir = path.join(process.cwd(), 'downloads');
        if (!fs.existsSync(downloadsDir)) {
            fs.mkdirSync(downloadsDir, { recursive: true });
        }

        // 5. Download the file and verify headers
        const downloadPath = path.join(downloadsDir, fileName);
        await download.saveAs(downloadPath);
        try {
            const fileContent = fs.readFileSync(downloadPath, 'utf-8');
            const lines = fileContent.split(/\r?\n/);
            const headers = lines[0]
                .replace(/^\uFEFF/, '')
                .split(',')
                .map(h => h.trim().replace(/^"(.*)"$/, '$1'));

            const expectedHeaders = ["id", "amount", "orderNumber", "status", "store", "user"];
            expect(headers).toEqual(expect.arrayContaining(expectedHeaders));
        } finally {
            try {
                if (fs.existsSync(downloadPath)) {
                    await fs.promises.unlink(downloadPath);
                }
            } catch {
                // ignore cleanup errors
            }
        }
    })
});