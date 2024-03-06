import { Component } from '@angular/core';
import { FormControl, FormGroup,  Validators} from '@angular/forms';
import { SubjectService } from '../../services/subject.service';
import { Subject } from '../../interfaces/subject';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  subjects:Subject[]=[]

  constructor(private _SubjectService:SubjectService){}


     toggleMenu() {
    $(".dashboard-menu").toggleClass('open');
     }

  addCourseForm:FormGroup = new FormGroup({
    title:new FormControl(''),
    language:new FormControl(''),
    subject:new FormControl(0),
    courselevel:new FormControl(''),
  })

    getSubjects() {
     this._SubjectService.getsubjects().subscribe({
      next: (response) => {
         this.subjects = response;
      }
    })
  }
}
