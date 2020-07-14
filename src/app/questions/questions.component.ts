import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { QuestionsService } from '../questions.service';
import { Quiz, Answers, Choice, Question, Results } from '../quiz.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  quiz: Quiz;
  answers: Answers;
  results: Results;
  questions: Question[];
  currentQuestionIndex: number;
  currentQuiz: String;
  correctCount: number;
  incorrectCount: number;
  showResults = false;

  // inject both the active route and the questions service
  constructor(private route: ActivatedRoute, public questionsService: QuestionsService) { }

  ngOnInit() {

    // read from the dynamic route and load the proper quiz data
    this.questionsService.getQuestions(this.route.snapshot.params.quizId)
      .subscribe(questions => {
        // initialize everything
        this.questions = questions;
        this.currentQuiz = this.route.snapshot.params.quizId.charAt(0).toUpperCase()
          + this.route.snapshot.params.quizId.slice(1);
        this.answers = new Answers();
        this.currentQuestionIndex = 0;
        this.results = new Results(0, 0, '');
        this.correctCount = 0;
        this.incorrectCount = 0;
      });
  }

  updateChoice(choice: Choice) {
    this.answers.values[this.currentQuestionIndex] = choice;
  }

  updateStats() {
    if (this.answers.values[this.currentQuestionIndex].correct) {
      ++this.correctCount;
    }
    else {
      ++this.incorrectCount;
    }
    var totalQuestions = this.correctCount + this.incorrectCount;
    var percentage = ((this.correctCount / totalQuestions) * 100).toFixed(2);
    this.results.correctCount = this.correctCount;
    this.results.totalQuestions = totalQuestions;
    this.results.percentage = percentage;
  }

  nextOrViewResults() {
    this.updateStats();
    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.showResults = true;
      return;
    }

    this.currentQuestionIndex++;
  }

  reset() {
    this.quiz = undefined;
    this.questions = undefined;
    this.answers = undefined;
    this.currentQuestionIndex = undefined;
  }

}