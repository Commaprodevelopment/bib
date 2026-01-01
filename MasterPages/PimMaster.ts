import { Page } from "@playwright/test";
import { EmployeeListPage } from "../Pages/PIM/EmployeeList";
import { PIMAssertions } from "../Assertions/PIMAssertions";
import { PIMAddEmployeePage } from "../Pages/PIM/AddEmployee";

export class PimMaster{
    readonly page: Page;
    readonly EmployeeListPage: EmployeeListPage;
    readonly PimAssertions: PIMAssertions;
    readonly PimAddEmployeePage!: PIMAddEmployeePage;



    constructor(page: Page) {
        this.page = page;
        this.EmployeeListPage = new EmployeeListPage(this.page);
        this.PimAssertions = new PIMAssertions(this.EmployeeListPage);
        this.PimAddEmployeePage = new PIMAddEmployeePage(this.page);
      
    }
}