import { Page } from "@playwright/test";
import { LoginPage } from "../Pages/Login/loginPage";

export class LoginMaster{
    readonly page: Page;
    readonly loginPage: LoginPage;

    constructor(page: Page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
    }
}