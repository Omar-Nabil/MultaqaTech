import { Component } from '@angular/core';
import { FormControl} from '@angular/forms';

@Component({
  selector: 'app-i-mycourses',
  templateUrl: './i-mycourses.component.html',
  styleUrls: ['./i-mycourses.component.scss']
})
export class IMycoursesComponent {

  subject = new FormControl('');



  displayInput() {
    $('.input').slideToggle()
  }
}
