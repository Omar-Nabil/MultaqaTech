import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import * as main from '../../../../../../main';
import { EventserviceService } from 'src/app/modules/event/services/eventservice.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  eventDetailes:any;
  eventSpeakerDetailes:any;
  speakers:any[] = [];
  eventId:string = '';
  isEditing:boolean[] = [];
  eventsByCategory:any[]=[];
  commentControl!:FormControl ;
  editComment!:FormControl ;
  isAuther:boolean = false;
  previewUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  categories:any[] = [];
  countries:any[]=[];
  editEventForm!: FormGroup;
  addEventSpeakerForm!: FormGroup;
  editEventSpeakerForm!: FormGroup;
  showDropdown = false;
  existingEventPost: any;
  instructorForm!: FormGroup;

  constructor(private _EventserviceService:EventserviceService,private route: ActivatedRoute,private router:Router) {
    this.commentControl = new FormControl('', [Validators.required,Validators.minLength(20)]);
    this.editComment = new FormControl('', [Validators.required,Validators.minLength(20)]);

  }
  ngOnInit(): void {
    main.start();
    this.getEventDetailes();
    this.getCategories();
    this.getCountries();
    this.getSpeakers();



    this.editEventForm =  new FormGroup({
      'title': new FormControl(null, Validators.required),
      'dateFrom': new FormControl(null, Validators.required),
      'dateTo': new FormControl(null, Validators.required),
      'timeFrom': new FormControl(null, Validators.required),
      'timeTo': new FormControl(null, Validators.required),
      'aboutTheEvent': new FormControl(null, Validators.required),
      'address': new FormControl(null, Validators.required),
      'phoneNumber': new FormControl(null, Validators.required),
      'price': new FormControl(null, Validators.required),
      'website': new FormControl(null, Validators.required),
      'pictureUrl': new FormControl(null, Validators.required),
      'categoryId': new FormControl(null, Validators.required),
      'countryId': new FormControl([], Validators.required),
    });
    this.addEventSpeakerForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'jobTitle': new FormControl(null, Validators.required),
      'pictureUrl': new FormControl(null, Validators.required),

    });
    this.editEventSpeakerForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'jobTitle': new FormControl(null, Validators.required),
      'pictureUrl': new FormControl(null, Validators.required),

    });
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
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

  EditYourEvent() {
    this.editEventForm.setValue({
      title: this.eventDetailes.title,
      aboutTheEvent: this.eventDetailes.aboutTheEvent,
      pictureUrl: this.eventDetailes.pictureUrl,
      dateFrom: this.eventDetailes.dateFrom,
      dateTo: this.eventDetailes.dateTo,
      timeFrom: this.eventDetailes.timeFrom,
      timeTo: this.eventDetailes.timeTo,
      address: this.eventDetailes.address,
      phoneNumber: this.eventDetailes.phoneNumber,
      price: this.eventDetailes.price,
      website: this.eventDetailes.website,
      countryId: this.eventDetailes.countryId,
      categoryId: this.eventDetailes.categoryId,
    });
  }
  submitEditYourEvent() {
    const formData = new FormData();
    formData.append('title', this.editEventForm.get('title')?.value);
    formData.append('dateFrom', this.editEventForm.get('dateFrom')?.value);
    formData.append('dateTo', this.editEventForm.get('dateTo')?.value);
    formData.append('timeFrom', this.editEventForm.get('timeFrom')?.value);
    formData.append('timeTo', this.editEventForm.get('timeTo')?.value);
    formData.append('aboutTheEvent', this.editEventForm.get('aboutTheEvent')?.value);
    formData.append('address', this.editEventForm.get('address')?.value);
    formData.append('phoneNumber', this.editEventForm.get('phoneNumber')?.value);
    formData.append('price', this.editEventForm.get('price')?.value);
    formData.append('website', this.editEventForm.get('website')?.value);
    formData.append('countryId', this.editEventForm.get('countryId')?.value);
    formData.append('categoryId', this.editEventForm.get('categoryId')?.value);
    if (this.selectedFile) {
      formData.append('pictureUrl', this.selectedFile, this.selectedFile.name);
    }else {
      formData.append('pictureUrl', this.editEventForm.get('pictureUrl')?.value);
    }
    console.log(formData);

    this._EventserviceService.editEvent(formData, this.eventDetailes.id).subscribe({
      next:(res) => {
        this.eventDetailes = res;
        console.log(res);
      },
      error:(err) => console.log(err)
    })
  }
  getCategories() {
    this._EventserviceService.getCategories().subscribe({
      next:(res) => {
        this.categories = res;
        console.log(this.categories);

      },
      error:(err) => console.log(err)
    })
  }
  getCountries() {
    this._EventserviceService.getCountries().subscribe({
      next:(res) => {
        this.countries = res;
        console.log(this.categories);

      },
      error:(err) => console.log(err)
    })
  }
  getEventsByCategory(id:string) {
    this._EventserviceService.getEventsWithCategory(id).subscribe({
      next:(res) => {
        console.log(res.data);
        this.eventsByCategory = res.data;
      },
      error:(err) => {
        console.log(err);

      }
    })
  }
  deleteYourEvent() {
    this._EventserviceService.deleteEvent(this.eventDetailes.id).subscribe({
      next:(res) => {
        console.log(res);
        this.router.navigate(['/events']);
      },
      error:(err) => console.log(err)

    })
  }
  isAutherCheck() {
    let token = JSON.stringify(localStorage.getItem('userToken'));
    let userData : any = jwtDecode(token);
    console.log(userData);

    let userName = userData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'];
    console.log(userName);
    console.log(this.eventDetailes.eventBy);

    if(userName == this.eventDetailes?.eventBy){
      this.isAuther = true;
    }
    console.log(this.isAuther);
  }
  getEventDetailes() {

    let eventId = this.route.snapshot.paramMap.get('id');
    console.log(eventId);

    if (eventId !== null) {
      this._EventserviceService.getEventDetailes(eventId).subscribe({
        next:(res) => {
          console.log(res);
          this.eventDetailes = res;
          this.getEventsByCategory(res.categoryId);
          this.isAutherCheck();
        }
      });
    } else {
      console.error("Event id is null");
    }

  }
  getEvent() {
    this.getEventDetailes();
    window.scrollTo({
    top: 0,
    behavior: 'smooth'
    });
  }
  submitComment() {
    const data = {
      commentContent:this.commentControl.value,
      eventId:this.route.snapshot.paramMap.get('id')
    }
    console.log(data);
    console.log(this.eventDetailes.comments);

    this._EventserviceService.addComment(data).subscribe({
      next:(res) => {
        console.log(res);
        const comment = {
          id:res.id,
          commentContent:res.commentContent
        }

        console.log(this.eventDetailes.comments);

        this.eventDetailes.comments.push(comment);
        console.log(this.eventDetailes.comments);

        this.commentControl.setValue('');
      },
      error:(err) => console.log(err)
    })
 }
 deleteComment(Id:string, index:number) {
    this._EventserviceService.deleteCommentById(Id).subscribe({
      next:(res) => {
        console.log(res);
        console.log(this.eventDetailes.comments);
        this.eventDetailes.comments.splice(index, 1);
        console.log(this.eventDetailes.comments);
      },
      error:(err) => {
        console.log(err);
      }
    })
  }
  applyEdit(index:number) {
    this.isEditing[index] = true;
    console.log(this.isEditing[index]);
    this.editComment.setValue(this.eventDetailes.comments[index].commentContent );
  }

  saveChanges(Id:string, index:number) {
    const comment = {
      eventId: Id,
      commentContent: this.editComment.value
    }
    console.log(comment);

    this._EventserviceService.updateCommentById(comment).subscribe({
      next:(res) => {
        console.log(res);
        this.eventDetailes.comments[index].commentContent = comment.commentContent;
        this.isEditing[index] = false;
      },
      error:(err) => console.log(err)
    })
  }
  addEventSpeaker() {
    const formData = new FormData();
    formData.append('Name', this.addEventSpeakerForm.get('named')?.value);
    formData.append('JobTitle', this.addEventSpeakerForm.get('jobTitle')?.value);
    formData.append('EventId', this.addEventSpeakerForm.get('EventId')?.value);


    // Append the file to formData
    if (this.selectedFile) {
      formData.append('PictureUrl', this.selectedFile, this.selectedFile.name);
    }
    console.log(formData);

    this._EventserviceService.addEventSpeaker(formData).subscribe({
      next:(res) => {
        console.log(res);
        this.speakers.unshift(res);
        console.log(this.speakers)
      },
      error:(err) => console.log(err)

    })
  }

  editEventSpeaker() {
    this.editEventForm.setValue({
      name: this.eventSpeakerDetailes.name,
      jobTitle: this.eventSpeakerDetailes.jobTitle,
      pictureUrl: this.eventSpeakerDetailes.pictureUrl,
    });
  }
  submitEditEventSpeaker() {
    const formData = new FormData();
    formData.append('name', this.editEventSpeakerForm.get('name')?.value);
    formData.append('jobTitle', this.editEventSpeakerForm.get('jobTitle')?.value);
    if (this.selectedFile) {
      formData.append('pictureUrl', this.selectedFile, this.selectedFile.name);
    }else {
      formData.append('pictureUrl', this.editEventSpeakerForm.get('pictureUrl')?.value);
    }
    console.log(formData);

    this._EventserviceService.editEvent(formData, this.eventSpeakerDetailes.id).subscribe({
      next:(res) => {
        this.eventSpeakerDetailes = res;
        console.log(res);
      },
      error:(err) => console.log(err)
    })
  }
  getSpeakers() {
    this._EventserviceService.getSpeakers().subscribe({
      next:(res) => {
        this.speakers = res;
        console.log(this.speakers);

      },
      error:(err) => console.log(err)
    })
  }

  deleteEventSpeaker(id: string) {
  this._EventserviceService.deleteEventSpeaker(id).subscribe({
    next:(response)=>{console.log(response);
    },
    error:(err)=>{console.log(err);

    }
  })
}
}
