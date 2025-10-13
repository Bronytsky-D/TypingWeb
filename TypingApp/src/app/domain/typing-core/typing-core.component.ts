import { Component, ElementRef, input, Input, output, SimpleChanges, ViewChild } from '@angular/core';
import { letterView } from '../../letterView';


@Component({
  selector: 'app-typing-core',
  standalone: false,
  templateUrl: './typing-core.component.html',
  styleUrl: './typing-core.component.css'
})
export class TypingCoreComponent {
  @ViewChild('cursor') cursor!: ElementRef;
  @ViewChild('game', { static: true }) gameElement!: ElementRef;
  currentPosition: number = 0;
  lastIndex: number = 0;
  @Input() lettersContainer: letterView[] = [];

  isGameActive: boolean = false;

  timerEnd = input<boolean>();
  endGame = output<letterView[]>();
  toggle = output<boolean>();

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void{
    if(changes['lettersContainer']){
      this.newTypingSession();
    }
    else if (changes['timerEnd']){
      console.log("Game is over" + this.timerEnd);
      this.endGame.emit(this.lettersContainer.filter( letter => letter.typed !== ""))
    }
  }
  newTypingSession(): void {
    this.gameElement.nativeElement.classList.remove('over');
    this.gameElement.nativeElement.blur();
    this.currentPosition = 0;
    this.lastIndex = this.lettersContainer.length -1;
    this.updateCursorPosition();
  }

  isCurrent(index: number): boolean {
    return this.currentPosition === index;
  }


  increasePocition(key: string) {
    if (!this.isGameActive) return
    const cell = this.lettersContainer[this.currentPosition]
    this.processTypendLetter(cell, key);
    this.advanceCursor()
    if (this.isLastLetter()){
      this.endGame.emit(this.lettersContainer)
    }
  }

  advanceCursor() {
    this.currentPosition++;
    this.updateCursorPosition();
  }

  processTypendLetter(cell: letterView, key: string) {
    cell.typed = key;
    if (cell.letter === key) {
      cell.isCorrect = true;
    }
    else {
      cell.isMistake = true;
    }
  }

  decreasePocition() {
    if (!this.isGameActive) return
    if (this.currentPosition > 0 ){
      this.currentPosition--;
      this.cleanCell()

      this.updateCursorPosition();
    }
  }

  cleanCell(){
    const cell = this.lettersContainer[this.currentPosition]
    cell.isCorrect = false;
    cell.isMistake = false;
    cell.typed = '';
  }

  spacePosition() {
    if (!this.isGameActive) return
    const cell = this.lettersContainer[this.currentPosition] 
    cell.typed = " ";
    if (cell.letter === ' '){
      cell.isCorrect = true;
    }else{
      cell.isMistake = true;
    }
    this.advanceCursor();
  }

  focusGame() {
    if (!this.isGameActive){
      this.isGameActive = true;
    }
    this.gameElement.nativeElement.focus();
    this.toggle.emit(true);
  }

  pauseTimer(): void {
    if (this.isGameActive){
      this.isGameActive = false;
    }
    this.toggle.emit(false)
  }
  
  isLastLetter(): boolean{
    return this.currentPosition === this.lastIndex;
  }


  getStyles(letter: letterView) {
    return this.isCurrent(letter.index) ? 'letter current' : letter.isCorrect ? 'letter correct' : letter.isMistake ?
      'letter incorrect' : 'letter';
  }

  updateCursorPosition() {
    setTimeout(() => {
      const letterElements = document.getElementsByClassName('letter');
      if (letterElements.length > this.currentPosition) {
        const currentLetterElement = letterElements[this.currentPosition] as HTMLElement;
        const cursorElement = this.cursor.nativeElement;
        const rect = currentLetterElement.getBoundingClientRect();
        cursorElement.style.top = `${rect.top}px`;
        cursorElement.style.left = `${rect.left}px`;
      } else {
        console.log('Current letter element not found');
      }
    }, 0);
  }
}
