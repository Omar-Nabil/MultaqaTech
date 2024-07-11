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
 addCourseForm!: FormGroup;
  course: Course_add = {
    subjectId: 0,
    title: 'string',
    language: 'string',
    thumbnail: 'string',
    price: 0,
    level: 0,
    tagsIds: [],
    prerequisitesIds: [],
    learningObjectives: []
  }
  successCourseBool:boolean=false
  failCourseBool:boolean=false
  SubjectFailCourseBool:boolean=false

  constructor(private _SubjectService: SubjectService, private _CourseService: CourseService,
    private router: Router,private _AuthService:AuthService,private _fb:FormBuilder
) {
    this.getCurrentUser()
    this.createInstructorForm()
    this.createCourseForm()
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


  createCourseForm() {
     this.addCourseForm = new FormGroup({
    title: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(100)]),
    language: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
    img: new FormControl('',[Validators.required]),
    price: new FormControl('',[Validators.required,Validators.max(2147483647),Validators.min(0)]),
    learningobjectives: new FormControl(''),
    subject: new FormControl(0,[Validators.required]),
    tags: new FormControl(0,[Validators.required]),
    prerequisites: new FormControl(0,[Validators.required]),
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


  Addcourse() {
    this.successCourseBool = false
    this.failCourseBool = false
    this.SubjectFailCourseBool=false
    if (!this.addCourseForm.get('title')?.errors && !this.addCourseForm.get('language')?.errors && !this.addCourseForm.get('price')?.errors && this.addCourseForm.get('subject')?.value != '0') {
      let data = new FormData();

data.append('title',this.addCourseForm.get('title')?.value)
data.append('language',this.addCourseForm.get('language')?.value)
data.append('thumbnail',this.img)
data.append('price',this.addCourseForm.get('price')?.value)
data.append('subjectId',this.addCourseForm.get('subject')?.value)
data.append('level',this.addCourseForm.get('courselevel')?.value)
data.append('tagsIds',`${this.tags}`)
data.append('prerequisitesIds',`${this.prerequisites}`)
data.append('learningObjectives',`${this.l_0bjects}`)

console.log(this.addCourseForm.valid);

      this._CourseService.addcourse(data).subscribe({
        next: (res) => {
          console.log(res);
          this.reset()
          this.successCourseBool=true
        },
        error: (err) => {
          console.log(err);
          this.failCourseBool=true
        }
      })
    }
    else {
this.SubjectFailCourseBool=true
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
    this._AuthService.logout().subscribe({
      next:(res) => {
        console.log(res);
        localStorage.removeItem("userToken");
        this._AuthService.userData.next(null);
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

  getCurrentUser() {
    this._AuthService.getCurrentUser().subscribe({
      next: (res) => {
        this.currentUser = res
         this._AuthService.currentUser.next(res)
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
        this.createInstructorForm();
        this._AuthService.currentUser.next(res)
        this._AuthService.currentUser.subscribe(n => {
          console.log(n);

        })


  }
})
  }

}
