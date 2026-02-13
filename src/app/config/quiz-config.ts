/**
 * QUIZ CONFIGURATION FOR INUKSHI (BABU) 💕
 * 
 * All questions customized with our real memories
 */

export interface QuestionConfig {
  question: string;
  type: 'mcq' | 'fill-blank' | 'open-ended' | 'rating-scale';
  options?: string[];
  correctAnswer?: string; // For MCQ and fill-blank
  romanticMessage: string;
  triggerMusic?: boolean; // For song question
  ratingMessages?: { [key: number]: string }; // For rating scale
}

export interface QuizConfig {
  questions: QuestionConfig[];
}

export const QUIZ_CONFIG: QuizConfig = {
  questions: [
    {
      question: 'There\'s one song I love listening to only with you… 🎶\nWhich one is it?',
      type: 'mcq',
      options: [
        'Ehema Baluwama Mage Diha',
        'Random TikTok song',
        'Elevator music 😅',
        'A song I skip'
      ],
      correctAnswer: 'Ehema Baluwama Mage Diha',
      romanticMessage: 'Yes… ❤️\nThis song feels incomplete without you.',
      triggerMusic: true
    },
    {
      question: 'What was the date when our story began?',
      type: 'mcq',
      options: [
        'June 15',
        'June 14',
        'July 15',
        'A day I\'ll never forget anyway 😌'
      ],
      correctAnswer: 'June 15',
      romanticMessage: 'That day changed everything for me 🥹'
    },
    {
      question: 'Where did we share our first kiss?',
      type: 'mcq',
      options: [
        'The Gallery Cafe',
        'Somewhere awkward 😅',
        'Still loading…',
        'In a movie scene 😉'
      ],
      correctAnswer: 'The Gallery Cafe',
      romanticMessage: 'That moment still lives in my heart ❤️'
    },
    {
      question: 'My favorite memory with you is ________.',
      type: 'fill-blank',
      correctAnswer: '', // Will be set by user
      romanticMessage: 'Knowing this memory matters to you…\nmeans everything to me 🥹❤️'
    },
    {
      question: 'Where is our daily tea spot with so many memories?',
      type: 'mcq',
      options: [
        'Badam Doodh',
        'Random café',
        'Anywhere with you',
        'Wherever we talk too much 😄'
      ],
      correctAnswer: 'Badam Doodh',
      romanticMessage: 'So many talks…\nso many laughs…\nit always felt like home.'
    },
    {
      question: 'Our honeymoon destination will be ________.',
      type: 'mcq',
      options: [
        'Down South',
        'Colombo',
        'Kandy',
        'Anywhere with you ❤️'
      ],
      correctAnswer: 'Down South',
      romanticMessage: 'I can already imagine us there… together ❤️'
    },
    {
      question: 'How many kids do you want with me? 👶❤️',
      type: 'mcq',
      options: [
        '😌 One… so we can spoil them',
        '😍 Two… one like you, one like me',
        '😂 Three… chaos but cute',
        '🤭 However many you want'
      ],
      correctAnswer: '😍 Two… one like you, one like me',
      romanticMessage: 'That future sounds perfect with you 🥹'
    },
    {
      question: 'How much do you love me?',
      type: 'rating-scale',
      romanticMessage: 'I feel the same… and even more ❤️',
      ratingMessages: {
        1: 'Haha, really? 😅\nI think you might need to reconsider that rating...',
        2: 'Okay, that\'s a bit low 😏\nMaybe try again?',
        3: 'Hmm, I think you can do better than that 😌',
        4: 'Getting warmer! But I know you love me more than that 💕',
        5: 'Halfway there! But I feel like it should be higher 🥹',
        6: 'That\'s sweet! But I think your heart says more ❤️',
        7: 'I\'m flattered! But I know you love me even more 💖',
        8: 'Now we\'re talking! That sounds more like it 🥹❤️',
        9: 'Almost perfect! Just one more... 💕',
        10: 'Perfect! That\'s exactly how I feel about you too 🥹❤️\nI love you more than words can express, Babu.'
      }
    }
  ]
};
