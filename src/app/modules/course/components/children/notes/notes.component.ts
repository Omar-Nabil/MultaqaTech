import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { WcourseService } from '../../../services/Wcourse.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  allNotes:any[] = [];
  noteControl!:FormControl ;
  update:boolean = false;
  idToEdit:number = 0;
  indexToEdit:number = 0;


  constructor(private wcourseService:WcourseService) { }


  ngOnInit() {
    this.noteControl = new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ]);
    this.wcourseService.lectureOrQuizId.subscribe({
      next:(res) => {
        if(res != null) {
          this.getAllNotes();
        }
      }
    })
  }

  getAllNotes() {

    console.log(this.wcourseService.lectureOrQuizId.value);

    this.wcourseService.getAllNotes(this.wcourseService.lectureOrQuizId.value).subscribe({
      next:(res) => {
        console.log(res.data);
        this.allNotes = res.data;
      },
      error:(err) => console.log(err)

    })
  }

  submitNote() {
    var data = {
      content:this.noteControl.value,
      lectureId:+this.wcourseService.lectureOrQuizId.value
    };

    this.wcourseService.addNote(data).subscribe({
      next:(res) => {
        console.log(res);
        this.allNotes.push(res);
        this.noteControl.setValue('');
      }
    })
  }

  delteNote(id:number, index:number) {
    this.wcourseService.deleteNote(id).subscribe({
      next:(res) => {
        this.allNotes.splice(index, 1);
        console.log(res);

      },
      error:(err) => console.log(err)
    })
  }

  updateNote() {
    let data = {
      content:this.noteControl.value
    };
    this.wcourseService.updateNote(this.idToEdit, data).subscribe({
      next:(res) => {
        console.log(res);
        this.allNotes[this.indexToEdit] = res;
        this.update = false;
        this.noteControl.setValue('');
      },
      error:(err) => console.log(err)
    })
  }

  editNote(id:number, index:number) {
    this.noteControl.setValue(this.allNotes[index].content);
    this.update = true;
    this.idToEdit = id;
    this.indexToEdit = index
  }

}
