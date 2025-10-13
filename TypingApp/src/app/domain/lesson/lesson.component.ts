import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { letterView } from '../../letterView';
import { AuthService } from '../../core/modules/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from '../../core/modules/services/lesson.service';
import { Lesson } from '../../core/modules/interfaces/lesson';
import { ProgressService } from '../../core/modules/services/progress.service';
import { LessonProgress } from '../../core/modules/interfaces/lesson-progress';
import { switchMap } from 'rxjs';
import { FingerType, Key, KeyboardLayout } from './interfaces/key';
import { UKRAINIAN_KEYBOARD } from './utils/ukrainian.keyboard';
import { ENGLISH_KEYBOARD } from './utils/english.keyboard';
import { UserManagerService } from '../../core/modules/services/user-manager.service ';

@Component({
  selector: 'app-lesson',
  standalone: false,
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css'
})
export class LessonComponent {
  lesson?: Lesson;
  @ViewChild('cursor') cursor!: ElementRef;
  @ViewChild('lessonContainer', { static: true }) lessonElement!: ElementRef;
  timer: any = null;
  gameStart: any = null;
  pauseTime = 0;
  numberOfMistake: number[] = [];
  lettersContainer: letterView[] = [];
  currentPosition: number = 0;
  interval: any;
  minutes: number = 0;
  seconds: number = 0;
  numberOfWords: number = 150;
  wordsCounter: number = 0;
  lastIndex: number = 0;
  isGameActive: boolean = false;
  elapsedTime: number = 0;
  currentExpectedLetter: string = '';
  PASS_THRESHOLD = 50;
  keyboardLayout: KeyboardLayout = [];
  description: string = '';
  isGameEnded: boolean = false;

  constructor(private userManagerService: UserManagerService, private route: ActivatedRoute,
    private lessonService: LessonService,
    private progressService: ProgressService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const lang = this.route.snapshot.paramMap.get('lang') as 'uk' | 'en';

    if (!id || (lang !== 'uk' && lang !== 'en')) {
      console.error('Invalid route parameters');
      return;
    }

    this.keyboardLayout = lang === 'uk' ? UKRAINIAN_KEYBOARD : ENGLISH_KEYBOARD;

    const lesson = this.lessonService.getLessonByIdAndLanguage(id, lang);
    this.description = lesson!.description
    if (lesson) {
      this.lesson = lesson;
      this.newGame();
    } else {
      console.error('Lesson not found');
    }
  }

  generateLessonText(keys: string[], groupCount: number = 60): letterView[] {
    const result: letterView[] = [];
    let index = 0;

    for (let i = 0; i < groupCount; i++) {
      const groupLength = Math.floor(Math.random() * 3) + 2;
      for (let j = 0; j < groupLength; j++) {
        const char = keys[Math.floor(Math.random() * keys.length)];
        result.push(new letterView(index++, char));
      }
      result.push(new letterView(index++, ' '));
    }

    return result;
  }
  fillingVariables(): void {
    this.lessonElement.nativeElement.classList.remove('over');
    this.numberOfMistake = [];
    this.lettersContainer = [];
    this.currentPosition = 0;
    this.wordsCounter = 0;
    clearInterval(this.interval);
    this.isGameActive = false;
    this.pauseTime = 0;
  }

  newGame(): void {
    this.fillingVariables();

    this.lessonElement.nativeElement.blur();

    const letters = this.generateLessonText(this.lesson!.keys, 50);
    console.log('Lesson keys:', this.lesson?.keys);
    console.log('Generated letters:', letters);
    this.lettersContainer = letters;
    this.lastIndex = letters.length - 1;

    this.updateCursorPosition();
  }
  startGameTimer(): void {
    if (!this.isGameActive) {
      this.isGameActive = true;
      this.gameStart = Date.now() - this.pauseTime;
      this.startTimer();
    }
  }

  startTimer(): void {
    this.interval = setInterval(() => {
      if (this.isGameActive) {
        this.elapsedTime = Date.now() - this.gameStart;
        this.updateTimerDisplay(this.elapsedTime);
      }
    }, 1000);
  }
  updateTimerDisplay(time: number): void {
    this.minutes = Math.floor(time / 60000);
    this.seconds = Math.floor((time % 60000) / 1000);
  }
  gameOver(resultLetterConteiner: letterView[]): void {
    clearInterval(this.timer);
    this.isGameActive = false;
    this.timer = null;
    const elapsedTime = this.gameStart ? (Date.now() - this.gameStart) : 0;
    const elapsedSeconds = Math.floor(elapsedTime / 1000);

    const wpm = Math.floor((this.currentPosition / 5) / (elapsedTime / 60000));
    const raw = Math.floor(this.currentPosition);
    const accuracy = Math.floor(((this.currentPosition - this.numberOfMistake.length) / this.currentPosition) * 100);
    const consistency = 100;

    console.log(`Game Over! Time: ${elapsedSeconds} seconds, Mistakes: ${this.numberOfMistake.length}, WPM: ${wpm}, raw${raw} ,accuracy ${accuracy} ,consistency ${consistency}`);
    if (this.userManagerService.getUser() !== null && this.currentPosition >= 5) {
      const model: LessonProgress = {
        userId: this.userManagerService.getUser()!.id,
        lessonId: this.lesson!.id,
        bestWpm: wpm,
        bestRaw: raw,
        bestAccuracy: accuracy
      };
      this.progressService.saveProgress(model)
        .pipe(
          switchMap(() =>
            this.progressService.getProgressByLessonId(model.userId, model.lessonId)
          )
        )
        .subscribe({
          next: res => {
            if (res.success && res.result.progressPercent >= this.PASS_THRESHOLD) {
              const nextId = this.lesson!.id + 1;
              this.router.navigate(['/lesson', nextId]);
            } else {
              alert(
                `Вам потрібно не менше ${this.PASS_THRESHOLD}% точності, щоб перейти далі. ` +
                `Ваш результат: ${res.result.progressPercent}%`
              );
              this.newGame();
            }
          },
          error: err => {
            console.error('Progress load failed', err);
            this.newGame();
          }
        });
    }


    const gameElement = document.getElementById('game');
    if (gameElement) {
      gameElement.classList.add('over');
    }
    this.newGame();
  }

