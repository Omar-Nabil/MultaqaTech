import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import * as main from '../../../../../main';
import { BlogsService } from '../../services/blogs.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
  blogDetailes:any;
   blogId:string = '';
   isEditing:boolean[] = [];
   blogsByCategory:any[]=[];
  linkCopiedSuccessfully:boolean = false;
   commentControl!:FormControl ;
   editComment!:FormControl ;
   isAuther:boolean = false;
  constructor(private _BlogsService:BlogsService,
              private route: ActivatedRoute,
              private router:Router) {
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
  deleteYourPost() {
    this._BlogsService.deleteBlog(this.blogDetailes.id).subscribe({
      next:(res) => {
        console.log(res);
        this.router.navigate(['/blogs']);
      },
      error:(err) => console.log(err)

    })
  }
  isAutherCheck() {
    let token = JSON.stringify(localStorage.getItem('userToken'));
    let userData : any = jwtDecode(token);
    let userName = userData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'];
    console.log(userName);
    console.log(this.blogDetailes.authorName);

    if(userName == this.blogDetailes?.authorName){
      this.isAuther = true;
    }
    console.log(this.isAuther);

  }
  getBlog() {
    this.getBlogDetailes();
       window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
  }
  shareBlog(id:string) {


    this._BlogsService.shareBlog(id).subscribe({
      next:(res) => {
        navigator.clipboard.writeText(res.shareLink)
        .then(() => {
          this.linkCopiedSuccessfully = true;
          setTimeout(() => {
            this.linkCopiedSuccessfully = false;
          },2000);
        })
        .catch((error) => {
          console.error('Failed to copy link to clipboard:', error);
        });
      },
      error:(err) => console.log(err)
    })
  }
  getBlogsByCategory(id:string) {
    this._BlogsService.getBlogsWithCategory(id).subscribe({
      next:(res) => {
        console.log(res.data);
        this.blogsByCategory = res.data;
      },
      error:(err) => {
        console.log(err);

      }
    })
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
    console.log(blogId);

    if (blogId !== null) {
      this._BlogsService.getBlogDetailes(blogId).subscribe({
        next:(res) => {
          console.log(res);
          this.blogDetailes = res;
          this.getBlogsByCategory(res.categoryId);
          this.isAutherCheck();
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
        console.log(res);
        console.log(this.blogDetailes.comments);
        this.blogDetailes.comments.splice(index, 1);
        console.log(this.blogDetailes.comments);
      },
      error:(err) => {
        console.log(err);
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
