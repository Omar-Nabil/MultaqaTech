import { Component, OnInit } from '@angular/core';
import * as main from '../../../../../main';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CurriculumSectionService } from '../../services/curriculum-section.service';
import { item_get, section_get } from '../../interfaces/curriculum';
import { moveItemInArray } from '@angular/cdk/drag-drop'
import { CurriculumLectureService } from '../../services/curriculum-lecture.service';
import { CurriculumItemService } from '../../services/curriculum-item.service';

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
  sectionForm!: FormGroup;
  lectureForm!: FormGroup;
  sections:section_get[]=[]
  secttionIdForUpdate: any = 0
  lectureIdForUpdate: any = 0
  sectionReorder: number[] = []
  parentSectionId: number = 0
  addItemBool: boolean = false
  video!: File
  allItems: {
    id: number,
    items:item_get[]
  }[]=[]

  constructor(private _fb: FormBuilder, private _ActivatedRoute: ActivatedRoute
    , private _sectionService: CurriculumSectionService, private _lectureService: CurriculumLectureService
    ,private _itemsService:CurriculumItemService
  ) {
    this.createSectionForm()
    this.createLectureForm()
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

    onVideoChange(event:any) {
this.video=event.target.files[0]

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
    data.append('VideoUrl', this.video)
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

  getItems() {
    var items: item_get[];
    this.allItems=[]
         this.sections.forEach(element => {
          this._itemsService.getItemsforSection(element.id).subscribe({
            next: (res) => {
              items=res as item_get[];
              this.allItems.push({ id: element.id, items: items })
      }
        });
    })
  }

  getLectureForUpdate(id:any,parentId:any) {
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

  updateLecture() {
   const data = new FormData()
    data.append('Title',this.lectureForm.get('title')?.value)
    data.append('Description',this.lectureForm.get('description')?.value)
    data.append('VideoUrl', this.video)
    data.append('CurriculumSectionId', `${this.parentSectionId}`)

    this._lectureService.updateLecture(this.lectureIdForUpdate,data).subscribe({
      next: (res) => {
        this.getSections()
        this.updatelectureBool = false
        this.createLectureForm()
      }
    })
  }

  deleteLecture(id:any) {
    this._lectureService.deleteLecture(id).subscribe({
      next: (res) => {
        this.getSections()
      }
    })
  }
}
