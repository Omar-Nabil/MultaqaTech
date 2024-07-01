import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Eventcatigory} from'src/app/modules/dasdboard/interfaces/eventcatigory'
import { EventscategoriesService } from 'src/app/modules/dasdboard/services/eventscategories.service';


@Component({
  selector: 'app-eventscategories',
  templateUrl: './eventscategories.component.html',
  styleUrls: ['./eventscategories.component.scss']
})
export class EventscategoriesComponent {
  category: Eventcatigory ={name:""}
  categoryInput = new FormControl('');
  categoryupdate = new FormControl('');
  categorymsg: string = '';
  categorysucess: boolean = false;
  categoryfail: boolean = false;
  categories: Eventcatigory[] = []
  categoryupID:number=0

  constructor(private _EventscategoriesService: EventscategoriesService) {
    this.getcategories()

  }
  getcategories() {
    this._EventscategoriesService.getEventCategories().subscribe({
     next: (response) => {
        this.categories = response;
     }
   })
 }
 deletecategory(id: number) {
  this._EventscategoriesService.deleteEventCategory(id).subscribe({
    next:(response)=>{console.log(response);
    },
    error:(err)=>{console.log(err);
      this.getcategories()
    }
  })
  }
  updatecategory() {
    if (this.categoryupdate.value != null && this.categoryupdate.value != '') {
      this._EventscategoriesService.updateEventCategory(this.categoryupID, {name:this.categoryupdate.value!}).subscribe({
        next: (response) => {
          console.log(response);
          this.categoryupdate.setValue('')
          this.categorymsg = "Success"
          this.categorysucess = true
          setTimeout(() => {
            this.categorymsg = ''
            this.categorysucess = false
          }, 5000)

          this.getcategories()
        },
        error: (err) => {
          console.log(err);
          this.categorymsg = err.error.errors[0]
          this.categoryfail = true
          setTimeout(() => {
            this.categorymsg = ''
            this.categoryfail = false
          }, 5000)

        }
      })

    }
  }
  getcategory(id: number) {

    this._EventscategoriesService.getEventCategory(id).subscribe({
      next: (res) => {

        this.categoryupdate.setValue(res.name);
        this.categoryupID=res.id

      }
    })
  }
  add() {
    if (this.categoryInput.value != null && this.categoryInput.value != '')
    {
      this.category.name = this.categoryInput.value!;

      this._EventscategoriesService.addEventCategory(this.category).subscribe({
        next:(response)=> {
          console.log(response);
          this.categoryInput.setValue('')
          this.categorymsg="Success"
          this.categorysucess = true
          setTimeout(() => {
            this.categorymsg=''
          this.categorysucess = false
          }, 5000)

          this.getcategories()


        },
        error:(err)=> {
          console.log(err);
          this.categorymsg=err.error.errors[0]
          this.categoryfail = true
          setTimeout(() => {
            this.categorymsg=''
          this.categoryfail = false
          }, 5000)

        },
      })

    }
  }

}
