# 🚀 Netlify Deployment Guide

Complete guide for deploying your Valentine questionnaire to Netlify with automatic email sending.

## Prerequisites

1. ✅ EmailJS account set up (see `QUICK_EMAIL_SETUP.md`)
2. ✅ Your EmailJS keys ready:
   - Public Key
   - Service ID
   - Template ID

## Step 1: Set Up EmailJS (If Not Done)

Follow `QUICK_EMAIL_SETUP.md` to:
1. Create EmailJS account
2. Set up email service
3. Create email template
4. Get your keys

## Step 2: Deploy to Netlify

### Option A: Deploy via Netlify Dashboard

1. **Go to Netlify**
   - Visit https://app.netlify.com
   - Sign up/Login

2. **Connect Your Repository**
   - Click "Add new site" > "Import an existing project"
   - Connect to GitHub/GitLab/Bitbucket
   - Select your repository

3. **Configure Build Settings**
   - **Build command:** `npm ci && npm run build`
   - **Publish directory:** `dist/valentina/browser`
   - Netlify should auto-detect these from `netlify.toml`

4. **Set Environment Variables**
   - Go to **Site settings** > **Environment variables**
   - Click **Add variable** and add:
     ```
     EMAILJS_PUBLIC_KEY = your_public_key_here
     EMAILJS_SERVICE_ID = your_service_id_here
     EMAILJS_TEMPLATE_ID = your_template_id_here
     ```
   - Click **Save**

5. **Deploy**
   - Click **Deploy site**
   - Wait for build to complete

### Option B: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize Site**
   ```bash
   netlify init
   ```
   - Follow prompts to create/link site

4. **Set Environment Variables**
   ```bash
   netlify env:set EMAILJS_PUBLIC_KEY "your_public_key_here"
   netlify env:set EMAILJS_SERVICE_ID "your_service_id_here"
   netlify env:set EMAILJS_TEMPLATE_ID "your_template_id_here"
   ```

5. **Deploy**
   ```bash
   netlify deploy --prod
   ```

## Step 3: Update Code for Environment Variables

Since Angular doesn't support runtime environment variables directly, you have two options:

### Option 1: Hardcode in Config (Simpler)

Edit `src/app/config/email-config.ts` and replace:
```typescript
PUBLIC_KEY: getEnvVar('EMAILJS_PUBLIC_KEY', 'YOUR_PUBLIC_KEY'),
SERVICE_ID: getEnvVar('EMAILJS_SERVICE_ID', 'YOUR_SERVICE_ID'),
TEMPLATE_ID: getEnvVar('EMAILJS_TEMPLATE_ID', 'YOUR_TEMPLATE_ID'),
```

With your actual values:
```typescript
PUBLIC_KEY: 'your_actual_public_key',
SERVICE_ID: 'your_actual_service_id',
TEMPLATE_ID: 'your_actual_template_id',
```

**Note:** This is safe because EmailJS public keys are meant to be public (they're used client-side).

### Option 2: Use Build-Time Environment Variables

1. Create `src/environments/environment.prod.ts`:
   ```typescript
   export const environment = {
     production: true,
     emailjs: {
       publicKey: process.env['EMAILJS_PUBLIC_KEY'] || 'YOUR_PUBLIC_KEY',
       serviceId: process.env['EMAILJS_SERVICE_ID'] || 'YOUR_SERVICE_ID',
       templateId: process.env['EMAILJS_TEMPLATE_ID'] || 'YOUR_TEMPLATE_ID',
     }
   };
   ```

2. Update `email-config.ts` to import from environment

## Step 4: Verify Deployment

1. **Test the Site**
   - Visit your Netlify URL
   - Complete the questionnaire
   - Check kalanagayanga8@gmail.com for the email

2. **Check Build Logs**
   - Go to **Deploys** tab
   - Click on latest deploy
   - Check for any errors

3. **Check Browser Console**
   - Open browser DevTools (F12)
   - Go to Console tab
   - Look for any EmailJS errors

## Troubleshooting

### Emails Not Sending

1. **Check Environment Variables**
   - Go to Netlify dashboard > Site settings > Environment variables
   - Verify all three variables are set correctly

2. **Check EmailJS Dashboard**
   - Go to https://dashboard.emailjs.com/
   - Check "Email Logs" for any errors
   - Verify service is connected

3. **Check Browser Console**
   - Open DevTools (F12)
   - Look for EmailJS errors
   - Common issues:
     - Invalid keys
     - Service not connected
     - Template variables mismatch

### Build Fails

1. **Check Build Logs**
   - Go to Netlify > Deploys > Latest deploy
   - Look for error messages

2. **Common Issues**
   - Node version mismatch (should be 18)
   - Missing dependencies
   - TypeScript errors

### Environment Variables Not Working

If environment variables aren't working:
1. Use Option 1 (hardcode in config) - it's simpler and safe for EmailJS
2. EmailJS public keys are meant to be public (client-side)
3. Only the private key (which you don't use) should be secret

## Security Notes

✅ **Safe to expose:**
- EmailJS Public Key (designed for client-side use)
- Service ID
- Template ID

❌ **Never expose:**
- EmailJS Private Key (not used in this setup)
- Any server-side API keys

## Quick Checklist

- [ ] EmailJS account created
- [ ] Email service connected
- [ ] Email template created
- [ ] Keys copied
- [ ] Code updated with keys (or env vars set)
- [ ] Site deployed to Netlify
- [ ] Environment variables set (if using Option 2)
- [ ] Tested questionnaire completion
- [ ] Received test email at kalanagayanga8@gmail.com

## Need Help?

- EmailJS Docs: https://www.emailjs.com/docs/
- Netlify Docs: https://docs.netlify.com/
- Check `QUICK_EMAIL_SETUP.md for EmailJS setup

---

**Your site is now live! 🎉**

All questionnaire answers will automatically be sent to **kalanagayanga8@gmail.com** when users complete the quiz.
