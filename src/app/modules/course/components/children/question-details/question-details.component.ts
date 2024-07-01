import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { WcourseService } from '../../../services/Wcourse.service';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent implements OnInit {
  QuestionId :string = this.route.snapshot.paramMap.get('id')!;
  QuestionDetails!:any;
  answers:any[] = [];
  answerControl = new FormControl('', Validators.required);
  userName:string = '';
  updateAnswerbool:boolean = false;
  answerindexToEdit:number = 0;
  answeridToEdit:number = 0;

  questionForm! : FormGroup;
  image!:File;
  updateQuestionBool:boolean = false;

  constructor(private route: ActivatedRoute, private wcourseService:WcourseService, private _fb: FormBuilder) { }

  ngOnInit() {
    this.questionForm = this._fb.group({
      Title:['',Validators.required],
      Details:['',Validators.required],
      QuestionPicture:['',Validators.required],
    });
    this.wcourseService.getQuestionDetails(this.QuestionId).subscribe({
      next:(res) => {
        console.log(res);
        this.QuestionDetails = res;
        this.getAnswers(this.QuestionDetails.id);
      },
      error:(err) => console.log(err)
    });
    this.questionIsAutherCheck();
  }

  getAnswers(id:number) {
    this.wcourseService.getAnswers(id).subscribe({
      next:(res) => {
        console.log(res);
        this.answers = res.data;
      },
      error:(err) => console.log(err)

    })
  }

  addAnswer() {
    var data = {
      content:this.answerControl.value,
      questionId:this.QuestionDetails.id
    };
    console.log(data);
    this.wcourseService.addAnswer(data).subscribe({
      next:(res) => {
        console.log(res);
        this.answers.push(res);
        this.answerControl.setValue('');
      },
      error:(err) => console.log(err)
    })
  }

  questionIsAutherCheck() : boolean {
    let token = JSON.stringify(localStorage.getItem('userToken'));
    let userData : any = jwtDecode(token);

    let userName = userData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'];

    return userName == this.QuestionDetails?.askerName;
  }

  answerIsAutherCheck(answer:any):boolean {
    let token = JSON.stringify(localStorage.getItem('userToken'));
    let userData : any = jwtDecode(token);

    let userName = userData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'];

    return userName == answer.answererName;
  }

  goBack() {
    window.history.back();
  }

  delteAnswer(id:number, index:number) {
    console.log(id);

    this.wcourseService.deleteAnswer(id).subscribe({
      next:(res) => {
        this.answers.splice(index, 1);
        console.log(res);

      },
      error:(err) => console.log(err)
    })
  }

  editAnswer(id:number, index:number) {
    this.answerControl.setValue(this.answers[index].content);
    this.updateAnswerbool = true;
    this.answeridToEdit = id;
    this.answerindexToEdit = index;
  }

  updateAnswer() {
    let data = {
      content:this.answerControl.value
    };
    this.wcourseService.updateAnswer(this.answeridToEdit, data).subscribe({
      next:(res) => {
        console.log(res);
        this.answers[this.answerindexToEdit] = res;
        this.updateAnswerbool = false;
        this.answerControl.setValue('');
      },
      error:(err) => console.log(err)
    })
  }

  delteQuestion(id:number) {
    this.wcourseService.deleteQuestion(id).subscribe({
      next:(res) => {
        console.log(res);
        this.goBack();
      }
    })
  }

  updateQuestion(id:number) {
    const data = new FormData();
    data.append('Title',this.questionForm.get('Title')?.value);
    data.append('Details',this.questionForm.get('Details')?.value);
    data.append('QuestionPicture', this.image ,this.image.name);
    console.log(data);
    this.wcourseService.updateQuestion(id, data).subscribe({
      next:(res) => {
        this.questionForm.get('Title')?.setValue('');
        this.questionForm.get('Details')?.setValue('');
        this.questionForm.get('QuestionPicture')?.setValue('');
        this.updateQuestionBool = false;
        this.QuestionDetails = res;
      },
      error:(err) => console.log(err)
    })
  }

  getImg(event:any) {
    console.log(event);
    this.image = event.target.files[0]
  }

  editQuestion() {
    this.updateQuestionBool = true;
    this.questionForm.get('Title')?.setValue(this.QuestionDetails?.title);
    this.questionForm.get('Details')?.setValue(this.QuestionDetails?.details);
    this.questionForm.get('QuestionPicture')?.setValue('');
  }

  scrollToBottom() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth' // Optional: for smooth scrolling
    });
  }
}
