import { test } from '../fixtures/base.fixture.ts';
import { expect } from '@playwright/test';


test.describe('1. Orders', () => {

    test('TC-1.1. Export a CSV File Successfully',
        async ({ basePage, ordersPage, orderHelpers }) => {
            // 1. Navigate to Orders page
            await basePage.navigateTo('/orders');
            await basePage.waitForPageLoad('networkidle');

            // 2. Click Export button and get download
            const download = await ordersPage.exportCsv();

            // 3. Verify that the downloaded file has a .csv extension
            const fileName = download.suggestedFilename();
            expect(fileName).toMatch(/\.csv$/i);

            // 4. Save download file and cleanup
            const downloadsDir = orderHelpers.ensureDownloadsDir();
            const downloadPath = await orderHelpers.saveDownloadAndReturnPath(download, downloadsDir);
            try {
                // No content validation in this test - only download success
            } finally {
                await orderHelpers.safeUnlink(downloadPath);
            }
        });

    test('TC-1.2. Verify that the CSV content is correct',
        async ({ basePage, ordersPage, orderHelpers }) => {
            // 1. Navigate to Orders page
            await basePage.navigateTo('/orders');
            await basePage.waitForPageLoad('networkidle');

            // 2. Click Export button and get download
            const download = await ordersPage.exportCsv();

            // 3. Verify that the downloaded file has a .csv extension
            const fileName = download.suggestedFilename();
            expect(fileName).toMatch(/\.csv$/i);

            // 4. Save download file to disk
            const downloadsDir = orderHelpers.ensureDownloadsDir();
            const downloadPath = await orderHelpers.saveDownloadAndReturnPath(download, downloadsDir);
            try {
                // 5. Read and verify CSV headers
                const headers = orderHelpers.readCsvHeaders(downloadPath);
                const expectedHeaders = ["id", "amount", "orderNumber", "status", "store", "user"];
                expect(headers).toEqual(expect.arrayContaining(expectedHeaders));
            } finally {
                // 6. Cleanup downloaded file
                await orderHelpers.safeUnlink(downloadPath);
            }
        })
});