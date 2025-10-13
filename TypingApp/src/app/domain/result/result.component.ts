import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

import { GameResultService } from '../../core/modules/services/game-result.service';
import { LessonService } from '../../core/modules/services/lesson.service';
import { Lesson } from '../../core/modules/interfaces/lesson';
import { letterView } from '../../letterView';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, RouterModule, NgChartsModule],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {

  resultLetterConteiner: letterView[] = [];

  mistakesLetterContiener: letterView[] = [];
  timeOfGame: number = 0; 
  language: string = '';

  lenghtOfOwrds: number = 0;
  numberOfWords: number = 0;
  wpm: number = 0;
  accuracy: number = 0;
  XP: number = 0;
  mode: string = "";
  lengthOfGame: number = 0;

  listLessons: Lesson[] = [];
  words: letterView[][] = [];
  index: number = 0;
  hoveredIndex: number | null = null;

  constructor(
    private gameResult: GameResultService,
    private lessonService: LessonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const res = this.gameResult.getResults();
    console.log(res.letterConteiner)
    this.timeOfGame = res.timeOfGame;
    this.resultLetterConteiner = res.letterConteiner;
    this.mistakesLetterContiener = this.resultLetterConteiner.filter( (letter) => letter.isMistake);

    this.groupLettersByWords()

    this.numberOfWords = this.resultLetterConteiner.filter( letter => letter.letter === " ").length
    this.lenghtOfOwrds = this.resultLetterConteiner.length
    
    this.wpm = Math.floor((this.lenghtOfOwrds / 5) / (this.timeOfGame / 60000));
    this.accuracy = Math.floor(((this.lenghtOfOwrds - this.mistakesLetterContiener.length) / this.lenghtOfOwrds) * 100);
    let multiplier = 1.0;

    if (this.timeOfGame >= 60000 || this.numberOfWords >= 50) multiplier = 1.2;
    if (this.numberOfWords >= 125 || this.timeOfGame >= 90000) multiplier = 1.5;
    this.XP =  Math.round((this.wpm * this.accuracy * multiplier) / 100);

    this.mode = res.mode;
    this.lengthOfGame = res.length;
    this.language = res.language;
    this.getLessonbymistikeLetter();
  }
  
  getStyles(letter: letterView) {
    return letter.isCorrect ? 'letter correct' : 'letter incorrect';
  }

  groupLettersByWords(): void{
    this.words = [];
    let current: letterView[] = [];
    for(const letter of this.resultLetterConteiner){
      current.push(letter)
      if (letter.letter === " "){
        this.words[this.index] = current;
        current = [];
        this.index++
      }
    }

    if (current.length > 0) {
      this.words.push(current);
    }
    this.index = 0;
  } 

  getLessonbymistikeLetter(){
    let lessons = this.lessonService.getLessonsByLanguage(this.language)
    this.mistakesLetterContiener.forEach( mistake => { 
      lessons.forEach(lesson => {
        if (lesson.keys.includes(mistake.letter)){
          this.listLessons.push(lesson)
        }
      })
    })
    this.listLessons =  this.listLessons.filter( (val, index, arr) => arr.indexOf(val) === index);
  }

  goToLesson(id: number): void {
    this.router.navigate(['/lesson', id, this.language]);
  }
}
