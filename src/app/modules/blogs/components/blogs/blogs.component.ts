import { Component, OnInit } from '@angular/core';
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

  constructor(private _BlogsService:BlogsService) {
    this.pages = new Array(4).fill("al").map((ele, index) => index + 1);
  }
  ngOnInit(): void {
    main.start();
    this.setCurrentPage(1);
    this.getCategories();
  }
  reduceUrl(url: string): string {
      // Check if the URL contains 'https://localhost:7264/'
      const index = url.indexOf('https://localhost:7264/');
      if (index !== -1) {
        // Remove the redundant part of the URL
        return url.substring(index + 'https://localhost:7264/'.length);
      } else {
        // URL doesn't need to be reduced
        return url;
      }
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

    this._BlogsService.filterByCategoryId(catId).subscribe({
      next:(res) => {
        console.log(res);
        this.blogs = res.data;
      },
      error:(err) => console.log(err)
    })
  }

}
