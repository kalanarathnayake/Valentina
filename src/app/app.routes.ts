import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/landing/landing.component').then(m => m.LandingComponent)
  },
  {
    path: 'transition',
    loadComponent: () => import('./components/transition/transition.component').then(m => m.TransitionComponent)
  },
  {
    path: 'quiz',
    loadComponent: () => import('./components/quiz/quiz.component').then(m => m.QuizComponent)
  },
  {
    path: 'final-lock',
    loadComponent: () => import('./components/final-lock/final-lock.component').then(m => m.FinalLockComponent)
  },
  {
    path: 'valentine-question',
    loadComponent: () => import('./components/valentine-question/valentine-question.component').then(m => m.ValentineQuestionComponent)
  },
  {
    path: 'reveal',
    loadComponent: () => import('./components/reveal/reveal.component').then(m => m.RevealComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
