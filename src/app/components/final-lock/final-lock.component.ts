import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-final-lock',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <!-- Background music continues from quiz -->
      <audio #backgroundMusic [src]="musicSrc" loop autoplay *ngIf="musicSrc" (loadeddata)="playMusic()"></audio>
      
      <div class="content fade-in">
        <h2 class="romantic-text message">Okay Babu…</h2>
        <p class="sub-message">You remember us too well 🥹❤️</p>
        <p class="sub-message">One last thing…</p>

        <div class="interaction-container">
          <!-- Hold Button Option -->
          <div class="option-section">
            <p class="instruction">Hold this button for 10 seconds</p>
            <button 
              class="romantic-button hold-button"
              (mousedown)="startHolding()"
              (mouseup)="stopHolding()"
              (mouseleave)="stopHolding()"
              (touchstart)="startHolding()"
              (touchend)="stopHolding()"
              [disabled]="unlocked">
              {{ getHoldButtonText() }}
            </button>
            <div class="progress-bar" *ngIf="isHolding">
              <div class="progress-fill" [style.width.%]="holdProgress"></div>
            </div>
          </div>
        </div>

        <button 
          *ngIf="unlocked"
          class="romantic-button reveal-button fade-in"
          (click)="reveal()">
          See Your Surprise 🎁
        </button>
      </div>

      <div class="hearts-container" *ngIf="unlocked">
        <span *ngFor="let heart of hearts" class="heart-particle" [style.left.%]="heart.left" [style.animation-delay.s]="heart.delay">💕</span>
      </div>
    </div>
  `,
  styles: [`
    .container {
      position: relative;
      overflow: hidden;
      min-height: 100vh;
      background: linear-gradient(135deg, #ffe0ec 0%, #ffc0d9 50%, #ff9ec5 100%);
      background-size: 400% 400%;
      animation: gradientShift 12s ease infinite;
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
      max-width: 500px;
      width: 100%;
      z-index: 10;
      position: relative;
      animation: fadeInScale 0.8s ease-out;
    }

    @keyframes fadeInScale {
      from {
        opacity: 0;
        transform: scale(0.95) translateY(20px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    .message {
      font-size: 42px;
      color: var(--primary-red);
      margin-bottom: 20px;
      font-weight: 700;
      text-shadow: 0 2px 10px rgba(255, 107, 157, 0.3);
      animation: titleGlow 3s ease-in-out infinite;
    }

    @keyframes titleGlow {
      0%, 100% { text-shadow: 0 2px 10px rgba(255, 107, 157, 0.3); }
      50% { text-shadow: 0 2px 20px rgba(255, 107, 157, 0.5); }
    }

    .sub-message {
      font-size: 24px;
      color: var(--text-dark);
      margin-bottom: 45px;
      font-style: italic;
      animation: fadeIn 1s ease-out 0.3s both;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .interaction-container {
      margin: 40px 0;
    }

    .option-section {
      margin: 30px 0;
    }

    .instruction {
      font-size: 18px;
      color: var(--text-dark);
      margin-bottom: 15px;
      font-weight: 500;
    }

    .hold-button {
      width: 100%;
      max-width: 320px;
      margin: 0 auto;
      display: block;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: 0 8px 25px rgba(255, 107, 157, 0.4);
      position: relative;
      overflow: hidden;
    }

    .hold-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transition: left 0.5s;
    }

    .hold-button:hover:not(:disabled)::before {
      left: 100%;
    }

    .hold-button:hover:not(:disabled) {
      transform: translateY(-3px) scale(1.03);
      box-shadow: 0 12px 35px rgba(255, 107, 157, 0.5);
    }

    .hold-button:active:not(:disabled) {
      transform: translateY(-1px) scale(1.01);
    }

    .hold-button:disabled {
      opacity: 0.8;
      cursor: not-allowed;
    }

    .progress-bar {
      width: 100%;
      max-width: 320px;
      height: 12px;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 15px;
      margin: 20px auto;
      overflow: hidden;
      box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
      position: relative;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--primary-red), var(--primary-pink), var(--primary-red));
      background-size: 200% 100%;
      border-radius: 15px;
      transition: width 0.1s linear;
      animation: progressShine 2s linear infinite;
      box-shadow: 0 0 15px rgba(255, 107, 157, 0.6);
      position: relative;
    }

    .progress-fill::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
      animation: progressGlow 1.5s ease-in-out infinite;
    }

    @keyframes progressShine {
      0% { background-position: 0% 50%; }
      100% { background-position: 200% 50%; }
    }

    @keyframes progressGlow {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }


    .reveal-button {
      margin-top: 40px;
      animation: revealPulse 2s ease-in-out infinite;
      box-shadow: 0 10px 30px rgba(255, 107, 157, 0.5);
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @keyframes revealPulse {
      0%, 100% {
        transform: scale(1);
        box-shadow: 0 10px 30px rgba(255, 107, 157, 0.5);
      }
      50% {
        transform: scale(1.05);
        box-shadow: 0 15px 40px rgba(255, 107, 157, 0.7);
      }
    }

    .reveal-button:hover {
      transform: translateY(-5px) scale(1.08);
      box-shadow: 0 18px 45px rgba(255, 107, 157, 0.8);
    }

    .hearts-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }

    .heart-particle {
      position: absolute;
      font-size: 24px;
      animation: floatUp 3s ease-out forwards;
    }

    @keyframes floatUp {
      0% {
        transform: translateY(0) scale(0);
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) scale(1);
        opacity: 0;
      }
    }

    @media (max-width: 768px) {
      .message {
        font-size: 28px;
      }

      .sub-message {
        font-size: 18px;
      }

      .instruction {
        font-size: 16px;
      }
    }
  `]
})
export class FinalLockComponent implements OnInit, OnDestroy {
  @ViewChild('backgroundMusic') backgroundMusic?: ElementRef<HTMLAudioElement>;
  
  musicSrc = '/assets/music/sinhanada.net-Ehema-Baluwama-Yasas-Medagedara.mp3';
  musicPlaying = false;
  
  isHolding = false;
  holdProgress = 0;
  holdInterval: any;
  unlocked = false;
  hearts: Array<{ left: number; delay: number }> = [];

  ngOnInit() {
    // Create heart particles
    for (let i = 0; i < 20; i++) {
      this.hearts.push({
        left: Math.random() * 100,
        delay: Math.random() * 2
      });
    }
    
    // Check if music was playing from quiz (stored in sessionStorage)
    const wasPlaying = sessionStorage.getItem('musicPlaying') === 'true';
    const savedMusicSrc = sessionStorage.getItem('musicSrc');
    
    if (wasPlaying && savedMusicSrc) {
      this.musicSrc = savedMusicSrc;
      this.musicPlaying = true;
      // Small delay to ensure audio element is ready
      setTimeout(() => this.playMusic(), 200);
    }
  }
  
  playMusic() {
    if (this.backgroundMusic?.nativeElement && this.musicPlaying) {
      const audio = this.backgroundMusic.nativeElement;
      audio.volume = 0.5;
      
      // Try to play, catch autoplay restrictions
      audio.play().catch((error) => {
        console.log('Music autoplay prevented, will play on user interaction');
        // Music will play when user interacts (clicks button, types, etc.)
      });
    }
  }
  
  // Ensure music continues when user interacts
  startHolding() {
    // Try to play music if it was blocked
    if (this.musicPlaying && this.backgroundMusic?.nativeElement) {
      const audio = this.backgroundMusic.nativeElement;
      if (audio.paused) {
        audio.play().catch(() => {});
      }
    }
    
    if (this.unlocked) return;
    
    this.isHolding = true;
    this.holdProgress = 0;
    
    this.holdInterval = setInterval(() => {
      this.holdProgress += 1;
      if (this.holdProgress >= 100) {
        this.unlock();
      }
    }, 100);
  }
  

  ngOnDestroy() {
    this.stopHolding();
  }

  stopHolding() {
    if (this.holdInterval) {
      clearInterval(this.holdInterval);
      this.holdInterval = null;
    }
    this.isHolding = false;
    if (!this.unlocked) {
      this.holdProgress = 0;
    }
  }

  getHoldButtonText(): string {
    if (this.unlocked) {
      return 'Unlocked! 💖';
    }
    if (this.isHolding) {
      return `Hold... ${this.holdProgress}%`;
    }
    return 'Hold Me 💕';
  }

  unlock() {
    this.unlocked = true;
    this.stopHolding();
    this.createHeartParticles();
  }

  createHeartParticles() {
    // Trigger heart particles animation
    const hearts = document.querySelectorAll('.heart-particle');
    hearts.forEach((heart, i) => {
      setTimeout(() => {
        (heart as HTMLElement).style.animation = 'floatUp 3s ease-out forwards';
      }, i * 100);
    });
  }

  reveal() {
    this.router.navigate(['/valentine-question']);
  }

  constructor(private router: Router) {}
}
