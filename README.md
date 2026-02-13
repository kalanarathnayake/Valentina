# 💕 Valentine's Day Surprise Website

A romantic, interactive website built with Angular to surprise your special someone on Valentine's Day!

## ✨ Features

- **Playful Landing Screen**: Teasing interaction with a moving button
- **Memory Quiz**: 4 personalized questions about your relationship
- **Progress Indicator**: Visual hearts that fill as questions are answered
- **Final Lock**: Hold button or type "I love you" to unlock
- **Final Reveal**: Beautiful love letter with optional video placeholder
- **Romantic Design**: Soft pastel theme with smooth animations
- **Mobile-First**: Fully responsive design

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Customize the quiz answers:
   - Open `src/app/components/quiz/quiz.component.ts`
   - Update the `correctAnswer` fields in the `questions` array with your personalized answers
   - Or set them in localStorage with key `valentineAnswers` as a JSON array

3. Customize the love letter:
   - Open `src/app/components/reveal/reveal.component.ts`
   - Edit the letter content in the template

4. Run the development server:
```bash
npm start
```

5. Open your browser and navigate to `http://localhost:4200`

## 🎨 Customization

### Quiz Questions & Answers

**Easy way**: Edit `src/app/config/quiz-config.ts` - this is the recommended approach!

The quiz now includes 5 intimate memory questions:
1. **Our Song** - The special song you share
2. **The Day We Met** - When your story began
3. **First Kiss** - Where you first kissed
4. **Favorite Memory** - Her favorite memory of you two
5. **Daily Tea Spot** - Your special place with memories

```typescript
export const QUIZ_CONFIG: QuizConfig = {
  questions: [
    {
      question: 'There\'s one song I love listening to only with you…\nWhich song is it? 🎶',
      correctAnswer: 'your song name', // ⬅️ Change this!
      romanticMessage: 'Yes… ❤️\nThis song feels incomplete without you.'
    },
    // ... customize all 5 questions
  ]
};
```

**Alternative**: You can also set answers via localStorage in the browser console:
```javascript
localStorage.setItem('valentineAnswers', JSON.stringify([
  'coffee shop',
  '2023-06-15',
  'perfect',
  'penguin'
]));
```

### Love Letter Content

Edit the letter in `src/app/components/reveal/reveal.component.ts` template section.

### Colors & Styling

Modify CSS variables in `src/styles.css`:

```css
:root {
  --primary-pink: #ff9ec5;
  --primary-red: #ff6b9d;
  /* ... more colors */
}
```

## 📱 Build for Production

```bash
npm run build
```

The built files will be in the `dist/valentina` directory.

## 💝 Tips

- Test all interactions before sharing
- Consider adding a real video in the reveal component
- You can add background music (user-initiated only for best UX)
- Make sure all quiz answers are personalized to your relationship

## 🎁 Enjoy!

This website is designed to create a memorable, emotional experience. Make it your own and enjoy the surprise!
