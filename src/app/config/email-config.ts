/**
 * Email Configuration
 * 
 * To enable automatic email sending:
 * 1. Sign up for a free account at https://www.emailjs.com/
 * 2. Create an Email Service (Gmail, Outlook, etc.)
 * 3. Create an Email Template with these variables:
 *    - {{to_email}} - recipient email
 *    - {{subject}} - email subject
 *    - {{message}} - email message (plain text)
 *    - {{message_html}} - email message (HTML format)
 * 4. Get your Public Key, Service ID, and Template ID from EmailJS dashboard
 * 5. Replace the values below with your actual keys
 * 
 * IMPORTANT: EmailJS public keys are safe to expose in client-side code.
 * They are designed to be used in the browser.
 */

export const EMAIL_CONFIG = {
  // Your EmailJS Public Key (found in Account > API Keys)
  // Replace 'YOUR_PUBLIC_KEY' with your actual public key
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY',
  
  // Your EmailJS Service ID (found in Email Services)
  // Replace 'YOUR_SERVICE_ID' with your actual service ID
  SERVICE_ID: 'YOUR_SERVICE_ID',
  
  // Your EmailJS Template ID (found in Email Templates)
  // Replace 'YOUR_TEMPLATE_ID' with your actual template ID
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID',
  
  // Recipient email address (where all answers will be sent)
  RECIPIENT_EMAIL: 'kalanagayanga8@gmail.com',
  
  // Whether EmailJS is configured
  get isConfigured(): boolean {
    return this.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' && 
           this.SERVICE_ID !== 'YOUR_SERVICE_ID' && 
           this.TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' &&
           this.PUBLIC_KEY !== '' &&
           this.SERVICE_ID !== '' &&
           this.TEMPLATE_ID !== '';
  }
};
