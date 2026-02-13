# 🔑 How to Get EmailJS Keys and Credentials

Step-by-step guide to get all the keys you need for automatic email sending.

## Step 1: Sign Up for EmailJS (2 minutes)

1. Go to **https://www.emailjs.com/**
2. Click **"Sign Up"** (top right)
3. Choose **"Sign up with Google"** (easiest) or create account with email
4. Verify your email if needed
5. You'll be taken to the dashboard

---

## Step 2: Get Your Public Key (30 seconds)

1. In the EmailJS dashboard, click on **"Account"** (top right)
2. Click **"General"** in the left sidebar
3. Scroll down to find **"API Keys"** section
4. You'll see your **Public Key** (looks like: `abc123xyz789`)
5. **Copy this key** - you'll need it for `PUBLIC_KEY` in your config

**Location:** Account → General → API Keys → Public Key

---

## Step 3: Create Email Service & Get Service ID (3 minutes)

1. In the dashboard, click **"Email Services"** (left sidebar)
2. Click **"Add New Service"** button
3. Choose your email provider:
   - **Gmail** (recommended - easiest)
   - Outlook
   - Yahoo
   - Custom SMTP
4. Click **"Connect Account"**
5. Sign in with your email account and authorize EmailJS
6. Give it a name (e.g., "Gmail Service")
7. Click **"Create Service"**
8. You'll see your **Service ID** (looks like: `service_gmail123` or `service_xxxxx`)
9. **Copy this Service ID** - you'll need it for `SERVICE_ID` in your config

**Location:** Email Services → Your Service → Service ID

---

## Step 4: Create Email Template & Get Template ID (2 minutes)

1. In the dashboard, click **"Email Templates"** (left sidebar)
2. Click **"Create New Template"** button
3. Fill in the template:

   **Template Name:**
   ```
   Questionnaire Answers
   ```

   **Subject:**
   ```
   {{subject}}
   ```

   **Content (HTML):**
   ```html
   <h2>Questionnaire Answers 💕</h2>
   <p><strong>Date:</strong> {{date}}</p>
   <div style="white-space: pre-wrap; font-family: Arial, sans-serif; line-height: 1.6;">
   {{message}}
   </div>
   ```

   Or for plain text version:
   ```
   Questionnaire Answers 💕
   
   Date: {{date}}
   
   {{message}}
   ```

4. **Important:** Make sure these variables are in your template:
   - `{{to_email}}` - Recipient email
   - `{{subject}}` - Email subject
   - `{{message}}` - Answers (text)
   - `{{message_html}}` - Answers (HTML) - optional
   - `{{from_name}}` - Sender name - optional

5. Click **"Save"**
6. You'll see your **Template ID** (looks like: `template_abc123` or `template_xxxxx`)
7. **Copy this Template ID** - you'll need it for `TEMPLATE_ID` in your config

**Location:** Email Templates → Your Template → Template ID

---

## Step 5: Update Your Config File

Now that you have all three keys, update `src/app/config/email-config.ts`:

```typescript
export const EMAIL_CONFIG = {
  PUBLIC_KEY: 'paste_your_public_key_here',      // From Step 2
  SERVICE_ID: 'paste_your_service_id_here',      // From Step 3
  TEMPLATE_ID: 'paste_your_template_id_here',    // From Step 4
  RECIPIENT_EMAIL: 'kalanagayanga8@gmail.com',   // Already set
};
```

**Example:**
```typescript
export const EMAIL_CONFIG = {
  PUBLIC_KEY: 'abc123xyz789',
  SERVICE_ID: 'service_gmail123',
  TEMPLATE_ID: 'template_abc123',
  RECIPIENT_EMAIL: 'kalanagayanga8@gmail.com',
};
```

---

## Quick Reference: Where to Find Each Key

| Key | Where to Find | Looks Like |
|-----|---------------|------------|
| **Public Key** | Account → General → API Keys | `abc123xyz789` |
| **Service ID** | Email Services → Your Service | `service_gmail123` |
| **Template ID** | Email Templates → Your Template | `template_abc123` |

---

## Visual Guide

### Public Key Location:
```
Dashboard → Account (top right) → General → API Keys → Public Key
```

### Service ID Location:
```
Dashboard → Email Services (left sidebar) → Your Service → Service ID
```

### Template ID Location:
```
Dashboard → Email Templates (left sidebar) → Your Template → Template ID
```

---

## Testing Your Keys

1. Update `src/app/config/email-config.ts` with your keys
2. Run `npm start`
3. Complete the questionnaire
4. Check **kalanagayanga8@gmail.com** for the email
5. Check EmailJS dashboard → **"Email Logs"** to see if email was sent

---

## Troubleshooting

### Can't find Public Key?
- Make sure you're logged in
- Go to Account → General
- Scroll down to API Keys section
- If you don't see it, try refreshing the page

### Can't create Email Service?
- Make sure you're using a supported provider (Gmail, Outlook, etc.)
- You need to authorize EmailJS to send emails on your behalf
- Check that your email account allows third-party access

### Template not working?
- Make sure all required variables are in your template: `{{to_email}}`, `{{subject}}`, `{{message}}`
- Check that template is saved
- Verify template ID is correct

### Keys not working?
- Double-check you copied the entire key (no spaces)
- Make sure keys are in quotes: `'your_key_here'`
- Check browser console (F12) for errors
- Verify service is connected in EmailJS dashboard

---

## Security Notes

✅ **Safe to use in code:**
- Public Key (designed for client-side)
- Service ID
- Template ID

❌ **Never share:**
- Private Key (you won't need this)
- Email account password

---

## Need Help?

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com
- Check `QUICK_EMAIL_SETUP.md` for more details

---

**Once you have all three keys, you're ready to deploy!** 🚀
