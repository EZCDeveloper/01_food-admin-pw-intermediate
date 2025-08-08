import { test as baseTest } from "@playwright/test";
import { BasePage } from "../support/pages/base.page";


type PageFixtures = {
    basePage: BasePage
}

export const test = baseTest.extend<PageFixtures>({
    /*-- Page Fixtures --*/
    basePage: async ({ page }, use) => {
        const basePage = new BasePage(page);
        await use(basePage);
    },
})