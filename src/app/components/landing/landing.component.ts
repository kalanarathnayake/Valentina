import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <div class="content fade-in">
        <h1 class="romantic-text main-title">Hey Babu ❤️</h1>
        <p class="message">I made something just for you…</p>
        <p class="message tease">but I'm not giving it to you yet 😌</p>
        
        <button 
          #giftButton
          class="romantic-button gift-button"
          [class.moved]="clickCount > 0"
          [style.left.px]="buttonPosition.x"
          [style.top.px]="buttonPosition.y"
          (click)="handleButtonClick()">
          {{ clickCount === 0 ? 'Unlock my gift 🎁' : 'Haha nope 😏 not that easy.' }}
        </button>
      </div>
      
      <div class="hearts-background">
        <span *ngFor="let heart of hearts" class="heart-float" [style.left.%]="heart.left" [style.animation-delay.s]="heart.delay">💕</span>
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
    }

    @keyframes gradientShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }

    .content {
      text-align: center;
      z-index: 10;
      position: relative;
      padding: 60px 20px;
      animation: fadeInUp 1s ease-out;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .main-title {
      font-size: 52px;
      color: var(--primary-red);
      margin-bottom: 25px;
      font-weight: 700;
      text-shadow: 0 2px 10px rgba(255, 107, 157, 0.3);
      animation: titlePulse 2s ease-in-out infinite;
    }

    @keyframes titlePulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.02); }
    }

    .message {
      font-size: 26px;
      color: var(--text-dark);
      margin: 20px 0;
      font-weight: 400;
      animation: fadeIn 1.2s ease-out 0.3s both;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .tease {
      font-size: 22px;
      color: var(--dark-pink);
      font-style: italic;
      animation: fadeIn 1.2s ease-out 0.6s both;
      transform: translateY(10px);
    }

    .gift-button {
      margin-top: 50px;
      position: relative;
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      animation: buttonBounce 1.5s ease-out 0.9s both;
      box-shadow: 0 8px 25px rgba(255, 107, 157, 0.4);
    }

    @keyframes buttonBounce {
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

    .gift-button:hover:not(.moved) {
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 12px 35px rgba(255, 107, 157, 0.5);
    }

    .gift-button:active:not(.moved) {
      transform: translateY(-1px) scale(1.02);
    }

    .gift-button.moved {
      position: fixed;
      transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      animation: buttonShake 0.5s ease;
      box-shadow: 0 15px 40px rgba(255, 107, 157, 0.6);
      z-index: 1000;
      margin: 0;
    }

    @keyframes buttonShake {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(-5deg) scale(1.1); }
      75% { transform: rotate(5deg) scale(1.1); }
    }

    .hearts-background {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }

    .heart-float {
      position: absolute;
      font-size: 24px;
      opacity: 0.4;
      animation: float 8s ease-in-out infinite;
      filter: drop-shadow(0 2px 4px rgba(255, 107, 157, 0.3));
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0) translateX(0) rotate(0deg);
        opacity: 0.4;
      }
      25% {
        transform: translateY(-20px) translateX(10px) rotate(5deg);
        opacity: 0.6;
      }
      50% {
        transform: translateY(-40px) translateX(-5px) rotate(-5deg);
        opacity: 0.5;
      }
      75% {
        transform: translateY(-20px) translateX(-10px) rotate(3deg);
        opacity: 0.6;
      }
    }

    @media (max-width: 768px) {
      .main-title {
        font-size: 38px;
      }

      .message {
        font-size: 22px;
      }

      .tease {
        font-size: 18px;
      }

      .content {
        padding: 40px 20px;
      }
    }
  `]
})
export class LandingComponent implements OnInit, AfterViewInit {
  @ViewChild('giftButton') giftButton?: ElementRef<HTMLButtonElement>;
  
  clickCount = 0;
  buttonPosition = { x: 0, y: 0 };
  hearts: Array<{ left: number; delay: number }> = [];

  constructor(private router: Router) {}

  ngOnInit() {
    // Create floating hearts
    for (let i = 0; i < 15; i++) {
      this.hearts.push({
        left: Math.random() * 100,
        delay: Math.random() * 6
      });
    }
  }

  ngAfterViewInit() {
    // Ensure button is ready
  }

  handleButtonClick() {
    if (this.clickCount === 0) {
      // First click - move button
      this.clickCount++;
      
      // Get button dimensions
      const button = this.giftButton?.nativeElement;
      if (!button) return;
      
      const buttonRect = button.getBoundingClientRect();
      const buttonWidth = buttonRect.width;
      const buttonHeight = buttonRect.height;
      
      // Get viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Calculate safe bounds (with padding to keep button fully visible)
      const padding = 20; // Minimum padding from edges
      const minX = padding;
      const maxX = viewportWidth - buttonWidth - padding;
      const minY = padding;
      const maxY = viewportHeight - buttonHeight - padding;
      
      // Ensure bounds are valid (handle very small screens)
      const safeMaxX = Math.max(minX, maxX);
      const safeMaxY = Math.max(minY, maxY);
      
      // Generate random position within safe bounds
      const randomX = Math.random() * (safeMaxX - minX) + minX;
      const randomY = Math.random() * (safeMaxY - minY) + minY;
      
      this.buttonPosition = {
        x: randomX,
        y: randomY
      };
    } else if (this.clickCount === 1) {
      // Second click - navigate
      this.router.navigate(['/transition']);
    }
  }
}
