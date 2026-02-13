# 🚀 Quick Start Guide

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Customize Quiz Answers
Open `src/app/config/quiz-config.ts` and replace the placeholder answers with your real answers:

```typescript
correctAnswer: 'coffee shop', // ⬅️ Change to where you actually met
correctAnswer: '2023-06-15',  // ⬅️ Change to your special date
correctAnswer: 'perfect',     // ⬅️ Change to your song
correctAnswer: 'penguin',    // ⬅️ Change to your inside joke
```

## Step 3: Customize Love Letter (Optional)
Open `src/app/components/reveal/reveal.component.ts` and edit the letter content in the template (lines 17-33).

## Step 4: Run the Website
```bash
npm start
```

Then open `http://localhost:4200` in your browser!

## Step 5: Test Everything
1. Click the button on landing (it should move)
2. Click again to proceed
3. Answer all 4 quiz questions
4. Hold the button OR type "I love you"
5. See the final reveal!

## 💡 Pro Tips
- Test on mobile too (the site is mobile-first)
- Make sure all answers match what your partner would type
- Answers are case-insensitive and use flexible matching
- Consider adding a real video in the reveal component

## 🎁 Ready to Surprise!
Once everything works, build for production:
```bash
npm run build
```

Deploy the `dist/valentina` folder to any hosting service!
