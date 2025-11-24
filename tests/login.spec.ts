import { test, expect } from '@playwright/test';

test('home page login works', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  await page.getByLabel('Email').fill('kevincao64@gmail.com');
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Log In' }).click();

  
  await expect(page.getByRole('button', { name: /logout/i })).toBeVisible({ timeout: 10000 });
});
