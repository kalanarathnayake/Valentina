import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QUIZ_CONFIG, QuestionConfig } from '../../config/quiz-config';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./quiz.component.css'],
  template: `
    <div class="container">

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
        <!-- Progress Header for All Question Types -->
        <div class="progress-header">
          <div class="progress-bar-container">
            <div class="progress-bar-fill" [style.width.%]="((currentQuestionIndex + 1) / questions.length) * 100"></div>
          </div>
          <p class="progress-text">Question {{ currentQuestionIndex + 1 }} / {{ questions.length }}</p>
        </div>

        <!-- MCQ Questions - New Design -->
        <div class="mcq-card" *ngIf="currentQuestion.type === 'mcq'">
          <h2 class="question-title">{{ currentQuestion.question }}</h2>
          <p class="question-subtitle">Pick one... I'll remember 😊</p>
          
          <div class="options-container">
            <button
              *ngFor="let option of currentQuestion.options; let i = index"
              class="option-button"
              [class.selected]="selectedOption === i"
              [disabled]="showMessage"
              (click)="selectOption(i)">
              <span class="option-emoji">{{ getOptionEmoji(i) }}</span>
              <span class="option-text">{{ option }}</span>
              <span class="option-arrow">→</span>
              <span class="sparkles" *ngIf="selectedOption === i">✨✨✨</span>
            </button>
          </div>

          <button 
            class="next-button" 
            [disabled]="selectedOption === null || showMessage"
            (click)="checkAnswer()"
            *ngIf="selectedOption !== null && !showMessage">
            Next →
          </button>
        </div>

        <!-- Footer Message for MCQ and Fill-blank -->
        <p class="footer-message" *ngIf="currentQuestion.type === 'mcq' || currentQuestion.type === 'fill-blank'">No wrong answers. Only us.</p>

        <!-- Fill-in-the-blank Questions -->
        <div class="fill-blank-card" *ngIf="currentQuestion.type === 'fill-blank'">
          <h2 class="question-title">{{ currentQuestion.question }}</h2>
          <p class="question-subtitle">Type your answer... 💕</p>
          
          <div class="input-container">
            <input 
              type="text"
              class="romantic-input"
              [(ngModel)]="userAnswer"
              (keyup.enter)="checkAnswer()"
              [placeholder]="getPlaceholder()"
              [disabled]="false"
              autofocus>
            <button class="submit-button" (click)="checkAnswer()" [disabled]="!userAnswer.trim() || (showMessage && isCorrect)">
              Submit Answer ❤️
            </button>
            <p class="hint-text" *ngIf="currentQuestion.question.includes('honeymoon') && !showMessage">
              💡 Hint: It's a beautiful place in Sri Lanka...
            </p>
          </div>
        </div>

        <!-- Rating Scale Questions -->
        <div class="rating-card" *ngIf="currentQuestion.type === 'rating-scale'">
          <h2 class="question-title">{{ currentQuestion.question }}</h2>
          <p class="question-subtitle">Rate from 1 to 10 💕</p>
          
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
            class="submit-button" 
            (click)="checkAnswer()" 
            [disabled]="!selectedRating || showMessage"
            *ngIf="selectedRating">
            Submit My Rating ❤️
          </button>
        </div>

        <!-- Footer Message for Rating Scale -->
        <p class="footer-message" *ngIf="currentQuestion.type === 'rating-scale'">No wrong answers. Only us.</p>

        <!-- Open-ended Questions -->
        <div class="open-ended-card" *ngIf="currentQuestion.type === 'open-ended'">
          <h2 class="question-title">{{ currentQuestion.question }}</h2>
          <p class="question-subtitle">Tell me anything... 💕</p>
          
          <div class="input-container">
            <input 
              type="text"
              class="romantic-input"
              [(ngModel)]="userAnswer"
              (keyup.enter)="checkAnswer()"
              placeholder="Type your answer..."
              [disabled]="false"
              autofocus>
            <button class="submit-button" (click)="checkAnswer()" [disabled]="!userAnswer.trim()">
              Submit Answer ❤️
            </button>
          </div>
        </div>

        <!-- Footer Message for Open-ended -->
        <p class="footer-message" *ngIf="currentQuestion.type === 'open-ended'">No wrong answers. Only us.</p>

      </div>

      <!-- Message Popup -->
      <div class="message-popup-overlay" *ngIf="showMessage" (click)="closeMessagePopup()">
        <div class="message-popup" (click)="$event.stopPropagation()">
          <p class="popup-message" [class.error]="!isCorrect">
            {{ message }}
          </p>
          <button class="popup-close-button" (click)="closeMessagePopup()">Continue ❤️</button>
        </div>
      </div>

      <div *ngIf="allQuestionsAnswered" class="completion-message fade-in">
        <h2 class="romantic-text">You remembered everything! 🥹❤️</h2>
        <button class="romantic-button" (click)="proceedToFinal()">
          Continue 💖
        </button>
      </div>
    </div>
  `
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
    // Don't auto-submit for MCQ - user clicks Next button
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
    } else {
      // Provide helpful hints for specific questions
      if (question.type === 'fill-blank' && question.question.includes('honeymoon')) {
        this.message = 'Hmm, try again! 💕\nHint: Think about where we want to go in Sri Lanka...';
      } else {
        this.message = 'Hmm, try again! 💕 You\'ve got this!';
      }
      // For incorrect answers, popup will close and allow retry
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

  closeMessagePopup() {
    this.showMessage = false;
    // Auto-move to next question if correct, or allow retry if incorrect
    if (this.isCorrect || this.currentQuestion.type === 'open-ended' || this.currentQuestion.type === 'rating-scale') {
      // Move to next question after a short delay
      setTimeout(() => {
        this.moveToNextQuestion();
      }, 300);
    } else {
      // For incorrect answers, reset selection for MCQ to allow retry
      if (this.currentQuestion.type === 'mcq') {
        this.selectedOption = null;
      }
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
