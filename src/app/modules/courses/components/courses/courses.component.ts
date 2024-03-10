import { Component, OnInit } from '@angular/core';
import * as main from '../../../../../main';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  ngOnInit(): void {
    main.start();
  }

}
