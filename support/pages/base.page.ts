import { Page, expect } from "@playwright/test";

export class BasePage {
    constructor(private page: Page) { }

    async navigateTo(path: string) {
        await this.page.goto(`${process.env.BASE_URL}${path}`);
    }

    async waitForPageLoad(state: 'load' | 'domcontentloaded' | 'networkidle' = 'networkidle') {
        await this.page.waitForLoadState(state);
    }

}