import { Component, OnInit } from '@angular/core';
import { Lesson } from '../../core/modules/interfaces/lesson';
import { LessonService } from '../../core/modules/services/lesson.service';
import { ProgressService } from '../../core/modules/services/progress.service';
import { AuthService } from '../../core/modules/services/auth.service';
import { LessonProgress } from '../../core/modules/interfaces/lesson-progress';
import { ExecutionResponse } from '../../core/modules/interfaces/execution-response';

@Component({
  selector: 'app-lesson-list',
  standalone: false,
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.css']
})
export class LessonListComponent implements OnInit {
  lessons: Lesson[] = [];
  unlocked = new Set<number>();
  progressPercent: { [lessonId: number]: number } = {};
  private userId: string;
  private threshold = 50; // відсотків для розблокування

  constructor(
    private lessonService: LessonService,
    private progressService: ProgressService,
    private auth: AuthService
  ) {
    this.userId = this.auth.getUserDetail().id;
  }

  ngOnInit(): void {
    this.lessonService.getLessons().subscribe(lessons => {
      this.lessons = lessons;
      if (!lessons.length) return;
      this.unlocked.add(lessons[0].id);
      lessons.forEach((lesson, idx) => {
        this.progressService.getProgress(this.userId, lesson.id)
          .subscribe((resp: ExecutionResponse<LessonProgress>) => {
            if (!resp.success || !resp.result) return;
            const best = resp.result.bestAccuracy;
            this.progressPercent[lesson.id] = best;
            if (best >= this.threshold && idx < lessons.length - 1) {
              this.unlocked.add(lessons[idx + 1].id);
            }
          });
      });
    });
  }

  isUnlocked(id: number): boolean {
    return this.unlocked.has(id);
  }

  select(lesson: Lesson): void {
    if (!this.isUnlocked(lesson.id)) return;
    // навігація в урок
  }
}