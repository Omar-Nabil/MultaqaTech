import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as main from '../../../../../main';
import { BlogsService } from '../../services/blogs.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  pages:number[] = [];
  currentPage:number = 1;
  blogs:any[] = [];
  searchText:string = '';
  categories:any[] = [];
  subjects:any[]=[];
  addBlogForm!: FormGroup;


  showDropdown = false;
  constructor(private _BlogsService:BlogsService) {
    this.pages = new Array(6).fill("al").map((ele, index) => index + 1);
  }
  ngOnInit(): void {
    main.start();
    this.setCurrentPage(1);
    this.getCategories();
    this.getSubjects();
    this.addBlogForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'content': new FormControl(null, Validators.required),
      'pictureUrl': new FormControl(null, Validators.required),
      'categoryId': new FormControl(null, Validators.required),
      'subjectId': new FormControl([], Validators.required),
    });
  }
  addBlog() {
    const blogData = {
      title: this.addBlogForm.get('title')?.value,
      content: this.addBlogForm.get('content')?.value,
      pictureUrl: this.addBlogForm.get('pictureUrl')?.value,
      categoryId: this.addBlogForm.get('categoryId')?.value,
      tags: this.addBlogForm.get('subjectId')?.value
    }

    this._BlogsService.postBlog(blogData).subscribe({
      next:(res) => {
        console.log(res);
        this.blogs.unshift(res);
      },
      error:(err) => console.log(err)

    })
  }
  isSelected(subjectId: number): boolean {
 const selectedSubjectIds = this.addBlogForm.get('subjectId')?.value;
 return selectedSubjectIds.includes(subjectId);
}

  onSubjectChange(event: any, subjectId: number) {
    const subjectIds = this.addBlogForm.get('subjectId')?.value;
    if (event.target.checked) {
      // Add the subject ID to the array if it's not already there
      if (!subjectIds.includes(subjectId)) {
        subjectIds.push(subjectId);
      }
    } else {
      // Remove the subject ID from the array
      const index = subjectIds.indexOf(subjectId);
      if (index > -1) {
        subjectIds.splice(index, 1);
      }
    }
    this.addBlogForm.get('subjectId')?.setValue(subjectIds);
    console.log(subjectIds);

 }
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  getCategories() {
    this._BlogsService.getCategories().subscribe({
      next:(res) => {
        this.categories = res;
        console.log(this.categories);

      },
      error:(err) => console.log(err)
    })
  }
  getSubjects() {
    this._BlogsService.getSubjects().subscribe({
      next:(res) => {
        this.subjects = res;
        console.log(res);


      },
      error:(err) => console.log(err)
    })
  }
  setCurrentPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this._BlogsService.getCurrentPage(pageNumber).subscribe({
      next:(res) => {
        console.log(res);
        this.blogs = res.data;
      },
      error:(err) => console.log(err)

    })
  }
  inputSearchChange(event:any) {
    this.searchText = event.target.value;;
  }
  blogsSearch() {
    this._BlogsService.blogsSearch(this.searchText, this.currentPage).subscribe({
      next:(res:any) => {
        console.log(res);
        this.blogs = res.data;
      },
      error:(err) => console.log(err)
    })

  }

  filterByCategory(catId:number) {
    console.log(catId);

    this._BlogsService.filterByCategoryId(catId, this.currentPage).subscribe({
      next:(res) => {
        console.log(res);
        this.blogs = res.data;
      },
      error:(err) => console.log(err)
    })
  }

}
