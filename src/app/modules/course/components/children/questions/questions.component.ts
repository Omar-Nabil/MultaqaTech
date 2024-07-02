import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WcourseService } from '../../../services/Wcourse.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  allQuestions:any[] = [];
  questionForm! : FormGroup;
  image!:File;

  constructor(private wcourseService:WcourseService, private _fb: FormBuilder) { }

  ngOnInit() {
    this.questionForm = this._fb.group({
      Title:['',Validators.required],
      Details:['',Validators.required],
      QuestionPicture:['',Validators.required],
    });
    this.wcourseService.lectureOrQuizId.subscribe({
      next:(res) => {
        if(res != null) {
          this.getAllQuestions();
        }
      }
    })
  }

  getImg(event:any) {
    console.log(event);
    this.image = event.target.files[0]
  }

  getAllQuestions() {

    console.log(this.wcourseService.lectureOrQuizId.value);

    this.wcourseService.getAllQuestions(this.wcourseService.lectureOrQuizId.value).subscribe({
      next:(res) => {
        console.log(res.data);
        this.allQuestions = res.data;
      },
      error:(err) => console.log(err)

    })
  }

  AddQestion() {
    const data = new FormData();
    data.append('LectureId',this.wcourseService.lectureOrQuizId.value);
    data.append('Title',this.questionForm.get('Title')?.value);
    data.append('Details',this.questionForm.get('Details')?.value);
    data.append('QuestionPicture', this.image ,this.image.name);
    console.log(data);
    this.wcourseService.addQuestion(data).subscribe({
      next:(res) => {
        this.allQuestions.push(res);
        this.questionForm.get('Title')?.setValue('');
        this.questionForm.get('Details')?.setValue('');
        this.questionForm.get('QuestionPicture')?.setValue('');
      },
      error:(err) => console.log(err)
    })
  }


  formatDate(dateString:string):string {
    let publishingDate = new Date(dateString);
    return `${publishingDate.getFullYear()}-${String(publishingDate.getMonth() + 1).padStart(2, '0')}-${String(publishingDate.getDate()).padStart(2, '0')} ${publishingDate.getHours()}:${publishingDate.getMinutes().toString().padStart(2, '0')}`;
  }

}
