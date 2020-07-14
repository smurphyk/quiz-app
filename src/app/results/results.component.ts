import { Component, Input, OnInit } from '@angular/core';
import { Answers, Question, Results } from '../quiz.model';
import { QuestionsService } from '../questions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  @Input() answers: Answers;
  @Input() results: Results;
  currentQuiz: String;
  questions: Question[];
  correctChoice: Array<string> = [];


  constructor(private route: ActivatedRoute, public questionsService: QuestionsService) { }

  ngOnInit() {
    this.questionsService.getQuestions(this.route.snapshot.params.quizId)
      .subscribe(questions => {
        questions.forEach(question => {
          question.choices.forEach(choice => {
            if (choice.correct) {
              this.correctChoice.push(choice.value);
            }
          })
        })
      });
    this.currentQuiz = this.route.snapshot.params.quizId.charAt(0).toUpperCase()
      + this.route.snapshot.params.quizId.slice(1);
    console.log(this.answers);
  }

}