# 📝 Customize Fill-in-the-Blank Questions

There are 3 questions that need your custom answers. You can set them in two ways:

## Option 1: Edit the Config File (Recommended)

Open `src/app/config/quiz-config.ts` and update these questions:

1. **Question 4** - "My favorite memory with you is ________."
   - Line 62: Set `correctAnswer: 'your memory here'`

2. **Question 7** - "The best gift you ever gave me is ________."
   - Line 86: Set `correctAnswer: 'the gift name'`

3. **Question 10** - "How many kids do you want with me?"
   - Line 116: Set `correctAnswer: 'your answer'` (e.g., '2', 'two', 'a few')

## Option 2: Use Browser Console

Open browser console and run:
```javascript
localStorage.setItem('valentineFillAnswers', JSON.stringify([
  '', // Q1 - Song (not needed, it's MCQ)
  '', // Q2 - Date (not needed, it's MCQ)
  '', // Q3 - First Kiss (not needed, it's MCQ)
  'your favorite memory', // Q4 - Fill blank
  '', // Q5 - Tea spot (not needed, it's MCQ)
  '', // Q6 - Honeymoon (already set to "Down South")
  'the gift name', // Q7 - Fill blank
  '', // Q8 - Wedding date (not needed, it's MCQ)
  '', // Q9 - Wedding location (not needed, it's MCQ)
  'your answer', // Q10 - Fill blank
  '' // Q11 - Open ended (any answer works)
]));
```

**Note:** Answers are case-insensitive and use flexible matching, so partial matches work!
