/**
 * Quick Email Setup Script
 * 
 * This script helps you set up automatic email sending using EmailJS
 * 
 * Steps:
 * 1. Go to https://www.emailjs.com/ and sign up (free)
 * 2. Create an Email Service (Gmail recommended)
 * 3. Create an Email Template
 * 4. Get your keys from the dashboard
 * 5. Run this script to update the config
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setup() {
  console.log('\n📧 EmailJS Setup for Valentine Questionnaire\n');
  console.log('Follow these steps:');
  console.log('1. Sign up at https://www.emailjs.com/');
  console.log('2. Create an Email Service');
  console.log('3. Create an Email Template');
  console.log('4. Get your keys from the dashboard\n');

  const publicKey = await question('Enter your EmailJS Public Key: ');
  const serviceId = await question('Enter your EmailJS Service ID: ');
  const templateId = await question('Enter your EmailJS Template ID: ');

  const configPath = path.join(__dirname, 'src/app/config/email-config.ts');
  let configContent = fs.readFileSync(configPath, 'utf8');

  configContent = configContent.replace(
    /PUBLIC_KEY: 'YOUR_PUBLIC_KEY'/,
    `PUBLIC_KEY: '${publicKey}'`
  );
  configContent = configContent.replace(
    /SERVICE_ID: 'YOUR_SERVICE_ID'/,
    `SERVICE_ID: '${serviceId}'`
  );
  configContent = configContent.replace(
    /TEMPLATE_ID: 'YOUR_TEMPLATE_ID'/,
    `TEMPLATE_ID: '${templateId}'`
  );

  fs.writeFileSync(configPath, configContent);
  console.log('\n✅ Configuration updated!');
  console.log('Your emails will now be sent automatically to kalanagayanga8@gmail.com\n');
  rl.close();
}

setup().catch(console.error);
