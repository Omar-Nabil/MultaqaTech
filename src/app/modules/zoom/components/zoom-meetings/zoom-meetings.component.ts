import { Component,OnInit } from '@angular/core';
import * as main from 'src/main';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ZoomsService } from '../../services/zooms.service';


@Component({
  selector: 'app-zoom-meetings',
  templateUrl: './zoom-meetings.component.html',
  styleUrls: ['./zoom-meetings.component.scss']
})
export class ZoomMeetingsComponent implements OnInit {
  meetings:any[] = [];
  categories:any[] = [];
  addMeetingForm!: FormGroup;
  previewUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  constructor(private _ZoomsService:ZoomsService){

  }

  ngOnInit(): void {
    main.start();

    this.getCategories();

    this.addMeetingForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'content': new FormControl(null, Validators.required),
      'startDate': new FormControl(null, Validators.required),
      'categoryId': new FormControl(null, Validators.required),
      'duration': new FormControl(null, Validators.required),
      'timeZone': new FormControl(null, Validators.required),
      'pictureUrl': new FormControl(null, Validators.required),

    });




  }
  // addMeeting() {
  //   const meetingData = {
  //     Title: this.addMeetingForm.get('title')?.value,
  //     Content: this.addMeetingForm.get('content')?.value,
  //     startDate: this.addMeetingForm.get('startDate')?.value,
  //     categoryId: this.addMeetingForm.get('categoryId')?.value,
  //     duration: this.addMeetingForm.get('duration')?.value,
  //     PictureUrl: this.addMeetingForm.get('pictureUrl')?.value,
  //     TimeZone: this.addMeetingForm.get('timeZone')?.value,
  //   }

  //   this._ZoomsService.postMeeting(meetingData).subscribe({
  //     next:(res) => {
  //       console.log(res);
  //       this.meetings.unshift(res);
  //     },
  //     error:(err) => console.log(err)

  //   })
  // }
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => this.previewUrl = reader.result;
      reader.readAsDataURL(file);
    }
  }
  addMeeting() {
    const formData = new FormData();
    formData.append('title', this.addMeetingForm.get('title')?.value);
    formData.append('content', this.addMeetingForm.get('content')?.value);
    formData.append('startDate', this.addMeetingForm.get('startDate')?.value);
    formData.append('TimeZone', this.addMeetingForm.get('TimeZone')?.value);
    formData.append('startDate', this.addMeetingForm.get('startDate')?.value);
    formData.append('duration', this.addMeetingForm.get('duration')?.value);
    formData.append('categoryId', this.addMeetingForm.get('categoryId')?.value);

    // Append the file to formData
    if (this.selectedFile) {
      formData.append('pictureUrl', this.selectedFile, this.selectedFile.name);
    }
    console.log(formData);

    this._ZoomsService.postMeeting(formData).subscribe({
      next:(res) => {
        console.log(res);
        this.meetings.unshift(res);
      },
      error:(err) => console.log(err)

    })
  }

  getCategories() {
    this._ZoomsService.getCategories().subscribe({
      next:(res) => {
        this.categories = res;
        console.log(this.categories);

      },
      error:(err) => console.log(err)
    })
  }
}
