import { Component, OnInit } from '@angular/core';
import { Lesson } from '../../core/modules/interfaces/lesson';
import { LessonService } from '../../core/modules/services/lesson.service';
import { ProgressService } from '../../core/modules/services/progress.service';
import { AuthService } from '../../core/modules/services/auth.service';
import { LessonProgress } from '../../core/modules/interfaces/lesson-progress';
import { ExecutionResponse } from '../../core/modules/interfaces/execution-response';
import { LessonProgressResponse } from '../../core/modules/interfaces/lesson-progress-response';
import{ LessonWithState } from './interfaces/lesson-state'
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-lesson-list',
  standalone: false,
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.css']
})
export class LessonListComponent implements OnInit {
   lessons: LessonWithState[] = [];

  constructor(
    private lessonService: LessonService,
    private progressService: ProgressService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserDetail().id;

    // Спочатку завантажуємо уроки
    this.lessonService.getLessons().subscribe(lessons => {
      console.log('Lessons loaded:', lessons);
      
      // Потім намагаємося завантажити прогрес
      this.progressService.getProgress(userId).subscribe({
        next: (progress) => {
          console.log('Progress loaded:', progress);
          this.processLessonsWithProgress(lessons, progress);
        },
        error: (error) => {
          console.log('No progress found (404), using default state:', error);
          // Якщо прогресу немає (404), створюємо базовий стан
          this.processLessonsWithProgress(lessons, { success: true, result: [] });
        }
      });
    });
  }

  private processLessonsWithProgress(lessons: Lesson[], progress: any): void {
    // Отримуємо масив прогресу з відповіді сервера
    const progressArray = progress.success ? progress.result : [];
    
    // Створюємо мапу прогресу за lessonId
    const progMap = new Map<number, LessonProgressResponse>();
    progressArray.forEach((p: LessonProgressResponse) => progMap.set(p.lessonId, p));

    // Сортуємо уроки за id
    const sorted = lessons.slice().sort((a, b) => a.id - b.id);

    // Мапимо в LessonWithState з логікою поступового відкриття
    const lessonsWithState = sorted.map((lesson, idx) => {
      const progressData = progMap.get(lesson.id);
      const isCompleted = progressData ? progressData.progressPercent >= 80 : false;
      
      // Перший урок завжди відкритий, наступні відкриваються тільки якщо попередній пройдений
      let isUnlocked = false;
      if (idx === 0) {
        isUnlocked = true; // Перший урок завжди доступний
      } else {
        const prevLesson = sorted[idx - 1];
        const prevProgress = progMap.get(prevLesson.id);
        isUnlocked = prevProgress ? prevProgress.progressPercent >= 80 : false;
      }

      return {
        ...lesson,
        isCompleted,
        isUnlocked,
        progressData: progressData || null // Додаємо дані прогресу
      } as LessonWithState & { progressData: LessonProgressResponse | null };
    });

    console.log('Lessons with state:', lessonsWithState);
    this.lessons = lessonsWithState as LessonWithState[];
  }
}