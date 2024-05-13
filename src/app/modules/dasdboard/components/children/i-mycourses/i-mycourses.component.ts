import { Component, Input } from '@angular/core';
import { User } from '../../../interfaces/user';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Course_add, Course_get } from 'src/app/modules/courses/interfaces/course';
import { CourseService } from 'src/app/modules/courses/services/course.service';
import { Subject } from '../../../interfaces/subject';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubjectService } from '../../../services/subject.service';


@Component({
  selector: 'app-i-mycourses',
  templateUrl: './i-mycourses.component.html',
  styleUrls: ['./i-mycourses.component.scss']
})
export class IMycoursesComponent {
  updateCourseId:number=0
  currentUser!: User;
  instructorCourses: Course_get[] = [];
  length: number = 0;
   subjects: Subject[] = []
  tags: number[] = []
  tagsNames: string[] = []
  prerequisites: number[] = []
  prerequisitesNames: string[] = []
  l_0bjects: string[] = []
   addCourseForm!: FormGroup;
  course: Course_add = {
    subjectId: 0,
    title: 'string',
    language: 'string',
    thumbnailUrl: 'string',
    price: 0,
    level: 0,
    tagsIds: [],
    prerequisitesIds: [],
    learningObjectives: []
  }

  constructor(private _AuthService: AuthService, private _CourseService: CourseService,
    private _SubjectService:SubjectService) {
    _AuthService.currentUser.subscribe(n => {
      this.currentUser = n;
      console.log(this.currentUser);

    })
    this.getInstructorCourses()
    this.createCourseForm()

  }

  getInstructorCourses() {
    this._CourseService.getCoursesbyInstructorId(this.currentUser.instructorId).subscribe({
      next: (res) => {
        this.instructorCourses = res.data;
        console.log(this.instructorCourses);
        this.length=res.count
      }
    })
  }

 createCourseForm() {
     this.addCourseForm = new FormGroup({
    title: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(100)]),
    language: new FormControl('',[Validators.minLength(3),Validators.maxLength(50)]),
    img: new FormControl('',),
    price: new FormControl('',[Validators.required,Validators.max(2147483647),Validators.min(0)]),
    learningobjectives: new FormControl(''),
    subject: new FormControl(0,[Validators.required]),
    tags: new FormControl(0),
    prerequisites: new FormControl(0),
    courselevel: new FormControl('0',[Validators.required]),
  })
  }

   getSubjects() {
    this._SubjectService.getsubjects().subscribe({
      next: (response) => {
        this.subjects = response;
      }
    })
  }


  updateCourse() {
    if (!this.addCourseForm.get('title')?.errors && !this.addCourseForm.get('language')?.errors && !this.addCourseForm.get('price')?.errors && this.addCourseForm.get('subject')?.value != '0') {
      this.course.subjectId = parseInt(this.addCourseForm.get('subject')?.value)
      this.course.title = this.addCourseForm.get('title')?.value
      this.course.language = this.addCourseForm.get('language')?.value
      this.course.thumbnailUrl = this.addCourseForm.get('img')?.value
      this.course.price = this.addCourseForm.get('price')?.value
      this.course.level = parseInt(this.addCourseForm.get('courselevel')?.value)
      this.course.tagsIds = this.tags
      this.course.prerequisitesIds = this.prerequisites
      this.course.learningObjectives = this.l_0bjects
      console.log(this.course);


      this._CourseService.updateCourse(this.updateCourseId,this.course).subscribe({
        next: (res) => {
          this.getInstructorCourses()
          console.log(res);
          this.reset()
        },
        error: (err) => {
          console.log(err);
        }
      })
    }

  }

  tag() {
    let tag = parseInt(this.addCourseForm.getRawValue().tags)
    if (tag != 0 &&  !this.prerequisites.includes(tag)) {
      this.tags.push(tag)
       this.subjects.forEach(element => {
          if (tag == element.id) {
              this.tagsNames.push(element.name)
          }
       });
      console.log(this.tagsNames);

    }

  }
  prerequisite() {
      let prerequisite = parseInt(this.addCourseForm.getRawValue().prerequisites)
      if (prerequisite != 0 &&  !this.prerequisites.includes(prerequisite) ) {

        this.prerequisites.push(prerequisite)
        this.subjects.forEach(element => {
          if (prerequisite == element.id) {
              this.prerequisitesNames.push(element.name)
          }
        });
      }

  }
  learningObjectives() {
    let x: string = ' ';x.toLowerCase
    let objective = this.addCourseForm.getRawValue().learningobjectives.toLowerCase()
    console.log(objective.trim()=='');

      if (objective.trim() != '' && objective != undefined &&  !this.l_0bjects.includes(objective.trim()) ) {

        this.l_0bjects.push(objective.trim())

      }
console.log(this.l_0bjects);

  }

  deletefromarray(i: number, arr: number[], arr2: string[]) {
    console.log('delete');

    arr.splice(i,1)
    arr2.splice(i, 1)
    console.log(arr2);

  }

  reset() {
    this.prerequisites=[]
    this.prerequisitesNames = []
    this.tags=[]
    this.tagsNames = []
    this.l_0bjects = []
    this.addCourseForm.reset()
    this.addCourseForm.get('subject')?.setValue(0)
    this.addCourseForm.get('tags')?.setValue(0)
    this.addCourseForm.get('prerequisites')?.setValue(0)
    this.addCourseForm.get('courselevel')?.setValue('0')
  }
  editingCourse(id:any) {
    this.updateCourseId = id
    this.getSubjects()
    this._CourseService.getCourseById(id).subscribe({
      next: (res) => {
        console.log(res);

        const course: Course_get = res;
        this.subjects.forEach(subject => {
          if (subject.name == course.subject) {
            this.addCourseForm.get('subject')?.setValue(subject.id)
          }
          course.prerequisites.forEach(prerequisite => {
            if (subject.name == prerequisite) {
            this.prerequisites.push(subject.id as number)
          }
          });
          course.tags.forEach(tag => {
            if (subject.name == tag) {
            this.tags.push(subject.id as number)
          }
          });
        });

    this.prerequisitesNames = course.prerequisites
    this.tagsNames = course.tags
    this.l_0bjects = course.learningObjectives
    this.addCourseForm.get('title')?.setValue(course.title)
    this.addCourseForm.get('img')?.setValue(course.thumbnailUrl)
    this.addCourseForm.get('price')?.setValue(course.price)
    this.addCourseForm.get('tags')?.setValue(0)
    this.addCourseForm.get('prerequisites')?.setValue(0)
    this.addCourseForm.get('courselevel')?.setValue(`${course.level}`)

  }
})
  }

  deleteCourse(id:any) {
    this._CourseService.deleteCourseById(id).subscribe({
      next: (res) => {
        this.getInstructorCourses()
        console.log(res);

      }
    })
  }
}
