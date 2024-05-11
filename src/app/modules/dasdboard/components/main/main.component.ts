import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Course_add } from 'src/app/modules/courses/interfaces/course';
import { CourseService } from '../../../courses/services/course.service';
import { Subject } from '../../interfaces/subject';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  subjects: Subject[] = []
  tags: number[] = []
  tagsNames: string[] = []
  prerequisites: number[] = []
  prerequisitesNames: string[] = []
  l_0bjects: string[] = []



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

  constructor(private _SubjectService: SubjectService, private _CourseService: CourseService,private router:Router,private authService:AuthService
) {

   }


  toggleMenu() {
    $(".dashboard-menu").toggleClass('open');
  }

  addCourseForm: FormGroup = new FormGroup({
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

  getSubjects() {
    this._SubjectService.getsubjects().subscribe({
      next: (response) => {
        this.subjects = response;
      }
    })
  }


  Addcourse() {
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


      this._CourseService.addcourse(this.course).subscribe({
        next: (res) => {
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

  logout() {
    this.authService.logout().subscribe({
      next:(res) => {
        console.log(res);
        localStorage.removeItem("userToken");
        this.authService.userData.next(null);
        this.router.navigate(['/welcome']);
      },
      error:(err) => {
        console.log("Logout error:", err);
        if (err.status === 401) {
          console.log("Unauthorized: Please login again.");
          // Handle unauthorized error, maybe redirect to login page
        } else {
          console.log("An error occurred:", err.error);
        }
      }

    })
  }
}
