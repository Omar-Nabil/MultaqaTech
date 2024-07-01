import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WcourseService } from '../../../services/Wcourse.service';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent implements OnInit {
  QuestionId :string = this.route.snapshot.paramMap.get('id')!;
  QuestionDetails!:string;

  constructor(private route: ActivatedRoute, private wcourseService:WcourseService) { }

  ngOnInit() {
    console.log(this.QuestionId);

  }



}
