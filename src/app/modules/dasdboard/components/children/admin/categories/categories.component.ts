import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Categories } from 'src/app/modules/dasdboard/interfaces/categories';
import { MyServiceService } from 'src/app/modules/dasdboard/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  category: Categories ={name:""}
  categoryInput = new FormControl('');
  categoryupdate = new FormControl('');
  categorymsg: string = '';
  categorysucess: boolean = false;
  categoryfail: boolean = false;
  categories: Categories[] = []
  categoryupID:number=0

  constructor(private _MyServiceService: MyServiceService) {
    this.getcategories()

  }

  getcategories() {
     this._MyServiceService.getcategories().subscribe({
      next: (response) => {
         this.categories = response;
      }
    })
  }

  deletecategory(id: number) {
    this._MyServiceService.deletecategory(id).subscribe({
      next:(response)=>{console.log(response);
      },
      error:(err)=>{console.log(err);
        this.getcategories()
      }
    })

  }
  updatecategory() {
    if (this.categoryupdate.value != null && this.categoryupdate.value != '') {
      this._MyServiceService.updatecategory(this.categoryupID, {name:this.categoryupdate.value!}).subscribe({
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

    this._MyServiceService.getcategory(id).subscribe({
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

      this._MyServiceService.addcategory(this.category).subscribe({
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
