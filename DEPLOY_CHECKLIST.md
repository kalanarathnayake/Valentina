# ✅ Netlify Deployment Checklist

Quick checklist for deploying to Netlify with email functionality.

## Before Deployment

- [ ] **EmailJS Setup Complete**
  - [ ] Account created at https://www.emailjs.com/
  - [ ] Email service connected (Gmail/Outlook)
  - [ ] Email template created
  - [ ] Public Key copied
  - [ ] Service ID copied
  - [ ] Template ID copied

- [ ] **Code Updated**
  - [ ] Open `src/app/config/email-config.ts`
  - [ ] Replace `YOUR_PUBLIC_KEY` with actual key
  - [ ] Replace `YOUR_SERVICE_ID` with actual ID
  - [ ] Replace `YOUR_TEMPLATE_ID` with actual ID
  - [ ] Verify `RECIPIENT_EMAIL` is `kalanagayanga8@gmail.com`

- [ ] **Local Test**
  - [ ] Run `npm start`
  - [ ] Complete questionnaire
  - [ ] Verify email is sent (if EmailJS configured)
  - [ ] Check for console errors

## Deployment Steps

- [ ] **Netlify Account**
  - [ ] Sign up/Login at https://app.netlify.com
  - [ ] Connect GitHub/GitLab repository

- [ ] **Build Settings** (Auto-detected from netlify.toml)
  - [ ] Build command: `npm ci && npm run build`
  - [ ] Publish directory: `dist/valentina/browser`

- [ ] **Environment Variables** (Optional - if using env vars)
  - [ ] Go to Site settings > Environment variables
  - [ ] Add `EMAILJS_PUBLIC_KEY`
  - [ ] Add `EMAILJS_SERVICE_ID`
  - [ ] Add `EMAILJS_TEMPLATE_ID`

- [ ] **Deploy**
  - [ ] Click "Deploy site" or push to main branch
  - [ ] Wait for build to complete
  - [ ] Check build logs for errors

## After Deployment

- [ ] **Test Live Site**
  - [ ] Visit your Netlify URL
  - [ ] Complete the questionnaire
  - [ ] Check kalanagayanga8@gmail.com for email

- [ ] **Verify Email Sending**
  - [ ] Check EmailJS dashboard > Email Logs
  - [ ] Verify email was sent successfully
  - [ ] Check spam folder if email not received

- [ ] **Check Browser Console**
  - [ ] Open DevTools (F12)
  - [ ] Look for any errors
  - [ ] Verify EmailJS is working

## Troubleshooting

If emails aren't sending:
1. ✅ Verify keys are correct in `email-config.ts`
2. ✅ Check EmailJS dashboard for errors
3. ✅ Verify email service is connected
4. ✅ Check template variables match
5. ✅ Look at browser console for errors

## Quick Reference

**Files to Update:**
- `src/app/config/email-config.ts` - Add your EmailJS keys

**Netlify Settings:**
- Build command: `npm ci && npm run build`
- Publish: `dist/valentina/browser`
- Node version: 18

**Email Recipient:**
- kalanagayanga8@gmail.com

---

**Ready to deploy?** Follow `NETLIFY_DEPLOYMENT.md` for detailed instructions!
