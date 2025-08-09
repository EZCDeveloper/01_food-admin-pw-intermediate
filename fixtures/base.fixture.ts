import { test as baseTest } from "@playwright/test";
import { BasePage } from "../support/pages/base.page";
import { OrdersPage } from "../support/pages/orders.page";
import { OrderHelpers } from "../support/helpers/orderHelpers";


type PageFixtures = {
    basePage: BasePage,
    ordersPage: OrdersPage,
}

type HelperFixtures = {
    orderHelpers: OrderHelpers,
}

export const test = baseTest.extend<PageFixtures & HelperFixtures>({
    /*-- Page Fixtures --*/
    basePage: async ({ page }, use) => {
        const basePage = new BasePage(page);
        await use(basePage);
    },
    ordersPage: async ({ page }, use) => {
        const ordersPage = new OrdersPage(page);
        await use(ordersPage);
    },
    /*-- Helper Fixtures --*/
    orderHelpers: async ({ }, use) => {
        const helpers = new OrderHelpers();
        await use(helpers);
    },
})