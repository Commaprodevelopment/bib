import { chromium, Browser } from '@playwright/test';
import { LoginMaster } from './MasterPages/LoginMaster';
import { EncryptionUtil } from './Utils/EncryptionUtil';
import path from 'path';

const environment = process.env.ENVIRONMENT || 'dev';
const storageStatePath = path.resolve(__dirname, `./auth-storage/${environment}.json`);

async function globalSetup() {
    console.log(' Global Setup: Starting login...');
    
    const browser: Browser = await chromium.launch();
    const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
    const page = await context.newPage();
    
    try {
        const loginMaster = new LoginMaster(page);
        
        // Get credentials from environment variables
        const username = process.env.LOGIN_USERNAME || 'Admin';
        const encryptedPassword = process.env.LOGIN_PASSWORD || 'admin123';
        
        console.log(`DEBUG - All env vars containing USER/PASS:`, {
            LOGIN_USERNAME: process.env.LOGIN_USERNAME,
            LOGIN_PASSWORD: process.env.LOGIN_PASSWORD,
            resolvedUsername: username,
            resolvedPassword: encryptedPassword
        });
        
        // Decrypt password if it's base64 encoded (contains special base64 characters)
        let password = encryptedPassword;
        if (/^[A-Za-z0-9+/=]+$/.test(encryptedPassword) && encryptedPassword.length > 1) {
            try {
                password = EncryptionUtil.decryptBase64(encryptedPassword);
            } catch (e) {
                // If decryption fails, use as-is
                password = encryptedPassword;
            }
        }
        
        // Navigate and perform login
        console.log(`📍 Navigating to login page...`);
        await loginMaster.loginPage.navigateToLoginPage();
        
        console.log(`🔓 Attempting login with username: ${username}`);
        await loginMaster.loginPage.login(username, password);
        
        console.log(`⏳ Waiting for dashboard...`);
        await loginMaster.loginPage.DashBoardPage();
        
        console.log(`👤 Clicking user profile...`);
        await loginMaster.loginPage.ClickUserProfile();
        
        // Save storage state for all subsequent tests
        await context.storageState({ path: storageStatePath });
        console.log(` Global Setup: Login successful! Storage state saved to ${storageStatePath}`);
        
    } catch (error) {
        console.error(' Global Setup: Login failed!', error);
        throw error;
    } finally {
        await page.close();
        await context.close();
        await browser.close();
    }
}

export default globalSetup;
