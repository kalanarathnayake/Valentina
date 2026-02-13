import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-valentine-question',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <!-- Background music continues -->
      <audio #backgroundMusic [src]="musicSrc" loop autoplay *ngIf="musicSrc" (loadeddata)="playMusic()"></audio>
      
      <div class="content fade-in">
        <div class="question-section">
          <h1 class="romantic-text main-question">Will you be my Valentine? 💕</h1>
          <p class="sub-text" *ngIf="!answered">Please say yes... 🥹</p>
          <p class="sub-text success" *ngIf="answered">Yay! I'm so happy! 🥹❤️</p>
        </div>

        <div class="buttons-container" *ngIf="!answered">
          <button 
            class="romantic-button yes-button"
            (click)="handleYes()">
            Yes! ❤️
          </button>
          
          <button 
            #noButton
            class="romantic-button no-button"
            [class.moved]="noButtonMoved"
            [style.left.px]="buttonPosition.x"
            [style.top.px]="buttonPosition.y"
            [style.transform]="'scale(' + buttonScale + ')'"
            [style.transition]="'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'"
            (mouseenter)="handleNo()">
            No 😢
          </button>
        </div>

        <div class="celebration" *ngIf="answered">
          <div class="hearts-celebration">
            <span *ngFor="let heart of celebrationHearts" 
                  class="celebration-heart"
                  [style.left.%]="heart.left"
                  [style.animation-delay.s]="heart.delay">💕</span>
          </div>
          <button 
            class="romantic-button continue-button"
            (click)="continueToReveal()">
            See Your Surprise 🎁
          </button>
        </div>
      </div>

      <div class="floating-hearts">
        <span *ngFor="let heart of floatingHearts" 
              class="floating-heart"
              [style.left.%]="heart.left"
              [style.animation-delay.s]="heart.delay">💖</span>
      </div>
    </div>
  `,
  styles: [`
    .container {
      position: relative;
      overflow: hidden;
      min-height: 100vh;
      background: linear-gradient(135deg, #ffe0ec 0%, #ffc0d9 30%, #ff9ec5 60%, #ff6b9d 100%);
      background-size: 400% 400%;
      animation: gradientShift 15s ease infinite;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
    }

    @keyframes gradientShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }

    .content {
      text-align: center;
      max-width: 600px;
      width: 100%;
      z-index: 10;
      position: relative;
      animation: contentFadeIn 1s ease-out;
    }

    @keyframes contentFadeIn {
      from {
        opacity: 0;
        transform: scale(0.9) translateY(30px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    .question-section {
      margin-bottom: 50px;
      animation: questionPulse 3s ease-in-out infinite;
    }

    @keyframes questionPulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.02);
      }
    }

    .main-question {
      font-size: 48px;
      color: var(--primary-red);
      margin-bottom: 20px;
      font-weight: 700;
      text-shadow: 0 2px 15px rgba(255, 107, 157, 0.4);
      animation: questionGlow 3s ease-in-out infinite;
    }

    @keyframes questionGlow {
      0%, 100% {
        text-shadow: 0 2px 15px rgba(255, 107, 157, 0.4);
      }
      50% {
        text-shadow: 0 4px 25px rgba(255, 107, 157, 0.6);
      }
    }

    .sub-text {
      font-size: 24px;
      color: var(--text-dark);
      font-style: italic;
      animation: fadeIn 1s ease-out 0.5s both;
    }

    .sub-text.success {
      color: var(--primary-red);
      font-weight: 600;
      font-size: 28px;
      animation: successBounce 0.8s ease-out;
    }

    @keyframes successBounce {
      0% {
        opacity: 0;
        transform: scale(0.5) translateY(20px);
      }
      50% {
        transform: scale(1.1) translateY(-10px);
      }
      100% {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .buttons-container {
      display: flex;
      gap: 30px;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 40px;
    }

    .yes-button {
      padding: 20px 50px;
      font-size: 22px;
      animation: yesButtonBounce 1s ease-out 0.8s both;
      box-shadow: 0 10px 30px rgba(255, 107, 157, 0.5);
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @keyframes yesButtonBounce {
      0% {
        opacity: 0;
        transform: translateY(30px) scale(0.8);
      }
      60% {
        transform: translateY(-5px) scale(1.05);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .yes-button:hover {
      transform: translateY(-5px) scale(1.1);
      box-shadow: 0 15px 40px rgba(255, 107, 157, 0.7);
      animation: yesButtonPulse 1.5s ease-in-out infinite;
    }

    @keyframes yesButtonPulse {
      0%, 100% {
        transform: translateY(-5px) scale(1.1);
      }
      50% {
        transform: translateY(-8px) scale(1.15);
      }
    }

    .no-button {
      padding: 20px 50px;
      font-size: 22px;
      background: linear-gradient(135deg, #ffb3d1, #ff9ec5);
      animation: noButtonBounce 1s ease-out 1s forwards;
      box-shadow: 0 10px 30px rgba(255, 77, 122, 0.4);
      transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
      position: relative;
    }
    
    .no-button.moved {
      animation: none !important;
    }

    @keyframes noButtonBounce {
      0% {
        opacity: 0;
        transform: translateY(30px) scale(0.8);
      }
      60% {
        transform: translateY(-5px) scale(1.05);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .no-button:hover:not(.moved) {
      transform: translateY(-3px) scale(1.05) !important;
      box-shadow: 0 12px 35px rgba(255, 77, 122, 0.5);
    }

    .no-button.moved {
      position: fixed;
      transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), left 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease !important;
      box-shadow: 0 15px 40px rgba(255, 107, 157, 0.6);
      z-index: 1000;
      margin: 0;
      animation: none !important;
    }
    
    .no-button.moved[style*="transform"] {
      transform: var(--button-transform, scale(1)) !important;
    }

    .celebration {
      animation: celebrationFadeIn 1s ease-out;
      margin-top: 40px;
    }

    @keyframes celebrationFadeIn {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .hearts-celebration {
      position: relative;
      height: 200px;
      margin-bottom: 30px;
    }

    .celebration-heart {
      position: absolute;
      font-size: 40px;
      animation: celebrationHeartFloat 3s ease-out forwards;
      pointer-events: none;
      filter: drop-shadow(0 4px 8px rgba(255, 107, 157, 0.5));
    }

    @keyframes celebrationHeartFloat {
      0% {
        transform: translateY(0) scale(0) rotate(0deg);
        opacity: 1;
      }
      50% {
        transform: translateY(-50px) scale(1.2) rotate(180deg);
        opacity: 1;
      }
      100% {
        transform: translateY(-150px) scale(0.8) rotate(360deg);
        opacity: 0;
      }
    }

    .continue-button {
      margin-top: 30px;
      padding: 20px 50px;
      font-size: 22px;
      animation: continueButtonPulse 2s ease-in-out infinite;
      box-shadow: 0 12px 35px rgba(255, 107, 157, 0.6);
    }

    @keyframes continueButtonPulse {
      0%, 100% {
        transform: scale(1);
        box-shadow: 0 12px 35px rgba(255, 107, 157, 0.6);
      }
      50% {
        transform: scale(1.05);
        box-shadow: 0 18px 45px rgba(255, 107, 157, 0.8);
      }
    }

    .continue-button:hover {
      transform: translateY(-5px) scale(1.1);
      box-shadow: 0 20px 50px rgba(255, 107, 157, 0.9);
    }

    .floating-hearts {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }

    .floating-heart {
      position: absolute;
      font-size: 28px;
      opacity: 0.5;
      animation: floatHeart 8s ease-in-out infinite;
      filter: drop-shadow(0 2px 4px rgba(255, 107, 157, 0.3));
    }

    @keyframes floatHeart {
      0%, 100% {
        transform: translateY(0) translateX(0) rotate(0deg);
        opacity: 0.5;
      }
      25% {
        transform: translateY(-30px) translateX(15px) rotate(10deg);
        opacity: 0.7;
      }
      50% {
        transform: translateY(-60px) translateX(-10px) rotate(-10deg);
        opacity: 0.6;
      }
      75% {
        transform: translateY(-30px) translateX(-15px) rotate(5deg);
        opacity: 0.7;
      }
    }

    @media (max-width: 768px) {
      .main-question {
        font-size: 36px;
      }

      .sub-text {
        font-size: 20px;
      }

      .sub-text.success {
        font-size: 24px;
      }

      .buttons-container {
        flex-direction: column;
        gap: 20px;
      }

      .yes-button,
      .no-button {
        width: 100%;
        max-width: 300px;
      }
    }
  `]
})
export class ValentineQuestionComponent implements OnInit {
  @ViewChild('noButton') noButton?: ElementRef<HTMLButtonElement>;
  @ViewChild('backgroundMusic') backgroundMusic?: ElementRef<HTMLAudioElement>;
  
  musicSrc = '/assets/music/sinhanada.net-Ehema-Baluwama-Yasas-Medagedara.mp3';
  musicPlaying = false;
  
  answered = false;
  noButtonMoved = false;
  buttonPosition = { x: 0, y: 0 };
  buttonScale = 1;
  hoverCount = 0;
  floatingHearts: Array<{ left: number; delay: number }> = [];
  celebrationHearts: Array<{ left: number; delay: number }> = [];

  constructor(private router: Router) {}

  ngOnInit() {
    // Create floating hearts
    for (let i = 0; i < 20; i++) {
      this.floatingHearts.push({
        left: Math.random() * 100,
        delay: Math.random() * 6
      });
    }

    // Check if music was playing (stored in sessionStorage)
    const wasPlaying = sessionStorage.getItem('musicPlaying') === 'true';
    const savedMusicSrc = sessionStorage.getItem('musicSrc');
    
    if (wasPlaying && savedMusicSrc) {
      this.musicSrc = savedMusicSrc;
      this.musicPlaying = true;
      setTimeout(() => this.playMusic(), 200);
    }
  }

  playMusic() {
    if (this.backgroundMusic?.nativeElement && this.musicPlaying) {
      const audio = this.backgroundMusic.nativeElement;
      audio.volume = 0.5;
      audio.play().catch((error) => {
        console.log('Music autoplay prevented, will play on user interaction');
      });
    }
  }

  handleYes() {
    // Try to play music if it was blocked
    if (this.musicPlaying && this.backgroundMusic?.nativeElement) {
      const audio = this.backgroundMusic.nativeElement;
      if (audio.paused) {
        audio.play().catch(() => {});
      }
    }

    this.answered = true;
    this.createCelebrationHearts();
  }

  handleNo() {
    // Try to play music if it was blocked
    if (this.musicPlaying && this.backgroundMusic?.nativeElement) {
      const audio = this.backgroundMusic.nativeElement;
      if (audio.paused) {
        audio.play().catch(() => {});
      }
    }

    // Increment hover count and decrease scale
    this.hoverCount++;
    // Decrease scale by 0.1 each time, but don't go below 0.3
    this.buttonScale = Math.max(0.3, 1 - (this.hoverCount * 0.1));
    
    // Force Angular to detect the change
    setTimeout(() => {
      if (this.noButton?.nativeElement) {
        this.noButton.nativeElement.style.setProperty('transform', `scale(${this.buttonScale})`, 'important');
      }
    }, 0);
    
    // Always move the button when hovered
    this.noButtonMoved = true;
    
    // Get button dimensions (account for current scale)
    const button = this.noButton?.nativeElement;
    if (!button) return;
    
    const buttonRect = button.getBoundingClientRect();
    const buttonWidth = buttonRect.width;
    const buttonHeight = buttonRect.height;
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate safe bounds
    const padding = 20;
    const minX = padding;
    const maxX = viewportWidth - buttonWidth - padding;
    const minY = padding;
    const maxY = viewportHeight - buttonHeight - padding;
    
    // Ensure bounds are valid
    const safeMaxX = Math.max(minX, maxX);
    const safeMaxY = Math.max(minY, maxY);
    
    // Generate random position within safe bounds
    const randomX = Math.random() * (safeMaxX - minX) + minX;
    const randomY = Math.random() * (safeMaxY - minY) + minY;
    
    this.buttonPosition = {
      x: randomX,
      y: randomY
    };
  }

  createCelebrationHearts() {
    // Create celebration hearts
    for (let i = 0; i < 15; i++) {
      this.celebrationHearts.push({
        left: Math.random() * 100,
        delay: i * 0.1
      });
    }
  }

  continueToReveal() {
    // Try to play music if it was blocked
    if (this.musicPlaying && this.backgroundMusic?.nativeElement) {
      const audio = this.backgroundMusic.nativeElement;
      if (audio.paused) {
        audio.play().catch(() => {});
      }
    }

    this.router.navigate(['/reveal']);
  }
}