  switchTimer(_isGameactive: boolean): void {
    if (_isGameactive === true) {
      this.focusGame();
    } else if (_isGameactive === false) {
      this.pauseTimer();
    }
  }
  pauseTimer(): void {
    if (this.isGameActive) {
      this.isGameActive = false;
      clearInterval(this.interval);
      this.pauseTime += Date.now() - this.gameStart;
    }
  }

  focusGame() {
    if (!this.isGameActive) {
      this.gameStart = Date.now();
      this.isGameActive = true;
      this.startTimer();
    }
    this.lessonElement.nativeElement.focus();

  }

  updateCursorPosition() {
    setTimeout(() => {
      const letterElements = document.getElementsByClassName('letter');
      if (letterElements.length > this.currentPosition) {
        const currentLetterElement = letterElements[this.currentPosition] as HTMLElement;
        const cursorElement = this.cursor.nativeElement;
        const parentRect = this.lessonElement.nativeElement.getBoundingClientRect();
        const rect = currentLetterElement.getBoundingClientRect();

        const top = rect.top - parentRect.top;
        const left = rect.left - parentRect.left;

        cursorElement.style.top = `${top}px`;
        cursorElement.style.left = `${left}px`;
      } else {
        console.log('Current letter element not found');
      }
    }, 0);
  }


  isLastLetter(): boolean {
    return this.currentPosition === this.lastIndex;
  }


  // highlightExpectedKey(letter: string) {
  //   const prev = document.querySelector('.key.expected');
  //   if (prev) prev.classList.remove('expected');

  //   let keyId = letter.toLowerCase();
  //   if (letter === ' ') {
  //     keyId = 'space';
  //   }

  //   const keyElement = document.getElementById(keyId);
  //   if (keyElement) keyElement.classList.add('expected');
  // }
  // getFingerClass(key: Key): string {
  //   return `finger-${key.finger}`;
  // }
  // getFingerName(finger: FingerType): string {
  //   const fingerNames = {
  //     [FingerType.LEFT_PINKY]: 'Лівий мізинець',
  //     [FingerType.LEFT_RING]: 'Лівий безіменний',
  //     [FingerType.LEFT_MIDDLE]: 'Лівий середній',
  //     [FingerType.LEFT_INDEX]: 'Лівий вказівний',
  //     [FingerType.LEFT_THUMB]: 'Лівий великий',
  //     [FingerType.RIGHT_THUMB]: 'Правий великий',
  //     [FingerType.RIGHT_INDEX]: 'Правий вказівний',
  //     [FingerType.RIGHT_MIDDLE]: 'Правий середній',
  //     [FingerType.RIGHT_RING]: 'Правий безіменний',
  //     [FingerType.RIGHT_PINKY]: 'Правий мізинець'
  //   };
  //   return fingerNames[finger] || 'Невідомий палець';
  // }

  // getCurrentFingerAdvice(): string {
  //   if (this.currentPosition < this.lettersContainer.length) {
  //     const expectedLetter = this.lettersContainer[this.currentPosition].letter;
  //     const expectedKey = this.findKeyByLetter(expectedLetter);

  //     if (expectedKey) {
  //       return `Використовуйте ${this.getFingerName(expectedKey.finger)} для клавіші "${expectedKey.display}"`;
  //     }
  //   }
  //   return '';
  // }

  // private findKeyByLetter(letter: string): Key | null {
  //   for (const row of this.keyboardLayout) {
  //     for (const key of row) {
  //       if (letter === ' ' && key.id === 'space') {
  //         return key;
  //       }
  //       if (key.id.toLowerCase() === letter.toLowerCase()) {
  //         return key;
  //       }
  //     }
  //   }
  //   return null;
  // }

  // getFingerStats(): { [key: string]: number } {
  //   const stats: { [key: string]: number } = {};

  //   for (let i = 0; i < this.currentPosition; i++) {
  //     const letter = this.lettersContainer[i].letter;
  //     const key = this.findKeyByLetter(letter);

  //     if (key) {
  //       const fingerName = this.getFingerName(key.finger);
  //       stats[fingerName] = (stats[fingerName] || 0) + 1;
  //     }
  //   }

  //   return stats;
  // }
  getKeyClasses(key: Key): string[] {
    const classes = ['key'];

    classes.push(`finger-${key.finger}`);

    if (key.id === 'space') {
      classes.push('space');
    }

    if (this.isExpectedKey(key)) {
      classes.push('expected');
    }

    return classes;
  }

  isExpectedKey(key: Key): boolean {
    if (this.currentPosition < this.lettersContainer.length) {
      const expectedLetter = this.lettersContainer[this.currentPosition].letter;

      if (expectedLetter === ' ') {
        return key.id === 'space';
      }

      return key.id.toLowerCase() === expectedLetter.toLowerCase();
    }
    return false;
  }
}