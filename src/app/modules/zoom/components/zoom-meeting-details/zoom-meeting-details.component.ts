import { Component, OnInit } from '@angular/core';
import * as main from 'src/main';
import { ZoomsService } from '../../services/zooms.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-zoom-meeting-details',
  templateUrl: './zoom-meeting-details.component.html',
  styleUrls: ['./zoom-meeting-details.component.scss']
})
export class ZoomMeetingDetailsComponent implements OnInit {

  details:any ={}

  constructor( private route: ActivatedRoute , private _ZoomsService:ZoomsService){
    let {id} = route.snapshot.params;
    this.getMeetingDetails(id)
  }
  getMeetingDetails(id:string){
    this._ZoomsService.getMeetingDetailes(id).subscribe({
      next: (response) => {
         this.details = response;

      }
    })


  }
  ngOnInit(): void {
    main.start();

  }

}
