import { Component } from '@angular/core';
import { FormControl} from '@angular/forms';
import { SubjectService } from '../../../services/subject.service';
import { Subject } from '../../../interfaces/subject';

SubjectService
@Component({
  selector: 'app-i-mycourses',
  templateUrl: './i-mycourses.component.html',
  styleUrls: ['./i-mycourses.component.scss']
})
export class IMycoursesComponent {

  subject: Subject ={name:""}
  subjectInput = new FormControl('');
  subjectmsg: string = '';
  subjectsucess: boolean = false;
  subjectfail: boolean = false;

  constructor(private _SubjectService: SubjectService) {


  }




  add() {
    if (this.subjectInput.value != null && this.subjectInput.value != '')
    {
      this.subject.name = this.subjectInput.value!;

      this._SubjectService.addsubject(this.subject).subscribe({
        next:(response)=> {
          console.log(response);
          this.subjectInput.setValue('')
          this.subjectmsg="Success"
          this.subjectsucess = true
          setTimeout(() => {
            this.subjectmsg=''
          this.subjectsucess = false
          }, 5000)




        },
        error:(err)=> {
          console.log(err);
          this.subjectmsg=err.error.errors[0]
          this.subjectfail = true
          setTimeout(() => {
            this.subjectmsg=''
          this.subjectfail = false
          }, 5000)

        },
      })

    }
  }
}
