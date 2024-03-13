import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'src/app/modules/dasdboard/interfaces/subject';
import { SubjectService } from 'src/app/modules/dasdboard/services/subject.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent {


  subject: Subject ={name:""}
  subjectInput = new FormControl('');
  subjectupdate = new FormControl('');
  subjectmsg: string = '';
  subjectsucess: boolean = false;
  subjectfail: boolean = false;
  subjects: Subject[] = []
  subjectupID:number=0

  constructor(private _SubjectService: SubjectService) {
    this.getSubjects()

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
      next: (response) => {
        console.log(response);
        this.getSubjects()
      },
      error:(err)=>{console.log(err);
        this.getSubjects()
      }
    })

  }
  updateSubject() {
    if (this.subjectupdate.value != null && this.subjectupdate.value != '') {
      this._SubjectService.updatesubject(this.subjectupID, {name:this.subjectupdate.value!}).subscribe({
        next: (response) => {
          console.log(response);
          this.subjectupdate.setValue('')
          this.subjectmsg = "Success"
          this.subjectsucess = true
          setTimeout(() => {
            this.subjectmsg = ''
            this.subjectsucess = false
          }, 5000)

          this.getSubjects()
        },
        error: (err) => {
          console.log(err);
          this.subjectmsg = err.error.errors[0]
          this.subjectfail = true
          setTimeout(() => {
            this.subjectmsg = ''
            this.subjectfail = false
          }, 5000)

        }
      })

    }
  }

 getsubject(id: number) {

    this._SubjectService.getsubject(id).subscribe({
      next: (res) => {

        this.subjectupdate.setValue(res.name);
        this.subjectupID=res.id

      }
    })
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
