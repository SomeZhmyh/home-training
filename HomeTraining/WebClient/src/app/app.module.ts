import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialAppModule } from './ngmaterial.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpRequestInterceptor } from './_helpers/http.interceptor';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AddExercisesComponent } from './add-exercises/add-exercises.component';
import { ProgramsComponent } from './programs/programs.component';
import { ProgramDetailsComponent } from './program-details/program-details.component';
import { SetDialogComponent } from './set-dialog/set-dialog.component';
import { ProgressComponent } from './progress/progress.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { ExerciseDetailsComponent } from './exercise-details/exercise-details.component';
import { CdTimerModule } from 'angular-cd-timer';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
const appRoutes: Routes = [
  { path: 'progress', component: ProgressComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'add-exercises', component: AddExercisesComponent },
  { path: 'exercises', component: ExerciseComponent },
  { path: 'programs', component: ProgramsComponent },
  { path: '**', component: NotFoundComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NotFoundComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    AddExercisesComponent,
    ProgramsComponent,
    ProgramDetailsComponent,
    SetDialogComponent,
    ProgressComponent,
    ExerciseComponent,
    ExerciseDetailsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),HttpClientModule, 
    MaterialAppModule,
    CdTimerModule, MatButtonToggleModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
