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
   isEditing:boolean[] = [];

   commentControl!:FormControl ;
   editComment!:FormControl ;
  constructor(private _BlogsService:BlogsService,private route: ActivatedRoute) {

    this.commentControl = new FormControl('', [
      Validators.required,
      Validators.minLength(20)
    ]);
    this.editComment = new FormControl('', [
      Validators.required,
      Validators.minLength(20)
    ]);
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
            console.log(this.blogDetailes.comments);

    this._BlogsService.addComment(data).subscribe({
      next:(res) => {
        console.log(res);
        // const comment = {
        //   blogPostId:res.blogPostId,
        //   commentContent:res.commentContent
        // }
        const comment = {
          id:res.id,
          commentContent:res.commentContent
        }

        console.log(this.blogDetailes.comments);

        this.blogDetailes.comments.push(comment);
        console.log(this.blogDetailes.comments);

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
  deleteComment(Id:string, index:number) {
    this._BlogsService.deleteCommentById(Id).subscribe({
      next:(res) => {

      },
      error:(err) => {

        console.log(this.blogDetailes.comments);
        this.blogDetailes.comments.splice(index, 1);
        console.log(this.blogDetailes.comments);
      }
    })
  }


  applyEdit(index:number) {
    this.isEditing[index] = true;
    console.log(this.isEditing[index]);
    this.editComment.setValue(this.blogDetailes.comments[index].commentContent );
  }

  saveChanges(Id:string, index:number) {
    const comment = {
      blogPostId: Id,
      commentContent: this.editComment.value
    }
    console.log(comment);

    this._BlogsService.updateCommentById(comment).subscribe({
      next:(res) => {
        console.log(res);
        this.blogDetailes.comments[index].commentContent = comment.commentContent;
        this.isEditing[index] = false;
      },
      error:(err) => console.log(err)
    })
  }


}
