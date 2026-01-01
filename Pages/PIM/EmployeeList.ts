import {Page, Locator} from "@playwright/test";

export class EmployeeListPage{
    private readonly page:Page;
    private employeeName: string = '';
    private employeeId: string = '';

    constructor(page:Page){
        this.page = page;
    }

    // Element locators - using more specific selectors
    Header = () => this.page.getByText('Add Employee').last();
    EmployeeNameInput = () => this.page.locator('input[placeholder="Type for hints..."]').first();
    EmployeeIdInput = () => this.page.locator('//div//input[contains(@class,"oxd-input")]').nth(1);
    
    // Builder methods - synchronous for chaining
    public withEmployeeName(employeeName: string): EmployeeListPage {
        this.employeeName = employeeName;
        return this;
    }

    public withEmployeeId(employeeId: string): EmployeeListPage {
        this.employeeId = employeeId;
        return this;
    }

    // Execution method - asynchronous
    public async fill(): Promise<EmployeeListPage> {
        console.log('Filling employee details:', {
            employeeName: this.employeeName,
            employeeId: this.employeeId
        });
        if (this.employeeName) {
            await this.EmployeeNameInput().fill(this.employeeName);
        }
        if (this.employeeId) {
            await this.EmployeeIdInput().fill(this.employeeId);
        }
        return this;
    }

    // Convenience method for quick filling
    public async fillEmployeeAllDetails(employeeName: string, employeeId: string): Promise<EmployeeListPage> {
        return this.withEmployeeName(employeeName)
                   .withEmployeeId(employeeId)
                   .fill();
    }

    public async verifyPIMPageHeader(): Promise<boolean> {
        return await this.Header().isVisible();
    }
}

// Usage example:
// await new EmployeeListPage(page)
//     .withEmployeeName("John Doe")
//     .withEmployeeId("001")
//     .fill();

