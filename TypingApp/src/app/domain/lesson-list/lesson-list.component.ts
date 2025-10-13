import { Component, OnInit } from '@angular/core';
import { Lesson } from '../../core/modules/interfaces/lesson';
import { LessonService } from '../../core/modules/services/lesson.service';
import { ProgressService } from '../../core/modules/services/progress.service';
import { AuthService } from '../../core/modules/services/auth.service';
import { LessonProgressResponse } from '../../core/modules/interfaces/lesson-progress-response';
import { LessonWithState } from './interfaces/lesson-state';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserManagerService } from '../../core/modules/services/user-manager.service ';

@Component({
  selector: 'app-lesson-list',
  standalone: true,
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.css'],
  imports: [CommonModule, RouterModule],
})
export class LessonListComponent implements OnInit {
  lessons: LessonWithState[] = [];
  currentLanguage: 'uk' | 'en' = 'uk';

  constructor(
    private lessonService: LessonService,
    private progressService: ProgressService,
    public authService: AuthService,
    public userManagerService: UserManagerService
  ) {
  }

  ngOnInit(): void {
    const userId = this.userManagerService.getUser()!.id;

    this.loadLessons();
  }
  
  loadLessons(): void {
    const userId = this.userManagerService.getUser()!.id;
    this.progressService.getProgress(userId).subscribe({
      next: (value)=>{
        let lessonsState = this.lessonService.getLessonsByLanguage(this.currentLanguage)
        this.procecingLesson(value.result, lessonsState);
      },
      error: (err) => {
        console.log(err)
      }

    });

  }

  procecingLesson(lessonsProgres:LessonProgressResponse[], lessons: Lesson[]){
    let start = 1;
    this.lessons = [];
    if ( this.currentLanguage === 'uk'){
      start = 2;
    }
     let lastComplited = start;
    for(let i = start; i <= lessons.length; i += 2){
      let leson = lessons.find( lesson => lesson.id ===i )!; 
      if ( lessonsProgres.some( lesson =>  lesson.lessonId === i )){
        let con: LessonWithState = { ...leson,isCompleted: true, isUnlocked: true }
        this.lessons.push(con);
        lastComplited = lastComplited + 2;
      }else if(lastComplited === i || i === start){
        let con: LessonWithState = { ...leson,isCompleted: false, isUnlocked: true } 
        this.lessons.push(con);
      }else{
        let con: LessonWithState = { ...leson,isCompleted: false, isUnlocked: false } 
        this.lessons.push(con);
      }
    }
  }

  selectLanguage(lang: 'uk' | 'en'): void {
    this.currentLanguage = lang;
    this.loadLessons();
  }

  onLanguageChange(lang: 'uk' | 'en') {
    if (this.currentLanguage !== lang) {
      this.currentLanguage = lang;
      this.loadLessons();
    }
  }
}
