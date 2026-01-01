import { Page } from "@playwright/test";
import { EmployeeListPage } from "../Pages/PIM/EmployeeList";

export class PimMaster{
    readonly page: Page;
    readonly EmployeeListPage: EmployeeListPage;

    constructor(page: Page) {
        this.page = page;
        this.EmployeeListPage = new EmployeeListPage(this.page);
    }
}