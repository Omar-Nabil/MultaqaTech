import { Component, OnInit } from '@angular/core';
import * as main from '../../../../../main';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CurriculumSectionService } from '../../services/curriculum-section.service';
import { section_get } from '../../interfaces/curriculum';
import {moveItemInArray} from '@angular/cdk/drag-drop'
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
  sectionForm!: FormGroup;
  sections:section_get[]=[]
  secttionIdForUpdate: any = 0
  sectionReorder: number[] = []
  parentSectionId: number = 0
  addItemBool:boolean=false

  constructor(private _fb: FormBuilder, private _ActivatedRoute: ActivatedRoute
    ,private _sectionService:CurriculumSectionService
  ) {
    this.createSectionForm()
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
    this.addItemBool=true
  }
  addItem() {
    this.addItemBool=false
  }
}
