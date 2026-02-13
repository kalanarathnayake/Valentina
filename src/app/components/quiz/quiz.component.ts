import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QUIZ_CONFIG, QuestionConfig } from '../../config/quiz-config';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="progress-container">
        <span 
          *ngFor="let heart of progressHearts; let i = index"
          class="heart progress-heart"
          [class.filled]="i < correctAnswers"
          [class.heart-beat]="i === correctAnswers - 1 && justAnswered">
          {{ i < correctAnswers ? '❤️' : '🤍' }}
        </span>
      </div>

      <!-- Random popup -->
      <div *ngIf="showRandomPopup" class="random-popup fade-in-popup">
        <p>You're doing amazing… just like always ❤️</p>
      </div>

      <!-- Music player (hidden, auto-plays) -->
      <audio #backgroundMusic 
             [src]="musicSrc" 
             loop 
             autoplay
             *ngIf="musicSrc && musicPlaying"
             (loadeddata)="playMusic()">
      </audio>

      <div class="quiz-content fade-in" *ngIf="currentQuestionIndex < questions.length">
        <h2 class="romantic-text question-text">{{ currentQuestion.question }}</h2>
        
        <!-- MCQ Questions -->
        <div class="options-container" *ngIf="currentQuestion.type === 'mcq'">
          <button
            *ngFor="let option of currentQuestion.options; let i = index"
            class="option-button"
            [class.selected]="selectedOption === i"
            [class.correct]="showMessage && isCorrect && selectedOption === i"
            [class.incorrect]="showMessage && !isCorrect && selectedOption === i"
            [disabled]="showMessage"
            (click)="selectOption(i)">
            <span class="option-emoji">{{ getOptionEmoji(i) }}</span>
            <span class="option-text">{{ option }}</span>
          </button>
        </div>

        <!-- Fill-in-the-blank Questions -->
        <div class="input-container" *ngIf="currentQuestion.type === 'fill-blank'">
          <input 
            type="text"
            class="romantic-input"
            [(ngModel)]="userAnswer"
            (keyup.enter)="checkAnswer()"
            [placeholder]="getPlaceholder()"
            [disabled]="showMessage && isCorrect"
            autofocus>
          <button class="romantic-button" (click)="checkAnswer()" [disabled]="!userAnswer.trim() || (showMessage && isCorrect)">
            Submit Answer 💕
          </button>
          <p class="hint-text" *ngIf="currentQuestion.question.includes('honeymoon') && !showMessage">
            💡 Hint: It's a beautiful place in Sri Lanka...
          </p>
        </div>

        <!-- Rating Scale Questions -->
        <div class="rating-container" *ngIf="currentQuestion.type === 'rating-scale'">
          <p class="rating-instruction">Rate from 1 to 10 💕</p>
          <div class="rating-scale">
            <button
              *ngFor="let rating of [1,2,3,4,5,6,7,8,9,10]; let i = index"
              class="rating-heart"
              [class.selected]="selectedRating === rating"
              [class.low-rating]="rating <= 3 && selectedRating === rating"
              [class.medium-rating]="rating > 3 && rating <= 7 && selectedRating === rating"
              [class.high-rating]="rating > 7 && selectedRating === rating"
              (click)="selectRating(rating)">
              <span class="heart-emoji">{{ rating <= (selectedRating || 0) ? '❤️' : '🤍' }}</span>
              <span class="rating-number">{{ rating }}</span>
            </button>
          </div>
          <p class="rating-hint" *ngIf="selectedRating">
            {{ getRatingHint(selectedRating) }}
          </p>
          <button 
            class="romantic-button" 
            (click)="checkAnswer()" 
            [disabled]="!selectedRating || showMessage"
            *ngIf="selectedRating">
            Submit My Rating 💕
          </button>
        </div>

        <!-- Open-ended Questions -->
        <div class="input-container" *ngIf="currentQuestion.type === 'open-ended'">
          <input 
            type="text"
            class="romantic-input"
            [(ngModel)]="userAnswer"
            (keyup.enter)="checkAnswer()"
            placeholder="Tell me anything..."
            autofocus>
          <button class="romantic-button" (click)="checkAnswer()" [disabled]="!userAnswer.trim()">
            Submit 💕
          </button>
        </div>

        <p *ngIf="showMessage" class="romantic-message" [class.error]="!isCorrect && currentQuestion.type !== 'open-ended'">
          {{ message }}
        </p>
      </div>

      <div *ngIf="allQuestionsAnswered" class="completion-message fade-in">
        <h2 class="romantic-text">You remembered everything! 🥹❤️</h2>
        <button class="romantic-button" (click)="proceedToFinal()">
          Continue 💖
        </button>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px;
      width: 100%;
      background: linear-gradient(135deg, rgba(255, 224, 236, 0.3) 0%, rgba(255, 192, 217, 0.3) 100%);
      border-radius: 30px;
      padding: 30px 20px;
      box-shadow: 0 10px 40px rgba(255, 107, 157, 0.15);
    }

    .progress-container {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-bottom: 40px;
      flex-wrap: wrap;
      padding: 20px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 25px;
      backdrop-filter: blur(10px);
    }

    .progress-heart {
      font-size: 36px;
      transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      filter: drop-shadow(0 2px 4px rgba(255, 107, 157, 0.2));
      animation: heartFloat 3s ease-in-out infinite;
    }

    .progress-heart.filled {
      transform: scale(1.3);
      filter: drop-shadow(0 4px 8px rgba(255, 107, 157, 0.4));
      animation: heartBeat 1.5s ease-in-out infinite;
    }

    @keyframes heartFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }

    @keyframes heartBeat {
      0%, 100% { transform: scale(1.3); }
      50% { transform: scale(1.4); }
    }

    .progress-heart.heart-beat {
      animation: heartBeatPulse 0.6s ease;
    }

    @keyframes heartBeatPulse {
      0% { transform: scale(1); }
      30% { transform: scale(1.5) rotate(5deg); }
      60% { transform: scale(1.4) rotate(-5deg); }
      100% { transform: scale(1.3); }
    }

    .quiz-content {
      text-align: center;
      width: 100%;
    }

    .question-text {
      font-size: 28px;
      color: var(--primary-red);
      margin-bottom: 30px;
      font-weight: 600;
      line-height: 1.6;
      white-space: pre-line;
    }

    .input-container {
      margin: 30px 0;
    }

    .options-container {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin: 30px 0;
      width: 100%;
    }

    .option-button {
      width: 100%;
      padding: 22px 28px;
      background: rgba(255, 255, 255, 0.95);
      border: 2px solid var(--primary-pink);
      border-radius: 25px;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      display: flex;
      align-items: center;
      gap: 15px;
      font-size: 18px;
      color: var(--text-dark);
      font-family: 'Poppins', sans-serif;
      text-align: left;
      box-shadow: 0 5px 15px rgba(255, 77, 122, 0.15);
      position: relative;
      overflow: hidden;
    }

    .option-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transition: left 0.5s;
    }

    .option-button:hover:not(:disabled)::before {
      left: 100%;
    }

    .option-button:hover:not(:disabled) {
      transform: translateY(-4px) scale(1.02);
      border-color: var(--primary-red);
      box-shadow: 0 8px 25px rgba(255, 77, 122, 0.3);
      background: rgba(255, 255, 255, 1);
    }

    .option-button:active:not(:disabled) {
      transform: translateY(-2px) scale(1);
    }

    .option-button.selected {
      background: linear-gradient(135deg, var(--soft-pink), var(--primary-pink));
      border-color: var(--primary-red);
      color: var(--text-light);
      font-weight: 600;
      box-shadow: 0 8px 25px rgba(255, 77, 122, 0.4);
      transform: scale(1.02);
      animation: selectedGlow 2s ease-in-out infinite;
    }

    @keyframes selectedGlow {
      0%, 100% { box-shadow: 0 8px 25px rgba(255, 77, 122, 0.4); }
      50% { box-shadow: 0 8px 30px rgba(255, 77, 122, 0.6); }
    }

    .option-button.correct {
      background: linear-gradient(135deg, #90EE90, #7CFC00);
      border-color: #32CD32;
      animation: correctPulse 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: 0 0 30px rgba(50, 205, 50, 0.5);
    }

    @keyframes correctPulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.08) rotate(2deg); }
      100% { transform: scale(1.05); }
    }

    .option-button.incorrect {
      background: linear-gradient(135deg, #FFB6C1, #FF69B4);
      border-color: #FF1493;
      opacity: 0.8;
      animation: incorrectShake 0.5s ease;
    }

    @keyframes incorrectShake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-8px); }
      75% { transform: translateX(8px); }
    }

    .option-button:disabled {
      cursor: not-allowed;
      opacity: 0.8;
    }

    .option-emoji {
      font-size: 24px;
      min-width: 30px;
      text-align: center;
    }

    .option-text {
      flex: 1;
    }

    @keyframes correctPulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
    }

    .romantic-message {
      margin-top: 25px;
      font-size: 20px;
      color: var(--primary-red);
      font-weight: 500;
      min-height: 40px;
      white-space: pre-line;
      line-height: 1.8;
      padding: 20px;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 20px;
      border-left: 4px solid var(--primary-red);
      animation: messageSlideIn 0.5s ease-out;
      box-shadow: 0 4px 15px rgba(255, 107, 157, 0.2);
    }

    @keyframes messageSlideIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .romantic-message.error {
      color: var(--dark-pink);
      border-left-color: var(--dark-pink);
      background: rgba(255, 192, 217, 0.3);
    }

    .completion-message {
      text-align: center;
    }

    .completion-message h2 {
      font-size: 32px;
      color: var(--primary-red);
      margin-bottom: 30px;
    }

    .random-popup {
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(255, 224, 236, 0.98));
      padding: 18px 28px;
      border-radius: 35px;
      box-shadow: 0 10px 30px rgba(255, 77, 122, 0.4);
      z-index: 1000;
      animation: slideInRight 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
      border: 2px solid rgba(255, 107, 157, 0.3);
      backdrop-filter: blur(10px);
    }

    .random-popup p {
      margin: 0;
      color: var(--primary-red);
      font-weight: 500;
      font-size: 16px;
    }

    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes fadeInPopup {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .fade-in-popup {
      animation: fadeInPopup 0.3s ease-out;
    }

    @media (max-width: 768px) {
      .question-text {
        font-size: 22px;
      }

      .progress-heart {
        font-size: 28px;
      }

      .completion-message h2 {
        font-size: 24px;
      }

      .random-popup {
        top: 10px;
        right: 10px;
        left: 10px;
        padding: 12px 20px;
      }

      .random-popup p {
        font-size: 14px;
      }

      .option-button {
        padding: 16px 20px;
        font-size: 16px;
      }

      .option-emoji {
        font-size: 20px;
        min-width: 25px;
      }
    }

    .rating-container {
      margin: 30px 0;
    }

    .rating-instruction {
      font-size: 20px;
      color: var(--primary-red);
      margin-bottom: 25px;
      font-weight: 500;
    }

    .rating-scale {
      display: flex;
      justify-content: center;
      gap: 10px;
      flex-wrap: wrap;
      margin: 30px 0;
    }

    .rating-heart {
      width: 60px;
      height: 70px;
      background: rgba(255, 255, 255, 0.9);
      border: 2px solid var(--primary-pink);
      border-radius: 15px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 5px;
      box-shadow: 0 4px 10px rgba(255, 77, 122, 0.1);
    }

    .rating-heart:hover:not(:disabled) {
      transform: translateY(-3px) scale(1.1);
      box-shadow: 0 6px 15px rgba(255, 77, 122, 0.3);
    }

    .rating-heart.selected {
      transform: scale(1.15);
      box-shadow: 0 8px 20px rgba(255, 77, 122, 0.4);
    }

    .rating-heart.low-rating {
      background: linear-gradient(135deg, #FFE0E6, #FFB6C1);
      border-color: #FF69B4;
    }

    .rating-heart.medium-rating {
      background: linear-gradient(135deg, #FFE0EC, #FF9EC5);
      border-color: #FF6B9D;
    }

    .rating-heart.high-rating {
      background: linear-gradient(135deg, #FF9EC5, #FF6B9D);
      border-color: var(--primary-red);
      animation: heartPulse 0.6s ease;
    }

    @keyframes heartPulse {
      0%, 100% {
        transform: scale(1.15);
      }
      50% {
        transform: scale(1.25);
      }
    }

    .heart-emoji {
      font-size: 28px;
      transition: all 0.3s ease;
    }

    .rating-number {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-dark);
    }

    .rating-heart.selected .rating-number {
      color: var(--text-light);
    }

    .rating-hint {
      margin-top: 20px;
      font-size: 16px;
      color: var(--primary-red);
      font-style: italic;
      min-height: 25px;
    }

    .hint-text {
      margin-top: 15px;
      font-size: 14px;
      color: var(--primary-pink);
      font-style: italic;
    }

    @media (max-width: 768px) {
      .rating-heart {
        width: 50px;
        height: 60px;
      }

      .heart-emoji {
        font-size: 24px;
      }

      .rating-number {
        font-size: 12px;
      }

      .rating-scale {
        gap: 8px;
      }
    }
  `]
})
export class QuizComponent implements OnInit {
  @ViewChild('backgroundMusic') backgroundMusic?: ElementRef<HTMLAudioElement>;
  
  questions: QuestionConfig[] = QUIZ_CONFIG.questions.map(q => ({ ...q }));
  currentQuestionIndex = 0;
  correctAnswers = 0;
  selectedOption: number | null = null;
  selectedRating: number | null = null;
  userAnswer = '';
  showMessage = false;
  message = '';
  isCorrect = false;
  justAnswered = false;
  allQuestionsAnswered = false;
  showRandomPopup = false;
  musicSrc = '';
  musicPlaying = false;

  get currentQuestion(): QuestionConfig {
    return this.questions[this.currentQuestionIndex];
  }

  get progressHearts(): number[] {
    return Array(this.questions.length).fill(0).map((_, i) => i);
  }

  ngOnInit() {
    this.loadCustomAnswers();
    this.scheduleRandomPopup();
  }

  loadCustomAnswers() {
    // Load custom answers for fill-blank questions from localStorage
    const savedAnswers = localStorage.getItem('valentineFillAnswers');
    if (savedAnswers) {
      try {
        const answers = JSON.parse(savedAnswers);
        this.questions.forEach((q, i) => {
          if (q.type === 'fill-blank' && !q.correctAnswer && answers[i]) {
            q.correctAnswer = answers[i].toLowerCase().trim();
          }
        });
      } catch (e) {
        console.warn('Could not parse saved answers');
      }
    }
  }

  scheduleRandomPopup() {
    const delay = 3000 + Math.random() * 5000;
    setTimeout(() => {
      if (this.currentQuestionIndex < this.questions.length && !this.allQuestionsAnswered) {
        this.showRandomPopup = true;
        setTimeout(() => {
          this.showRandomPopup = false;
          if (this.currentQuestionIndex < this.questions.length) {
            this.scheduleRandomPopup();
          }
        }, 3000);
      }
    }, delay);
  }

  getOptionEmoji(index: number): string {
    const emojis = ['💕', '💖', '💗', '💝'];
    return emojis[index % emojis.length];
  }

  selectOption(index: number) {
    if (this.showMessage) return;
    this.selectedOption = index;
    setTimeout(() => {
      this.checkAnswer();
    }, 300);
  }

  selectRating(rating: number) {
    if (this.showMessage) return;
    this.selectedRating = rating;
  }

  getRatingHint(rating: number): string {
    if (rating <= 3) {
      return 'Hmm, that seems a bit low... 😏';
    } else if (rating <= 7) {
      return 'That\'s sweet! But I think you can go higher 💕';
    } else {
      return 'Perfect! That sounds more like it 🥹❤️';
    }
  }

  getPlaceholder(): string {
    const question = this.currentQuestion;
    if (question.question.includes('honeymoon')) {
      return 'Type: Down South (or just "south")...';
    }
    return 'Type your answer...';
  }

  checkAnswer() {
    const question = this.currentQuestion;
    let isCorrect = false;

    if (question.type === 'mcq') {
      if (this.selectedOption === null) return;
      const selectedAnswer = question.options![this.selectedOption];
      isCorrect = selectedAnswer.toLowerCase().trim() === question.correctAnswer!.toLowerCase().trim();
    } else if (question.type === 'fill-blank') {
      if (!this.userAnswer.trim()) return;
      const userAnswerLower = this.userAnswer.toLowerCase().trim();
      const correctAnswerLower = question.correctAnswer!.toLowerCase().trim();
      
      // Remove spaces and special characters for more flexible matching
      const userAnswerNormalized = userAnswerLower.replace(/\s+/g, ' ').trim();
      const correctAnswerNormalized = correctAnswerLower.replace(/\s+/g, ' ').trim();
      
      // Check if answer contains key words (for "Down South", accept "south" or "down")
      const keyWords = correctAnswerNormalized.split(' ');
      
      // Multiple matching strategies
      isCorrect = 
        userAnswerNormalized.includes(correctAnswerNormalized) || 
        correctAnswerNormalized.includes(userAnswerNormalized) ||
        // For "down south", also accept just "south" or "down"
        (correctAnswerNormalized.includes('down') && correctAnswerNormalized.includes('south') && 
         (userAnswerNormalized.includes('south') || userAnswerNormalized.includes('down'))) ||
        // Check if all key words are present
        (keyWords.length > 1 && keyWords.every(word => word.length > 2 && userAnswerNormalized.includes(word)));
    } else if (question.type === 'rating-scale') {
      if (this.selectedRating === null) return;
      // Rating scale: always correct, but message depends on rating
      isCorrect = true;
    } else if (question.type === 'open-ended') {
      // Open-ended: always correct, just needs an answer
      if (!this.userAnswer.trim()) return;
      isCorrect = true;
    }

    this.isCorrect = isCorrect;
    this.showMessage = true;

    if (isCorrect || question.type === 'open-ended' || question.type === 'rating-scale') {
      this.correctAnswers++;
      // Set message based on question type
      if (question.type === 'rating-scale') {
        // Get message based on rating
        if (question.ratingMessages && question.ratingMessages[this.selectedRating!]) {
          this.message = question.ratingMessages[this.selectedRating!];
        } else {
          this.message = question.romanticMessage;
        }
      } else {
        this.message = question.romanticMessage;
      }
      this.justAnswered = true;

      // Trigger music if this is the song question
      if (question.triggerMusic && !this.musicPlaying) {
        this.startMusic();
      }

      setTimeout(() => {
        this.justAnswered = false;
      }, 600);

      setTimeout(() => {
        this.moveToNextQuestion();
      }, 2500);
    } else {
      // Provide helpful hints for specific questions
      if (question.type === 'fill-blank' && question.question.includes('honeymoon')) {
        this.message = 'Hmm, try again! 💕\nHint: Think about where we want to go in Sri Lanka...';
      } else {
        this.message = 'Hmm, try again! 💕 You\'ve got this!';
      }
      if (question.type === 'fill-blank') {
        // Don't clear the answer, let them try again
        // this.userAnswer = '';
      } else {
        setTimeout(() => {
          this.selectedOption = null;
          this.showMessage = false;
        }, 2000);
      }
    }
  }

  startMusic() {
    // Set the song file path
    this.musicSrc = '/assets/music/sinhanada.net-Ehema-Baluwama-Yasas-Medagedara.mp3';
    this.musicPlaying = true;
    // Save music state to sessionStorage so it continues on next page
    sessionStorage.setItem('musicPlaying', 'true');
    sessionStorage.setItem('musicSrc', this.musicSrc);
    // Music will auto-play via audio element when loaded
  }

  playMusic() {
    // Play the music when it's loaded
    if (this.backgroundMusic?.nativeElement) {
      const audio = this.backgroundMusic.nativeElement;
      audio.volume = 0.5; // Set volume to 50%
      audio.play().catch((error: any) => {
        console.log('Auto-play prevented, user interaction required');
        // Music will play on next user interaction
      });
    }
  }

  moveToNextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedOption = null;
      this.selectedRating = null;
      this.userAnswer = '';
      this.showMessage = false;
    } else {
      this.allQuestionsAnswered = true;
    }
  }

  proceedToFinal() {
    this.router.navigate(['/final-lock']);
  }

  constructor(private router: Router) {}
}
