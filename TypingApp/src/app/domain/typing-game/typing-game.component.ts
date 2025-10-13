import { AfterViewInit, Component, ElementRef, HostListener, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { letterView } from '../../letterView'
import { AuthService } from '../../core/modules/services/auth.service';
import { RecordService } from '../../core/modules/services/record.service';
import { RecordRequset } from '../../core/modules/interfaces/record-resquest';
import { WordStat } from '../../core/modules/interfaces/word.stat';
import { Router } from '@angular/router';
import { GameResultService } from '../../core/modules/services/game-result.service';
import { GameResults } from '../../core/modules/interfaces/game-result';
import { Mistake } from '../../core/modules/interfaces/mistake';
import { cell } from '@observablehq/plot';
import { ENGLISH_WORDS, UKRAINIAN_WORDS } from './data/word-lists';


@Component({
  selector: 'app-typing-game',
  templateUrl: './typing-game.component.html',
  styleUrl: './typing-game.component.css',
  standalone: false
})
export class TypingGameComponent {
  availableLanguages = ['en', 'uk'];
  selectedLanguage: 'en' | 'uk' = 'en';
  words: string[] = [];
  @ViewChild('cursor') cursor!: ElementRef;
  @ViewChild('game', { static: true }) gameElement!: ElementRef;
  gameTime = 30 * 1000;
  timer: any = null;
  gameStart: any = null;
  pauseTime = 0;
  mistakes: Mistake[] = [];
  lettersContainer: letterView[] = [];
  currentPosition: number = 0;
  interval: any;
  minutes: number = 0;
  seconds: number = 0;
  selectedMode: string = 'time';
  numberOfWords: number = 25;
  wordsCounter: number = 0;
  lastIndex: number = 0;
  isGameActive: boolean = false;
  isGameEnded: boolean = false;
  elapsedTime: number = 0;

  wordStats: WordStat[] = [];
  currentWordStartTime: number = 0;


  wpmTimeline: { second: number; wpm: number }[] = [];
  elapsedSeconds: number = 0;
  charsTypedAtSecondStart: number = 0;
  mistakeTimeline: { second: number; mistakes: number }[] = [];
  wpmInterval: any;
  mistakesCountAtSecondStart = 0;

  constructor(private authService: AuthService, private recordService: RecordService, private router: Router, private gameResultService: GameResultService) { }

  ngOnInit(): void {
    this.newGame();
  }

  randomWord(): string {
    if (this.words.length === 0) {
      console.warn('Word list is empty. Cannot generate random word.');
      return '';
    }
    const randomIndex = Math.floor(Math.random() * this.words.length);
    return this.words[randomIndex];
  }
  fillingVariables(): void {
    this.mistakes = [];
    this.lettersContainer = [];
    this.currentPosition = 0;
    this.wordsCounter = 0;
    clearInterval(this.interval);
    this.minutes = 0;
    this.seconds = 0;
    this.gameStart = null;
    this.isGameActive = false;
    this.isGameEnded = false;
    this.pauseTime = 0;
    this.wordStats = [];
    this.currentWordStartTime = Date.now();
    this.elapsedSeconds = 0;
    this.wpmTimeline = [];
    this.mistakeTimeline = [];
    this.charsTypedAtSecondStart = 0;
    clearInterval(this.wpmInterval);
    this.elapsedSeconds = 0;
    this.charsTypedAtSecondStart = 0;
    this.mistakesCountAtSecondStart = 0;
    this.mistakeTimeline = [];

  }

  newGame(): void {
    this.fillingVariables();

    if (this.selectedMode === 'time') {
      this.numberOfWords = 125;
    } else if (this.selectedMode === 'words') {
      this.startWordsModeTimer();
    }
    this.loadWordsByLanguage();
    

    this.loadWordsByLanguage();
    let a: string[] = [];
    for (let i = 0; i < this.numberOfWords; i++) {
      a.push(this.randomWord());
      a.push(' ');
    }
    let index: number = 0;
    a.forEach((word) => {
      word.split('').forEach((letter) => {
        this.lettersContainer.push(new letterView(index, letter));
        index++;
      });
    })
    this.lettersContainer = [... this.lettersContainer]

    this.lastIndex = index - 1;
  }
  private loadWordsByLanguage(): void {
    if (this.selectedLanguage === 'en') {
      this.words = [...ENGLISH_WORDS];
    } else {
      this.words = [...UKRAINIAN_WORDS];
    }
  }
  onLanguageChange(): void {
    this.loadWordsByLanguage();
    this.newGame();
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
      if (!this.isGameActive || this.gameStart === null) {
        return;
      }
      else if (this.isGameActive) {
        this.elapsedTime = Date.now() - this.gameStart;

        if (this.selectedMode === 'time') {
          const remainingTime = this.gameTime - this.elapsedTime;
          if (remainingTime <= 0) {
            this.isGameEnded = true;
          } else {
            this.updateTimerDisplay(remainingTime);
          }
        } else {
          this.updateTimerDisplay(this.elapsedTime);
        }
      }
    }, 1000);

    this.wpmInterval = setInterval(() => {
      if (!this.isGameActive) return;
      const seconds = Math.floor((Date.now() - this.gameStart) / 1000);
      const charsNow = this.currentPosition;
      const charsTypedThisSecond = charsNow - this.charsTypedAtSecondStart;
      this.charsTypedAtSecondStart = charsNow;
      const wpm = (charsTypedThisSecond / 5) * 60;
      this.wpmTimeline.push({ second: seconds, wpm });

      const totalMistakesNow = this.mistakes.length;
      const mistakesThisSecond = totalMistakesNow - this.mistakesCountAtSecondStart;
      this.mistakesCountAtSecondStart = totalMistakesNow;
      this.mistakeTimeline.push({ second: seconds, mistakes: mistakesThisSecond });
    }, 1000);
  }


  gameOver(resultLetterConteiner: letterView[]): void {
    clearInterval(this.timer);
    this.isGameActive = false;
    this.timer = null;
    const elapsedTime = this.gameStart ? (Date.now() - this.gameStart) : 0;
    const elapsedSeconds = Math.floor(elapsedTime / 1000);

    // const wpm = Math.floor((this.currentPosition / 5) / (elapsedTime / 60000));
    // const raw = Math.floor(this.currentPosition);
    // const accuracy = Math.floor(((this.currentPosition - this.mistakes.length) / this.currentPosition) * 100);
    // const consistency = 100;

    // let multiplier = 1.0;
    // if (this.gameTime >= 60000 || this.numberOfWords >= 50) multiplier = 1.2;
    // if (this.numberOfWords >= 125 || this.gameTime >= 90000) multiplier = 1.5;

    // const xp = Math.round((wpm * accuracy * multiplier) / 100);
    // const modeEnumValue = this.selectedMode === 'time' ? 0 : 1;
    // const gameLengthValue = this.selectedMode === 'time' ? this.gameTime : this.numberOfWords;

    // console.log(`Game Over! Time: ${elapsedSeconds} seconds, Mistakes: ${this.mistakes.length}, WPM: ${wpm}, raw${raw} ,accuracy ${accuracy} ,consistency ${consistency}`);
    // if (this.authService.getUserDetail() !== null && this.currentPosition >= 5) {
    //   const recordRequest: RecordRequset = {
    //     userId: this.authService.getUserDetail()?.id,
    //     wpm: wpm,
    //     raw: raw,
    //     accuracy: accuracy,
    //     consistency: consistency,
    //     chars: this.currentPosition,
    //     matchTime: elapsedSeconds,
    //     experience: xp,
    //     mode: modeEnumValue,
    //     gameLength: gameLengthValue,
    //     language: this.selectedLanguage
    //   };
    //   this.recordService.write(recordRequest).subscribe(
    //     response => {
    //       console.log('Record successfully saved', response);
    //     },
    //     error => {
    //       console.error('Error saving record', error);
    //     })
    // }
    // const gameElement = document.getElementById('game');
    // if (gameElement) {
    //   gameElement.classList.add('over');
    // }
    let _mode = this.gameTime;
    if ( this.selectedMode === "words") {
      _mode = this.numberOfWords;
    }
    const results: GameResults = {
      letterConteiner: resultLetterConteiner,
      timeOfGame: this.gameTime,
      language: this.selectedLanguage,
      mode: this.selectedMode,
      length: _mode
    };
    this.gameResultService.setResults(results);
    this.router.navigate(['/result']);

  }
  
  switchTimer(_isGameactive: boolean): void{
    if (_isGameactive === true){
      this.focusGame();
    } else if ( _isGameactive === false){
      this.pauseTimer();
    }
  }

  pauseTimer(): void {
    if (this.isGameActive) {
      this.isGameActive = false;
      clearInterval(this.interval);
      clearInterval(this.wpmInterval);
      this.pauseTime += Date.now() - this.gameStart;
    }
  }

  updateTimerDisplay(time: number): void {
    this.minutes = Math.floor(time / 60000);
    this.seconds = Math.floor((time % 60000) / 1000);
  }

  startWordsModeTimer(): void {
    this.interval = setInterval(() => {
      const elapsedTime = Date.now() - this.gameStart - this.pauseTime;
      this.updateTimerDisplay(elapsedTime);
    }, 1000);
  }

  focusGame() {
    if (!this.isGameActive) {
      this.gameStart = Date.now() - this.pauseTime;
      this.isGameActive = true;
      this.startTimer();
    }
  }

  selectMode(mode: string): void {
    this.selectedMode = mode;
    this.newGame()
  }

  selectWords(words: number): void {
    this.numberOfWords = words;
    this.newGame();
  }

  selectTime(time: number): void {
    this.gameTime = time * 1000;
    this.newGame()
  }
  selectLanguage(lang: 'en' | 'uk'): void {
    this.selectedLanguage = lang;
    this.newGame();
  }

  isLastLetter(): boolean {
    return this.currentPosition === this.lastIndex;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }


}
