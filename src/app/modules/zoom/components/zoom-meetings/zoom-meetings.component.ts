import { Component,OnInit } from '@angular/core';
import * as main from 'src/main';


@Component({
  selector: 'app-zoom-meetings',
  templateUrl: './zoom-meetings.component.html',
  styleUrls: ['./zoom-meetings.component.scss']
})
export class ZoomMeetingsComponent implements OnInit {
  ngOnInit(): void {
    main.start();

  }
}
