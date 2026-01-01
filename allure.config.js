const { Category } = require('allure-js-commons');

module.exports = {
  title: 'Constellation Allure Report',
  
  // Custom branding
  branding: {
    title: 'Constellation Test Suite',
    // You can also add a logo if desired
    // logo: 'assets/logo.png'
  },
  
  // Language settings
  language: 'en',
  
  // Categories for test results
  categories: [
    {
      name: 'Smoke Tests',
      matchedStatuses: ['passed', 'failed', 'broken', 'skipped']
    },
    {
      name: 'Regression Tests', 
      matchedStatuses: ['passed', 'failed', 'broken', 'skipped']
    },
    {
      name: 'Login Tests',
      matchedStatuses: ['passed', 'failed', 'broken', 'skipped']
    }
  ],
  
  // Environment information
  environment: {
    framework: 'Playwright',
    language: 'TypeScript',
    reporter: 'Allure'
  }
};