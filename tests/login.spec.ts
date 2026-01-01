import { PIMAssertions } from '../Assertions/PIMAssertions';
import { test } from '../Interfaces/IMasterSetup';
import { LoginMaster } from '../MasterPages/LoginMaster';
import { PimMaster } from '../MasterPages/PimMaster';


let loginMaster: LoginMaster;
let PIMEmployeeMaster: PimMaster;

// Run tests in parallel (using storage state from global setup)
test.describe('Login Tests', () => {
    test.describe.configure({ mode: 'serial' });

    test.beforeEach(async ({ page, configManagmentPage }) => {
        loginMaster = new LoginMaster(configManagmentPage!);
        PIMEmployeeMaster = new PimMaster(configManagmentPage!);  // Changed to use the page instance
        await loginMaster.loginPage.navigateToLoginPage();
    });

    test('Valid Login Test without login', {tag:['@smoke','@regression']}, async ({ },testinfo) => {
        testinfo.annotations.push({ type: 'US', description: '458985' });
        testinfo.annotations.push({ type: 'TC', description: '129896' });
       // await loginMaster.loginPage.ClickUserProfile();
        await loginMaster.page.waitForTimeout(2000); // Just for demonstration purposes
        await loginMaster.loginPage.CLickPIMMenu();
        //await PIMEmployeeMaster.EmployeeListPage.verifyPIMPageHeader();
        await PIMEmployeeMaster.PimAssertions.verifyEmployeeNameInputVisible();
        await PIMEmployeeMaster.EmployeeListPage.withEmployeeId('0001').withEmployeeName('Alice').fill();
        await PIMEmployeeMaster.page.waitForTimeout(2000); // Just for demonstration purposes
        await PIMEmployeeMaster.PimAddEmployeePage.ClickAddEmplyeeHeader();
        await PIMEmployeeMaster.page.waitForTimeout(2000); // Just for demonstration purposes
    });

    test('Valid Login Test with employee Entry', async ({  }) => {
        await loginMaster.loginPage.ClickUserProfile();
        await loginMaster.page.waitForTimeout(2000); // Just for demonstration purposes
    });

    test('Valid Login Test without login22', async ({  }) => {
        await loginMaster.loginPage.ClickUserProfile();
        await loginMaster.page.waitForTimeout(2000); // Just for demonstration purposes
    });
});
        
   

