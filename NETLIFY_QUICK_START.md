# 🚀 Quick Netlify Deployment (5 Steps)

Simple guide to deploy your Valentine questionnaire to Netlify.

## Step 1: Set Up EmailJS (5 minutes)

1. Go to https://www.emailjs.com/ and sign up (free)
2. Create Email Service → Connect Gmail
3. Create Email Template (see `QUICK_EMAIL_SETUP.md`)
4. Get your keys - **See `HOW_TO_GET_EMAILJS_KEYS.md` for detailed instructions!**
   - **Public Key** (from Account → General → API Keys)
   - **Service ID** (from Email Services)
   - **Template ID** (from Email Templates)

## Step 2: Add Keys to Code

Open `src/app/config/email-config.ts` and replace:

```typescript
PUBLIC_KEY: 'YOUR_PUBLIC_KEY',      // ← Paste your public key
SERVICE_ID: 'YOUR_SERVICE_ID',      // ← Paste your service ID
TEMPLATE_ID: 'YOUR_TEMPLATE_ID',    // ← Paste your template ID
```

**Example:**
```typescript
PUBLIC_KEY: 'abc123xyz',
SERVICE_ID: 'service_gmail',
TEMPLATE_ID: 'template_abc123',
```

## Step 3: Commit and Push

```bash
git add .
git commit -m "Add EmailJS configuration"
git push
```

## Step 4: Deploy to Netlify

### Option A: Via Netlify Dashboard

1. Go to https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your GitHub/GitLab repository
4. Netlify will auto-detect settings from `netlify.toml`:
   - Build command: `npm ci && npm run build`
   - Publish directory: `dist/valentina/browser`
5. Click **"Deploy site"**

### Option B: Via Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## Step 5: Test

1. Visit your Netlify URL
2. Complete the questionnaire
3. Check **kalanagayanga8@gmail.com** for the email! 📬

---

## That's It! 🎉

Your site is now live and emails will be sent automatically.

## Troubleshooting

**Emails not sending?**
- ✅ Check keys are correct in `email-config.ts`
- ✅ Verify EmailJS service is connected
- ✅ Check EmailJS dashboard > Email Logs
- ✅ Check browser console (F12) for errors

**Build fails?**
- ✅ Check Netlify build logs
- ✅ Verify Node version is 18
- ✅ Make sure all dependencies are in `package.json`

## Need More Help?

- Detailed guide: `NETLIFY_DEPLOYMENT.md`
- EmailJS setup: `QUICK_EMAIL_SETUP.md`
- Checklist: `DEPLOY_CHECKLIST.md`

---

**Your recipient email:** kalanagayanga8@gmail.com  
**All answers will be sent there automatically!** 💌
