import {Page, Locator }  from '@playwright/test';
export class PIMAddEmployeePage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    AddEmployeeHeader=()=> this.page.getByText('Add Employee').last();
    public async ClickAddEmplyeeHeader():Promise<void>{
        await this.AddEmployeeHeader().click();
    }

}
