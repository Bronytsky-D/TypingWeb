import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './domain/login/login.component'
import { RegistrationComponent } from './domain/registration/registration.component'
import { TypingGameComponent } from './domain/typing-game/typing-game.component'
import { LayoutComponent } from './layout/layout.component'
import { ProfileComponent } from './domain/profile/profile.component';
import { LessonListComponent } from './domain/lesson-list/lesson-list.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', redirectTo: 'typing-game', pathMatch: 'full' },
      { path: 'typing-game', component: TypingGameComponent },
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'lesson-list', component: LessonListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
