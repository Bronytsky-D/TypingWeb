import { Component, OnInit } from '@angular/core';
import { Lesson } from '../../core/modules/interfaces/lesson';
import { LessonService } from '../../core/modules/services/lesson.service';

@Component({
  selector: 'app-lesson-list',
  standalone: false,
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.css'] 
})
export class LessonListComponent implements OnInit { 
  lessons: Lesson[] = [];

  constructor(private lessonService: LessonService) {}

  ngOnInit(): void {
    this.lessonService.getLessons().subscribe(data => {
      this.lessons = data;
    });
  }
}
