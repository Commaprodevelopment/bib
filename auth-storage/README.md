# Storage State Files

This directory contains browser storage state files for different environments.

## Files

- `dev.json` - Development environment storage state
- `staging.json` - Staging environment storage state
- `prod.json` - Production environment storage state

## Usage

Storage state is automatically loaded based on the `ENVIRONMENT` variable:

```bash
# Load storage state for dev environment (default)
npx playwright test

# Load storage state for staging environment
ENVIRONMENT=staging npx playwright test

# Load storage state for prod environment
ENVIRONMENT=prod npx playwright test
```

## Generating Storage State

To save authentication/storage state from a running session:

```typescript
await context.storageState({ path: './auth-storage/dev.json' });
```

This will capture:
- Cookies
- Local storage
- Session storage
- IndexedDB data (if using proper save methods)

## Format

Each file follows the Playwright storage state format:

```json
{
  "cookies": [
    {
      "name": "cookie_name",
      "value": "cookie_value",
      "domain": ".example.com",
      "path": "/",
      "expires": 1735689600,
      "httpOnly": false,
      "secure": true,
      "sameSite": "Lax"
    }
  ],
  "origins": [
    {
      "origin": "https://example.com",
      "localStorage": [
        {
          "name": "key",
          "value": "value"
        }
      ],
      "sessionStorage": [
        {
          "name": "key",
          "value": "value"
        }
      ]
    }
  ]
}
```
# Uses dev.json (default)
npx playwright test

# Uses staging.json
ENVIRONMENT=staging npx playwright test

# Uses prod.json
ENVIRONMENT=prod npx playwright test