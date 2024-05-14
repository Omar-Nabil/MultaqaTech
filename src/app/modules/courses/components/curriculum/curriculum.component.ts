import { Component, OnInit } from '@angular/core';
import * as main from '../../../../../main';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss']
})
export class CurriculumComponent implements OnInit{

  ngOnInit() {
    main.start()
  }
}
