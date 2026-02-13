# 🚀 Quick Email Setup (5 minutes)

To enable **automatic email sending** to kalanagayanga8@gmail.com:

> **📖 Need help finding your keys?** See `HOW_TO_GET_EMAILJS_KEYS.md` for detailed step-by-step instructions with screenshots!

## Option 1: EmailJS (Recommended - Free)

### Step 1: Sign Up (1 minute)
1. Go to https://www.emailjs.com/
2. Click "Sign Up" (free account)
3. Verify your email

### Step 2: Create Email Service (2 minutes)
1. In dashboard, click **"Email Services"**
2. Click **"Add New Service"**
3. Choose **"Gmail"** (or your email provider)
4. Click **"Connect Account"** and authorize
5. **Copy the Service ID** (e.g., `service_xxxxx`)

### Step 3: Create Email Template (1 minute)
1. Click **"Email Templates"**
2. Click **"Create New Template"**
3. Use this template:

**Subject:**
```
{{subject}}
```

**Content (HTML):**
```html
<h2>Questionnaire Answers 💕</h2>
<p><strong>Date:</strong> {{date}}</p>
<div style="white-space: pre-wrap;">{{message}}</div>
```

4. **Copy the Template ID** (e.g., `template_xxxxx`)

### Step 4: Get Public Key (30 seconds)
1. Click **"Account"** > **"General"**
2. Find **"Public Key"** and copy it

### Step 5: Update Config (30 seconds)
1. Open `src/app/config/email-config.ts`
2. Replace these values:
   ```typescript
   PUBLIC_KEY: 'your_public_key_here',
   SERVICE_ID: 'your_service_id_here',
   TEMPLATE_ID: 'your_template_id_here',
   ```

### Step 6: Test!
1. Run `npm start`
2. Complete the questionnaire
3. Check kalanagayanga8@gmail.com for the email!

---

## Option 2: Use Setup Script

Run the setup script:
```bash
node setup-email.js
```

Follow the prompts to enter your EmailJS keys.

---

## Template Variables

Make sure your EmailJS template includes:
- `{{to_email}}` - Recipient (kalanagayanga8@gmail.com)
- `{{subject}}` - Email subject
- `{{message}}` - Answers (plain text)
- `{{message_html}}` - Answers (HTML)
- `{{from_name}}` - Sender name

---

## Troubleshooting

**Not receiving emails?**
- Check spam folder
- Verify EmailJS service is connected
- Check EmailJS dashboard for errors

**EmailJS not working?**
- Verify all keys are correct
- Check browser console for errors
- Make sure template variables match

**Free tier limits:**
- EmailJS free: 200 emails/month
- Upgrade for more if needed

---

## Current Status

✅ Recipient: **kalanagayanga8@gmail.com**  
⏳ EmailJS: **Needs configuration** (see steps above)

Once configured, emails will be sent **automatically** when the questionnaire is completed!
