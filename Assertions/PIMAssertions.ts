import { expect } from '@playwright/test';
import { EmployeeListPage } from '../Pages/PIM/EmployeeList';

export class PIMAssertions {
    private readonly employeeListPage: EmployeeListPage;

    constructor(employeeListPage: EmployeeListPage) {
        this.employeeListPage = employeeListPage;
    }

    /**
     * Asserts that the PIM page header is visible
     */
    async verifyPIMPageHeader(): Promise<void> {
        const isVisible = await this.employeeListPage.verifyPIMPageHeader();
        expect(isVisible, 'PIM page header should be visible').toBeTruthy();
    }

    /**
     * Asserts that the PIM page header contains expected text
     */
    async verifyPIMPageHeaderText(expectedText: string = 'PIM'): Promise<void> {
        const headerLocator = this.employeeListPage.Header();
        await expect(headerLocator, `PIM page header should contain text: ${expectedText}`)
            .toHaveText(expectedText);
    }

    /**
     * Asserts that employee name input is visible and enabled
     */
    async verifyEmployeeNameInputVisible(): Promise<void> {
        const inputLocator = this.employeeListPage.EmployeeNameInput();
        await expect(inputLocator, 'Employee name input should be visible').toBeVisible();
        await expect(inputLocator, 'Employee name input should be enabled').toBeEnabled();
    }

    /**
     * Asserts that employee ID input is visible and enabled
     */
    async verifyEmployeeIdInputVisible(): Promise<void> {
        const inputLocator = this.employeeListPage.EmployeeIdInput();
        await expect(inputLocator, 'Employee ID input should be visible').toBeVisible();
        await expect(inputLocator, 'Employee ID input should be enabled').toBeEnabled();
    }
}