import { Page, Download } from '@playwright/test';

export class OrdersPage {
    constructor(private readonly page: Page) { }

    async exportCsv(): Promise<Download> {
        const downloadPromise = this.page.waitForEvent('download');
        await this.page.getByRole('button', { name: 'Export' }).click();
        const download = await downloadPromise;
        return download;
    }
}


