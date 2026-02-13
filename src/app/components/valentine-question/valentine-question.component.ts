import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-valentine-question',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./valentine-question.component.css'],
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
            [style.transform]="'scale(' + yesButtonScale + ')'"
            [style.transition]="'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'"
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
  `
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

  get yesButtonScale(): number {
    // When no button gets smaller, yes button gets bigger
    // Inverse relationship: when buttonScale = 1, yesButtonScale = 1
    // When buttonScale = 0.3, yesButtonScale = 1.84
    return 1 + (1 - this.buttonScale) * 1.2;
  }

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
