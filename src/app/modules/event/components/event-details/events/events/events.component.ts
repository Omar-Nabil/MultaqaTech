import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as main from '../../../../../../../main';
import { EventserviceService } from 'src/app/modules/event/services/eventservice.service';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent {
  pages:number[] = [];
  currentPage:number = 1;
  events:any[] = [];
  searchText:string = '';
  categories:any[] = [];
  countries:any[] = [];
  addEventForm!: FormGroup;
  previewUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  showDropdown = false;


  constructor(private _EventserviceService:EventserviceService) {
    this.pages = new Array(6).fill("al").map((ele, index) => index + 1);
  }
  ngOnInit(): void {
    main.start();
    this.setCurrentPage(1);
    this.getCategories();
    this.getCountries();
    this.addEventForm = new FormGroup({
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
  addEvent() {
    const formData = new FormData();
    formData.append('title', this.addEventForm.get('title')?.value);
    formData.append('dateFrom', this.addEventForm.get('dateFrom')?.value);
    formData.append('dateTo', this.addEventForm.get('dateTo')?.value);
    formData.append('timeFrom', this.addEventForm.get('timeFrom')?.value);
    formData.append('timeTo', this.addEventForm.get('timeTo')?.value);
    formData.append('aboutTheEvent', this.addEventForm.get('aboutTheEvent')?.value);
    formData.append('address', this.addEventForm.get('address')?.value);
    formData.append('phoneNumber', this.addEventForm.get('phoneNumber')?.value);
    formData.append('price', this.addEventForm.get('price')?.value);
    formData.append('website', this.addEventForm.get('website')?.value);
    formData.append('countryId', this.addEventForm.get('countryId')?.value);
    formData.append('categoryId', this.addEventForm.get('categoryId')?.value);

    // Append the file to formData
    if (this.selectedFile) {
      formData.append('pictureUrl', this.selectedFile, this.selectedFile.name);
    }
    console.log(formData);

    this._EventserviceService.addEvent(formData).subscribe({
      next:(res) => {
        console.log(res);
        this.events.unshift(res);
      },
      error:(err) => console.log(err)

    })
  }
  onCountryChange(event: any, countryId: number) {
    const countryIds = this.addEventForm.get('countryId')?.value;
    if (event.target.checked) {
      // Add the subject ID to the array if it's not already there
      if (!countryIds.includes(countryId)) {
        countryIds.push(countryId);
      }
    } else {
      // Remove the subject ID from the array
      const index = countryIds.indexOf(countryId);
      if (index > -1) {
        countryIds.splice(index, 1);
      }
    }
    this.addEventForm.get('countryId')?.setValue(countryIds);
    console.log(countryIds);
  }

   toggleDropdown() {
    this.showDropdown = !this.showDropdown;
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
        console.log(this.countries);

      },
      error:(err) => console.log(err)
    })
  }
  setCurrentPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this._EventserviceService.getCurrentPage(pageNumber).subscribe({
      next:(res) => {
        console.log(res);
        this.events = res.data;
      },
      error:(err) => console.log(err)

    })
  }
  inputSearchChange(event:any) {
    this.searchText = event.target.value;;
  }
  eventsSearch() {
    this._EventserviceService.eventsSearch(this.searchText, this.currentPage).subscribe({
      next:(res:any) => {
        console.log(res);
        this.events = res.data;
      },
      error:(err) => console.log(err)
    })

  }
  filterByCategory(catId:number) {
    console.log(catId);

    this._EventserviceService.filterByCategoryId(catId, this.currentPage).subscribe({
      next:(res) => {
        console.log(res);
        this.events = res.data;
      },
      error:(err) => console.log(err)
    })
  }
  filterByCountry(countryId:number) {
    console.log(countryId);

    this._EventserviceService.filterByCountryId(countryId, this.currentPage).subscribe({
      next:(res) => {
        console.log(res);
        this.events = res.data;
      },
      error:(err) => console.log(err)
    })
  }

}
