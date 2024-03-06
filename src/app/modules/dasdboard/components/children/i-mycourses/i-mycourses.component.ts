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
  subjects:Subject[]=[]

  constructor(private _SubjectService: SubjectService) {


  }

  getSubjects() {
     this._SubjectService.getsubjects().subscribe({
      next: (response) => {
         this.subjects = response;
      }
    })
  }

  deleteSubject(id: number) {
    this._SubjectService.deletesubject(id).subscribe({
      next:(response)=>{console.log(response);
      },
      error:(err)=>{console.log(err);
        this.getSubjects()
      }
    })

  }

    toggleFade(modal1:any,modal2:any){
      $(`#${modal1}`).addClass('fade');
      $(`#${modal2}`).removeClass('fade')
      if ($('.modal-backdrop.fade.show').length >= 1) {
        for (let i = 0; i < $('.modal-backdrop.fade.show').length; i++) {
           $('.modal-backdrop.fade.show')[0].remove()

        }


      }


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

          this.getSubjects()


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
