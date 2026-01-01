import {Page, Locator} from "@playwright/test";


export class EmployeeListPage{
    private readonly page:Page;
    private employeeName: string = '';
    private employeeId: string = '';

    constructor(page:Page){
        this.page = page;
    }

    // Element locators
    Header = () => this.page.locator('h6').filter({ hasText: 'PIM' });
    EmployeeNameInput = () => this.page.getByPlaceholder('Type for hints...').first();
    EmployeeIdInput = () => this.page.locator('//div//input[contains(@class,"oxd-input")]').first();
    
    // Builder methods
    public withEmployeeName(employeeName: string): EmployeeListPage {
        this.employeeName = employeeName;
        return this;
    }

    public withEmployeeId(employeeId: string): EmployeeListPage {
        this.employeeId = employeeId;
        return this;
    }

    // Execution method
    public async fill(): Promise<EmployeeListPage> {
        if (this.employeeName) {
            await this.EmployeeNameInput().fill(this.employeeName);
        }
        if (this.employeeId) {
            await this.EmployeeIdInput().fill(this.employeeId);
        }
        return this;
    }

    // Alternative: Chainable fill methods
    public async fillEmployeeName(employeeName: string): Promise<EmployeeListPage> {
        await this.EmployeeNameInput().fill(employeeName);
        return this;
    }

    public async fillEmployeeId(employeeId: string): Promise<EmployeeListPage> {
        await this.EmployeeIdInput().fill(employeeId);
        return this;
    }

    // Convenience method for backward compatibility
    public async fillEmployeeAllDetails(employeeName: string, employeeId: string): Promise<EmployeeListPage> {
        return this.withEmployeeName(employeeName)
                   .withEmployeeId(employeeId)
                   .fill();
    }

    public async verifyPIMPageHeader(): Promise<boolean> {
        return await this.Header().isVisible();
    }
}

// Usage examples:
// Option 1: Builder pattern with chaining
// await new EmployeeListPage(page)
//     .withEmployeeName("John Doe")
//     .withEmployeeId("001")
//     .fill();

// Option 2: Traditional chaining
// await new EmployeeListPage(page)
//     .fillEmployeeName("John Doe")
//     .fillEmployeeId("001");

// Option 3: All-in-one method (backward compatible)
// await new EmployeeListPage(page).fillEmployeeAllDetails("John Doe", "001");
   