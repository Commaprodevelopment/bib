import { Browser,Page,chromium,firefox,webkit,expect,test as configManagmentTest, BrowserContext } from "@playwright/test";
import path from 'path';
import fs from 'fs';


interface IMasterInterface{
    configManagmentBrowser:Browser,
    configManagmentContext:BrowserContext,
    configManagmentPage:Page,
    configManagmentPageUrl:string
};

export const test = configManagmentTest.extend<Partial<IMasterInterface>>({
    configManagmentBrowser: async ({}, use) => {
        const browserType = process.env.BROWSER || 'chromium';
        const isHeadless = process.env.HEADLESS?.toLowerCase() === 'true' || process.env.HEADLESS === '1';
        let browser: Browser;

        switch(browserType.toLowerCase()) {
            case 'firefox':
                browser = await firefox.launch({ headless: isHeadless });
                break;
            case 'webkit':
                browser = await webkit.launch({ headless: isHeadless });
                break;
            case 'chromium':
            default:
                browser = await chromium.launch({ headless: isHeadless });
                break;
        }

        await use(browser);
        await browser.close();
    },
    configManagmentContext: async ({ configManagmentBrowser }, use) => {
        if (!configManagmentBrowser) {
            throw new Error('configManagmentBrowser is not available');
        }
        
        const environment = process.env.ENVIRONMENT || 'dev';
        const storageStatePath = path.resolve(__dirname, `../auth-storage/${environment}.json`);
        
        const contextOptions: any = {
            viewport: { width: 1920, height: 1080 }
        };
        
        // Load storage state if it exists
        if (fs.existsSync(storageStatePath)) {
            contextOptions.storageState = storageStatePath;
        }
        
        const context = await configManagmentBrowser.newContext(contextOptions);
        await use(context);
        await context.close();
    },
    configManagmentPage: async ({ configManagmentContext }, use) => {
         if (!configManagmentContext) {
            throw new Error('configManagmentContext is not available');
        }
        const page = await configManagmentContext.newPage();
        await use(page);
        await page.close();
    },
    configManagmentPageUrl: async ({}, use) => {
        const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
        await use(baseUrl);
    }
});