import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as main from '../../../../../main';
import { BlogsService } from '../../services/blogs.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent {
  blogDetailes:any;
   blogId:string = '';
   commentControl = new FormControl('', [
    Validators.required,
    Validators.minLength(20)
 ]);
  constructor(private _BlogsService:BlogsService,private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    main.start();
    this.getBlogDetailes();
  }
  submitComment() {
    const data = {
      commentContent:this.commentControl.value,
      blogPostId:this.route.snapshot.paramMap.get('id')
    }
    console.log(data);

    this._BlogsService.addComment(data).subscribe({
      next:(res) => {
        console.log(res);
        this.blogDetailes.comments.push(res.commentContent);
        this.commentControl.setValue('');
      },
      error:(err) => console.log(err)
    })
 }
  getBlogDetailes() {

    let blogId = this.route.snapshot.paramMap.get('id');
    if (blogId !== null) {
      this._BlogsService.getBlogDetailes(blogId).subscribe({
        next:(res) => {
          console.log(res);
          this.blogDetailes = res;
        }
      });
    } else {
      console.error("Blog ID is null");
    }

  }
    reduceUrl(url: string): string {
 // Check if the URL is null or undefined
 if (!url) {
    // Return an empty string or a default image URL
    return ''; // or 'path/to/default/image.jpg'
 }

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



}
