import { Component, OnInit } from '@angular/core';
import * as main from '../../../../../main';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CurriculumSectionService } from '../../services/curriculum-section.service';
import { item_get, section_get } from '../../interfaces/curriculum';
import { moveItemInArray } from '@angular/cdk/drag-drop'
import { CurriculumLectureService } from '../../services/curriculum-lecture.service';
import { CurriculumItemService } from '../../services/curriculum-item.service';
import { CurriculumQuizService } from '../../services/curriculum-quiz.service';
import { QuizQuestion_post } from '../../interfaces/quiz-question';
import { CurriculumQuizQuestionService } from '../../services/curriculum-quiz-question.service';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss'],
})
export class CurriculumComponent implements OnInit{
  courseId: number =+(this._ActivatedRoute.snapshot.paramMap.get('id')as string);
  addSectionBool: boolean = false;
  updateSectionBool: boolean = false;
  addlectureBool: boolean = false;
  updatelectureBool: boolean = false;
  addQuizBool: boolean = false;
  updateQuizBool: boolean = false;
  addQuestionBool: boolean = false;
  updateQuestionBool: boolean = false;
  sectionForm!: FormGroup;
  lectureForm!: FormGroup;
  AddQuestionForm!: FormGroup;
  quizForm!: FormGroup;
  sections: section_get[] = []
  secttionIdForUpdate: any = 0
  lectureIdForUpdate: any = 0
  quizIdForUpdate: any = 0
  idUpdateQuestion = 0;
  sectionReorder: number[] = []
  parentSectionId: number = 0
  parentQuizId: number = 0
  addItemBool: boolean = false
  file!: File
  allItems: {
    id: number,
    items:item_get[]
  }[]=[]
  questions: {
    id: number,
    question:QuizQuestion_post[]
  }[]=[]

  constructor(private _fb: FormBuilder, private _ActivatedRoute: ActivatedRoute
    , private _sectionService: CurriculumSectionService, private _lectureService: CurriculumLectureService
    , private _itemsService: CurriculumItemService, private _quizService: CurriculumQuizService,
    private _QuestionService:CurriculumQuizQuestionService
  ) {
    this.createSectionForm()
    this.createLectureForm()
    this.createQuizForm()
    this.createQuestionForm()
this.getSections()
  }

  ngOnInit() {
    main.start()
  }

  displaySectionForm() {
    this.addSectionBool=true
  }

  createSectionForm() {
    this.sectionForm = this._fb.group({
      title:['',Validators.required],
      objectives:['']
    })
  }
  createLectureForm() {
    this.lectureForm = this._fb.group({
      title:['',Validators.required],
      description: [''],
      video:['',Validators.required]
    })
  }
  createQuizForm() {
    this.quizForm = this._fb.group({
      title:['',Validators.required],
      description: [''],
      img:['',Validators.required]
    })
  }
  createQuestionForm() {
    this.AddQuestionForm = this._fb.group({
      content: ['',Validators.required],
      option1: ['',Validators.required],
      option2: ['',Validators.required],
      option3: [''],
      option4: [''],
      clarification1: [''],
      clarification2: [''],
      clarification3: [''],
      clarification4: [''],
      correctAnswer:['',Validators.required]
    })
  }

    onFileChange(event:any) {
this.file=event.target.files[0]

  }

  addSection() {
    const section = {
      title:this.sectionForm.get('title')?.value,
      objectives: this.sectionForm.get('objectives')?.value,
      courseId:this.courseId
    }
    this._sectionService.addSection(section).subscribe({
      next: (res) => {
        this.getSections()
        this.addSectionBool = false
        this.createSectionForm()
      }
    })

  }

  getSections() {
    this._sectionService.getSectionByCourseId(this.courseId).subscribe({
      next: (res) => {
        this.sections = res;
        this.getItems()
      }
    })
  }

  getSectionForUpdate(id:any) {
    this.secttionIdForUpdate = id;

    this.updateSectionBool = true;
    this._sectionService.getSectionById(id).subscribe({
      next: (res) => {

        $('body,html').scrollTop($('#sectionForm').offset()?.top!)

        this.sectionForm.get('title')?.setValue(res.title)
        this.sectionForm.get('objectives')?.setValue(res.objectives)
      }
    })
  }

  updateSection() {
   const section = {
      title:this.sectionForm.get('title')?.value,
      objectives: this.sectionForm.get('objectives')?.value
   }
    this._sectionService.updateSection(this.secttionIdForUpdate,section).subscribe({
      next: (res) => {
        this.getSections()
        this.updateSectionBool = false
        this.createSectionForm()
      }
    })
  }

  deleteSection(id:any) {
    this._sectionService.deleteSection(id).subscribe({
      next: (res) => {
        this.getSections()
      }
    })
  }

  drop(event:any) {
    moveItemInArray(this.sections, event.previousIndex, event.currentIndex);
    this.sections.forEach(section => {
      this.sectionReorder.push(section.id)
    });
    this._sectionService.reorderSections(this.courseId, this.sectionReorder).subscribe({
      next: (res) => {
        console.log(this.sectionReorder);
        this.sectionReorder = []
  }
})
  }

