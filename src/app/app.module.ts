import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionFormComponent } from './question-form/question-form.component';
import { QuestionsComponent } from './questions/questions.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ResultsComponent } from './results/results.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: ':quizId', component: QuestionsComponent },
  { path: '', redirectTo: "welcome", pathMatch: "prefix" },
];

@NgModule({
  declarations: [
    AppComponent,
    QuestionFormComponent,
    ResultsComponent,
    QuestionsComponent,
    WelcomeComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }