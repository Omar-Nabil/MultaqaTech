import { Component, OnInit } from '@angular/core';
import * as main from 'src/main';

@Component({
  selector: 'app-zoom-meeting-details',
  templateUrl: './zoom-meeting-details.component.html',
  styleUrls: ['./zoom-meeting-details.component.scss']
})
export class ZoomMeetingDetailsComponent implements OnInit {
  ngOnInit(): void {
    main.start();

  }

}
