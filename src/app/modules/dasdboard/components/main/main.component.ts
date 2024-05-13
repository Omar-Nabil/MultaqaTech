import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,  Validators} from '@angular/forms';
import { SubjectService } from '../../services/subject.service';
import { Subject } from '../../interfaces/subject';
import { Course_add } from 'src/app/modules/courses/interfaces/course';
import { CourseService } from '../../../courses/services/course.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

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
  currentUser!: User;
  instructorForm!: FormGroup;
  img!: File;

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

  constructor(private _SubjectService: SubjectService, private _CourseService: CourseService,
    private router: Router,private _AuthService:AuthService,private _fb:FormBuilder
) {
    this.getCurrentUser()
    this.createInstructorForm()
   }


  createInstructorForm() {
    this.instructorForm = this._fb.group({
      bio:['',Validators.required],
      jobtitle:['',Validators.required],
      picture:['',Validators.required]
    })
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
    localStorage.removeItem('userToken')
    this.router.navigate(['/welcome'])
  }

  getCurrentUser() {
    this._AuthService.getCurrentUser().subscribe({
      next: (res) => {
        this.currentUser=res
  }
})
  }
  onImgChange(event:any) {
this.img=event.target.files[0]

  }

  addInstructor() {
    const data = new FormData();
    data.append('Bio',this.instructorForm.get('bio')?.value)
    data.append('JobTitle',this.instructorForm.get('jobtitle')?.value)
    data.append('ProfilePicture', this.img ,this.img.name)

    this._AuthService.addInstructor(data).subscribe({
      next: (res) => {
        this.getCurrentUser();
        console.log(res);
        this.createInstructorForm();

  }
})
  }
}
