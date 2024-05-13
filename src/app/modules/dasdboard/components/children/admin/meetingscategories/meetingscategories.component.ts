import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Meetingscategory } from 'src/app/modules/dasdboard/interfaces/meetingscategory';
import { MeetingscategoriesService } from 'src/app/modules/dasdboard/services/meetingscategories.service';

@Component({
  selector: 'app-meetingscategories',
  templateUrl: './meetingscategories.component.html',
  styleUrls: ['./meetingscategories.component.scss']
})
export class MeetingscategoriesComponent {
  meetingCategory: Meetingscategory ={name:""}
  meetingCategoryInput = new FormControl('');
  meetingCategoryupdate = new FormControl('');
  meetingCategorymsg: string = '';
  meetingCategorysucess: boolean = false;
  meetingCategoryfail: boolean = false;
  meetingesCategories: Meetingscategory[] = []
  meetingCategoryupID:number=0
  constructor(private _MeetingscategoriesService : MeetingscategoriesService){

  }
  getcategories() {
    this._MeetingscategoriesService.getcategories().subscribe({
     next: (response) => {
        this.meetingesCategories = response;
     }
   })
 }

 deletecategory(id: number) {
   this._MeetingscategoriesService.deletecategory(id).subscribe({
     next:(response)=>{console.log(response);
     },
     error:(err)=>{console.log(err);
       this.getcategories()
     }
   })

 }
 updatecategory() {
   if (this.meetingCategoryupdate.value != null && this.meetingCategoryupdate.value != '') {
     this._MeetingscategoriesService.updatecategory(this.meetingCategoryupID, {name:this.meetingCategoryupdate.value!}).subscribe({
       next: (response) => {
         console.log(response);
         this.meetingCategoryupdate.setValue('')
         this.meetingCategorymsg = "Success"
         this.meetingCategorysucess = true
         setTimeout(() => {
           this.meetingCategorymsg = ''
           this.meetingCategorysucess = false
         }, 5000)

         this.getcategories()
       },
       error: (err) => {
         console.log(err);
         this.meetingCategorymsg = err.error.errors[0]
         this.meetingCategoryfail = true
         setTimeout(() => {
           this.meetingCategorymsg = ''
           this.meetingCategoryfail = false
         }, 5000)

       }
     })

   }
 }

getcategory(id: number) {

   this._MeetingscategoriesService.getcategory(id).subscribe({
     next: (res) => {

       this.meetingCategoryupdate.setValue(res.name);
       this.meetingCategoryupID=res.id

     }
   })
 }



 add() {
   if (this.meetingCategoryInput.value != null && this.meetingCategoryInput.value != '')
   {
     this.meetingCategory.name = this.meetingCategoryInput.value!;

     this._MeetingscategoriesService.addcategory(this.meetingCategory).subscribe({
       next:(response)=> {
         console.log(response);
         this.meetingCategoryInput.setValue('')
         this.meetingCategorymsg="Success"
         this.meetingCategorysucess = true
         setTimeout(() => {
           this.meetingCategorymsg=''
         this.meetingCategorysucess = false
         }, 5000)

         this.getcategories()


       },
       error:(err)=> {
         console.log(err);
         this.meetingCategorymsg=err.error.errors[0]
         this.meetingCategoryfail = true
         setTimeout(() => {
           this.meetingCategorymsg=''
         this.meetingCategoryfail = false
         }, 5000)

       },
     })

   }
 }


}
