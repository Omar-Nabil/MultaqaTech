import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EventCountry } from 'src/app/modules/dasdboard/interfaces/event-country';
import { EventscountriesService } from 'src/app/modules/dasdboard/services/eventscountries.service';

@Component({
  selector: 'app-eventscountries',
  templateUrl: './eventscountries.component.html',
  styleUrls: ['./eventscountries.component.scss']
})
export class EventscountriesComponent {
  country: EventCountry ={name:""}
  countryInput = new FormControl('');
  countryupdate = new FormControl('');
  countrymsg: string = '';
  countrysucess: boolean = false;
  countryfail: boolean = false;
  countries: EventCountry[] = []
  countryupID:number=0

  constructor(private _EventscountriesService: EventscountriesService) {
    this.getcountries()

  }
  getcountries() {
    this._EventscountriesService.getcountries().subscribe({
     next: (response) => {
        this.countries = response;
     }
   })
 }
 deletecountry(id: number) {
  this._EventscountriesService.deletecountry(id).subscribe({
    next:(response)=>{console.log(response);
    },
    error:(err)=>{console.log(err);
      this.getcountries()
    }
  })
  }
  updatecountry() {
    if (this.countryupdate.value != null && this.countryupdate.value != '') {
      this._EventscountriesService.updatecountry(this.countryupID, {name:this.countryupdate.value!}).subscribe({
        next: (response) => {
          console.log(response);
          this.countryupdate.setValue('')
          this.countrymsg = "Success"
          this.countrysucess = true
          setTimeout(() => {
            this.countrymsg = ''
            this.countrysucess = false
          }, 5000)

          this.getcountries()
        },
        error: (err) => {
          console.log(err);
          this.countrymsg = err.error.errors[0]
          this.countryfail = true
          setTimeout(() => {
            this.countrymsg = ''
            this.countryfail = false
          }, 5000)

        }
      })

    }
  }
  getcountry(id: number) {

    this._EventscountriesService.getcountry(id).subscribe({
      next: (res) => {

        this.countryupdate.setValue(res.name);
        this.countryupID=res.id

      }
    })
  }



  add() {
    if (this.countryInput.value != null && this.countryInput.value != '')
    {
      this.country.name = this.countryInput.value!;

      this._EventscountriesService.addcountry(this.country).subscribe({
        next:(response)=> {
          console.log(response);
          this.countryInput.setValue('')
          this.countrymsg="Success"
          this.countrysucess = true
          setTimeout(() => {
            this.countrymsg=''
          this.countrysucess = false
          }, 5000)

          this.getcountries()


        },
        error:(err)=> {
          console.log(err);
          this.countrymsg=err.error.errors[0]
          this.countryfail = true
          setTimeout(() => {
            this.countrymsg=''
          this.countryfail = false
          }, 5000)

        },
      })

    }
  }

}
