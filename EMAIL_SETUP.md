# 📧 Email Setup Guide

The questionnaire now automatically sends all answers to **kalanagayanga8@gmail.com** when completed.

## Current Setup (Works Immediately)

The app currently uses a **mailto** fallback that opens your default email client with the answers pre-filled. This works immediately without any setup, but requires the user to manually send the email.

## Optional: Automatic Email Sending (Recommended)

For automatic email sending (no user interaction required), set up EmailJS:

### Step 1: Sign Up for EmailJS
1. Go to https://www.emailjs.com/
2. Sign up for a free account (free tier allows 200 emails/month)

### Step 2: Create an Email Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Note your **Service ID** (e.g., `service_xxxxx`)

### Step 3: Create an Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template:

**Subject:**
```
{{subject}}
```

**Content:**
```
{{message_html}}
```

Or for plain text:
```
{{message}}
```

4. Note your **Template ID** (e.g., `template_xxxxx`)

### Step 4: Get Your Public Key
1. Go to **Account** > **General**
2. Find your **Public Key** (e.g., `xxxxxxxxxxxxx`)

### Step 5: Update Configuration
1. Open `src/app/config/email-config.ts`
2. Replace the placeholder values:
   ```typescript
   PUBLIC_KEY: 'your_actual_public_key_here',
   SERVICE_ID: 'your_actual_service_id_here',
   TEMPLATE_ID: 'your_actual_template_id_here',
   ```

### Step 6: Test
1. Run `npm start`
2. Complete the questionnaire
3. Check your email at **kalanagayanga8@gmail.com**

## Template Variables

The email template should include these variables:
- `{{to_email}}` - Recipient email (kalanagayanga8@gmail.com)
- `{{subject}}` - Email subject
- `{{message}}` - Plain text message
- `{{message_html}}` - HTML formatted message

## Troubleshooting

- **EmailJS not working?** The app will automatically fall back to mailto
- **Not receiving emails?** Check your spam folder
- **Need more emails?** EmailJS free tier: 200/month. Upgrade for more

## Current Recipient Email

All answers are sent to: **kalanagayanga8@gmail.com**

To change this, edit `RECIPIENT_EMAIL` in `src/app/config/email-config.ts`