  displayItem(id:any) {
    this.parentSectionId = id
    this.addItemBool = true
    this.updatelectureBool=false
  }
  addItemlecture() {
    this.addlectureBool=true
    this.addItemBool = false

  }
  addItemQuiz() {
    this.addQuizBool=true
    this.addItemBool=false
  }

  addLecture() {
    const data = new FormData()
    data.append('Title',this.lectureForm.get('title')?.value)
    data.append('Description',this.lectureForm.get('description')?.value)
    data.append('VideoUrl', this.file)
    data.append('CurriculumSectionId', `${this.parentSectionId}`)

    this._lectureService.addLecture(data).subscribe({
      next: (res) => {
        console.log(res);
        this.addlectureBool = false
        this.createLectureForm()
        this.getSections()
     }
   })

  }
  addQuiz() {
    const data = new FormData()
    data.append('Title',this.quizForm.get('title')?.value)
    data.append('Description',this.quizForm.get('description')?.value)
    data.append('PictureUrl', this.file)
    data.append('CurriculumSectionId', `${this.parentSectionId}`)

    this._quizService.addQuiz(data).subscribe({
      next: (res) => {
        console.log(res);
        this.addQuizBool = false
        this.createQuizForm()
        this.getSections()
     }
   })

  }

  getItems() {
    var items: item_get[];
    var Questions: [];
    this.allItems = []
    this.questions=[]
         this.sections.forEach(element => {
          this._itemsService.getItemsforSection(element.id).subscribe({
            next: (res) => {
              items=res as item_get[];
              this.allItems.push({ id: element.id, items: items })

              items.forEach(item => {
                if (item.itemType == 'Quiz') {


                  this._QuestionService.getQuestionsByQuizId(item.id).subscribe({
                    next: (res) => {
                      Questions = res
                      this.questions.push({ id: item.id, question:Questions })
                    }
                  })
                }
              });
      }
        });
    })
    console.log(this.questions);

  }

  getLectureForUpdate(type:any,id:any,parentId:any) {
    if (type=='Lecture') {
      this.lectureIdForUpdate = id;
    this.parentSectionId=parentId
    this.updatelectureBool = true;
    this._lectureService.getLecture(id).subscribe({
      next: (res) => {
        console.log(res);

        $('body,html').scrollTop($('#lectureForm').offset()?.top!)

        this.lectureForm.get('title')?.setValue(res.title)
        this.lectureForm.get('description')?.setValue(res.description)
      }
    })
    }
    else {
 this.quizIdForUpdate = id;
    this.parentSectionId=parentId
    this.updateQuizBool = true;
    this._quizService.getQuiz(id).subscribe({
      next: (res) => {
        console.log(res);

        $('body,html').scrollTop($('#lectureForm').offset()?.top!)

        this.quizForm.get('title')?.setValue(res.title)
        this.quizForm.get('description')?.setValue(res.description)
      }
    })
    }
  }


  updateLecture() {
   const data = new FormData()
    data.append('Title',this.lectureForm.get('title')?.value)
    data.append('Description',this.lectureForm.get('description')?.value)
    data.append('VideoUrl', this.file)
    data.append('CurriculumSectionId', `${this.parentSectionId}`)

    this._lectureService.updateLecture(this.lectureIdForUpdate,data).subscribe({
      next: (res) => {
        this.getSections()
        this.updatelectureBool = false
        this.createLectureForm()
      }
    })
  }

  deleteLecture(type: any, id: any) {
    if (type == 'Lecture') {

      this._lectureService.deleteLecture(id).subscribe({
        next: (res) => {
          this.getSections()
        }
      })
    }
    else {
      this._quizService.deleteQuiz(id).subscribe({
        next: (res) => {
          this.getSections()
        }
      })
    }
  }

   updateQuiz() {
   const data = new FormData()
    data.append('Title',this.quizForm.get('title')?.value)
    data.append('Description',this.quizForm.get('description')?.value)
    data.append('PictureUrl', this.file)
    data.append('CurriculumSectionId', `${this.parentSectionId}`)

    this._quizService.updateQuiz(this.quizIdForUpdate,data).subscribe({
      next: (res) => {
        this.getSections()
        this.updateQuizBool = false
        this.createQuizForm()
      }
    })
   }

   AddingQuestion(id:any) {
    this.addQuestionBool = true;
    this.parentQuizId=id
  }

