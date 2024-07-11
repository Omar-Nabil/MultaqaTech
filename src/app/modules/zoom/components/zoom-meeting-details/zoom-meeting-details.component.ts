import { Component, OnInit } from '@angular/core';
import * as main from 'src/main';
import { ZoomsService } from '../../services/zooms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-zoom-meeting-details',
  templateUrl: './zoom-meeting-details.component.html',
  styleUrls: ['./zoom-meeting-details.component.scss']
})
export class ZoomMeetingDetailsComponent implements OnInit {

  details:any ={}
  isAuther:boolean = false;
  authName:string="";
  constructor( private route: ActivatedRoute , private _ZoomsService:ZoomsService, private router:Router){
    let {id} = route.snapshot.params;
    this.getMeetingDetails(id);



  }
  getMeetingDetails(id:string){
    this._ZoomsService.getMeetingDetailes(id).subscribe({
      next: (response) => {
         this.details = response;
         console.log(response)

         this.authName=response.authorName;
         console.log(this.authName)
         this.isAutherCheck();

      }
    })


  }
  ngOnInit(): void {
    main.start();

  }
  isAutherCheck() {
    let token = JSON.stringify(localStorage.getItem('userToken'));
    let userData : any = jwtDecode(token);
    console.log(userData);

    let userName = userData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'];
    console.log(userName);
    console.log(this.authName);

    if(userName == this.authName){
      this.isAuther = true;
    }
    console.log(this.isAuther);
  }
  deleteMeeting() {
    this._ZoomsService.deleteMeeting(this.details.id).subscribe({
      next:(res) => {
        console.log(res);
        this.router.navigate(['/zooms']);
      },
      error:(err) => console.log(err)

    })
  }

}
