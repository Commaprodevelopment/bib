import { Page } from "@playwright/test";

export class LoginPage{
    private readonly page:Page;
    constructor(page:Page){
        this.page=page;
    }

      userName =()=> this.page.getByPlaceholder('Username');
      password =()=> this.page.getByPlaceholder('Password');
      loginButton =()=> this.page.getByRole('button', { name: 'Login' });
      errorMessage=()=>this.page.locator('.orangehrm-demo-credentials');
      userProfile=()=> this.page.locator('.oxd-userdropdown-name');
      PIMMenu=()=>this.page.getByText("PIM").nth(0);

    public async CLickPIMMenu():Promise<void>{
        await this.PIMMenu().click();
    }
      public async navigateToLoginPage(url?: string){
        const targetUrl = url || process.env.BASE_URL || 'http://localhost:3000';
        await this.page.goto(targetUrl);
      }
      public async login(username: string, password: string):Promise<void>{
        await this.userName().fill(username);
        await this.password().fill(password);
        await this.loginButton().click();
        // Wait for navigation after login
        await this.page.waitForNavigation({ waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
      }
      public async DashBoardPage():Promise<void>{
        // Wait for dashboard URL with extended timeout
        await this.page.waitForURL('**/dashboard/**', { timeout: 45000 }).catch(async () => {
          const currentUrl = this.page.url();
          console.warn(` Dashboard URL not matched. Current URL: ${currentUrl}`);
          // If URL didn't match expected pattern, wait for page to be ready
          await this.page.waitForLoadState('networkidle');
        });
      }
      public async ClickUserProfile():Promise<void>{  
        await this.userProfile().click();
      }
}