  addQuestion() {

    const question: any = {
      quizId: this.parentQuizId,
      content: this.AddQuestionForm.get('content')?.value,
      quizQuestionChoices: [
        {
          content: this.AddQuestionForm.get('option1')?.value,
          isRight: false,
          clarification:this.AddQuestionForm.get('clarification1')?.value
        },
        {
          content: this.AddQuestionForm.get('option2')?.value,
          isRight: false,
          clarification:this.AddQuestionForm.get('clarification2')?.value
        }
      ]
    }


    if ((this.AddQuestionForm.get('option3')?.value)) {
      question.quizQuestionChoices[2]={
          content: this.AddQuestionForm.get('option3')?.value,
          isRight: false,
          clarification:this.AddQuestionForm.get('clarification3')?.value
        }
    }
    if ((this.AddQuestionForm.get('option4')?.value)) {
      question.quizQuestionChoices[3]= {
          content: this.AddQuestionForm.get('option4')?.value,
          isRight: false,
          clarification:this.AddQuestionForm.get('clarification4')?.value
        }
    }

    if (this.AddQuestionForm.get('correctAnswer')?.value == "option1") {
      question.quizQuestionChoices[0].isRight = true;
    } else if (this.AddQuestionForm.get('correctAnswer')?.value == "option2") {
      question.quizQuestionChoices[1].isRight = true;
    }
    else if (this.AddQuestionForm.get('correctAnswer')?.value == "option3") {
      question.quizQuestionChoices[2].isRight = true;
    } else {
      question.quizQuestionChoices[3].isRight = true;
    }


    this._QuestionService.postQuestion(question).subscribe({
      next: (res) => {
        console.log(res);
        this.createQuestionForm();
        this.addQuestionBool = false;
        this.getSections()


    }
    })
  }

  getQuestions(id: any) {
    this.questions = []
    this.parentQuizId=id
    this._QuestionService.getQuestionsByQuizId(id).subscribe({
      next: (res) => {
        this.questions=res
      }
    })
  }

  getupdateQuestion(question: any, id: any) {
    console.log(question);
    this.updateQuestionBool = true;
    this.parentQuizId = id;
    this.idUpdateQuestion = question.id as number;
    this.AddQuestionForm.get('content')?.setValue(question.content),
    this.AddQuestionForm.get('option1')?.setValue(question.quizQuestionChoices[0].content),
    this.AddQuestionForm.get('clarification1')?.setValue(question.quizQuestionChoices[0].clarification??'')
    this.AddQuestionForm.get('option2')?.setValue(question.quizQuestionChoices[1].content),
    this.AddQuestionForm.get('clarification2')?.setValue(question.quizQuestionChoices[1].clarification??'')
    this.AddQuestionForm.get('option3')?.setValue(question.quizQuestionChoices[2]?.content),
    this.AddQuestionForm.get('clarification3')?.setValue(question.quizQuestionChoices[2]?.clarification??'')
    this.AddQuestionForm.get('option4')?.setValue(question.quizQuestionChoices[3]?.content),
    this.AddQuestionForm.get('clarification4')?.setValue(question.quizQuestionChoices[3]?.clarification??'')






    if (question.quizQuestionChoices[0].isRight == true) {
      this.AddQuestionForm.get('correctAnswer')?.setValue("option1")
    } else if (question.quizQuestionChoices[1].isRight == true) {
      this.AddQuestionForm.get('correctAnswer')?.setValue("option2")
    }
    else if (question.quizQuestionChoices[2].isRight == true) {
      this.AddQuestionForm.get('correctAnswer')?.setValue("option3")
    } else {
      this.AddQuestionForm.get('correctAnswer')?.setValue("option4")
    }

  }

  updateQuestion() {
      const question: any = {
      content: this.AddQuestionForm.get('content')?.value,
      quizQuestionChoices: [
        {
          content: this.AddQuestionForm.get('option1')?.value,
          isRight: false,
          clarification:this.AddQuestionForm.get('clarification1')?.value
        },
        {
          content: this.AddQuestionForm.get('option2')?.value,
          isRight: false,
          clarification:this.AddQuestionForm.get('clarification2')?.value
        }
      ]
    }


    if ((this.AddQuestionForm.get('option3')?.value)) {
      question.quizQuestionChoices[2]={
          description: this.AddQuestionForm.get('option3')?.value,
          isRight: false,
          clarification:this.AddQuestionForm.get('clarification3')?.value
        }
    }
    if ((this.AddQuestionForm.get('option4')?.value)) {
      question.quizQuestionChoices[3]= {
          description: this.AddQuestionForm.get('option4')?.value,
          isRight: false,
          clarification:this.AddQuestionForm.get('clarification4')?.value
        }
    }

    if (this.AddQuestionForm.get('correctAnswer')?.value == "option1") {
      question.quizQuestionChoices[0].isRight = true;
    } else if (this.AddQuestionForm.get('correctAnswer')?.value == "option2") {
      question.quizQuestionChoices[1].isRight = true;
    }
    else if (this.AddQuestionForm.get('correctAnswer')?.value == "option3") {
      question.quizQuestionChoices[2].isRight = true;
    } else {
      question.quizQuestionChoices[3].isRight = true;
    }
    console.log(question);

    this._QuestionService.updateQuestion(this.idUpdateQuestion, question).subscribe({
      next: (res) => {
        this.updateQuestionBool = false
        this.createQuestionForm()
        this.getSections()
      }
    })
   }

  deleteQuestion(id: any) {

    this._QuestionService.DeleteQuestion(id).subscribe({
      next: (res) => {
        this.getSections()
  }
})
  }
  deleteAnswer(id: any) {

    this._QuestionService.DeleteAnswer(id).subscribe({
      next: (res) => {
        this.getSections()
  }
})
  }
}
