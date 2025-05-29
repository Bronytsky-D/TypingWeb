import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Lesson } from '../interfaces/lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private lessons: Lesson[] = [
    // Home Row
    { id: 1, title: 'Лекція 1: F J', description: 'F (ліва вказівний) та J (права вказівний)', keys: ['f','j'], content: 'Вказівні пальці на F та J натискають кінчиками, руки на домашньому рядку.' },
    { id: 2, title: 'Лекція 2: D K', description: 'D (ліва середній) та K (права середній)', keys: ['d','k'], content: 'Середні пальці на D та K рухаються за рахунок фаланги пальця.' },
    { id: 3, title: 'Лекція 3: S L', description: 'S (ліва безіменний) та L (права безіменний)', keys: ['s','l'], content: 'Безіменні пальці на S та L натискають, зап’ястя нерухоме.' },
    { id: 4, title: 'Лекція 4: A ;', description: 'A (ліва мізинець) та ; (права мізинець)', keys: ['a',';'], content: 'Мізинці на A та ; тиснуть плавно з домашньої позиції.' },

    // Top Row (за порядком ключів)
    { id: 5, title: 'Лекція 5: R U', description: 'R (ліва вказівний) та U (ліва безіменний)', keys: ['r','u'], content: 'Верхній ряд: R натискає вказівний лівої, U — безіменний лівої.' },
    { id: 6, title: 'Лекція 6: E I', description: 'E (ліва середній) та I (права вказівний)', keys: ['e','i'], content: 'Верхній ряд: E середній лівої, I — вказівний правої.' },
    { id: 7, title: 'Лекція 7: W O', description: 'W (ліва безіменний) та O (права безіменний)', keys: ['w','o'], content: 'Верхній ряд: W тисне безіменний лівої, O — безіменний правої.' },
    { id: 8, title: 'Лекція 8: Q Y', description: 'Q (ліва мізинець) та Y (права вказівний)', keys: ['q','y'], content: 'Верхній ряд: Q натискає мізинець лівої, Y — вказівний правої.' },
    { id: 9, title: 'Лекція 9: P T', description: 'P (права мізинець) та T (ліва вказівний)', keys: ['p','t'], content: 'Верхній ряд: P тисне мізинець правої, T — вказівний лівої.' },

    // Bottom Row (за порядком ключів)
    { id: 10, title: 'Лекція 10: Z M', description: 'Z (ліва мізинець) та M (права середній)', keys: ['z','m'], content: 'Нижній ряд: Z натискає мізинець лівої, M — середній правої.' },
    { id: 11, title: 'Лекція 11: C ,', description: 'C (ліва середній) та , (права вказівний)', keys: ['c',','], content: 'Нижній ряд: C тисне середній лівої, , — вказівний правої.' },
    { id: 12, title: 'Лекція 12: X .', description: 'X (ліва безіменний) та . (права безіменний)', keys: ['x','.'], content: 'Нижній ряд: X натискає безіменний лівої, . — безіменний правої.' },
    { id: 13, title: 'Лекція 13: Z /', description: 'Z (ліва мізинець) та / (права мізинець)', keys: ['z','/'], content: 'Нижній ряд: Z мізинець лівої, / — мізинець правої.' },
    { id: 14, title: 'Лекція 14: B N', description: 'B (ліва вказівний) та N (права безіменний)', keys: ['b','n'], content: 'Нижній ряд: B натискає вказівний лівої, N — безіменний правої.' }
  ];

  getLessons(): Observable<Lesson[]> {
    return of(this.lessons);
  }
    getLessonById(id: number): Lesson | undefined {
    return this.lessons.find(lesson => lesson.id === id);
  }
}