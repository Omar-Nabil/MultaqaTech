import { Component } from '@angular/core';
import { FormControl, FormGroup,  Validators} from '@angular/forms';
import { SubjectService } from '../../services/subject.service';
import { Subject } from '../../interfaces/subject';
import { Course_add } from 'src/app/modules/courses/interfaces/course';

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
    courseLevel: 0,
    tagsIds: [],
    prerequisitesIds: [],
    learningObjectives: []
  }

  constructor(private _SubjectService: SubjectService) { }


  toggleMenu() {
    $(".dashboard-menu").toggleClass('open');
  }

  addCourseForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    language: new FormControl(''),
    img: new FormControl(''),
    price: new FormControl(''),
    learningobjectives: new FormControl(''),
    subject: new FormControl(0),
    tags: new FormControl(0),
    prerequisites: new FormControl(0),
    courselevel: new FormControl('0'),
  })

  getSubjects() {
    this._SubjectService.getsubjects().subscribe({
      next: (response) => {
        this.subjects = response;
      }
    })
  }


  log() {
    this.course.title = this.addCourseForm.get('title')?.value
    this.course.language = this.addCourseForm.get('language')?.value
    this.course.thumbnailUrl = this.addCourseForm.get('img')?.value
    this.course.price = this.addCourseForm.get('price')?.value
    this.course.subjectId = parseInt(this.addCourseForm.get('subject')?.value)
    this.tags.push(parseInt(this.addCourseForm.get('tags')?.value))
    this.course.tagsIds = this.tags
    this.prerequisites.push(parseInt(this.addCourseForm.get('prerequisites')?.value))
    this.course.prerequisitesIds = this.prerequisites
    this.course.courseLevel = parseInt(this.addCourseForm.get('courselevel')?.value)
    this.l_0bjects.push(this.addCourseForm.get('learningobjectives')?.value)
    console.log(this.course);

  }

  tag() {
    let tag = parseInt(this.addCourseForm.getRawValue().tags)
    if (tag != 0) {
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
}
