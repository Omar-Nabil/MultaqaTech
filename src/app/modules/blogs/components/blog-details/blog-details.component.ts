import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  previewUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  categories:any[] = [];
  subjects:any[]=[];
  editBlogForm!: FormGroup;
  showDropdown = false;

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
  existingBlogPost: any;
  ngOnInit(): void {
    main.start();
    this.getBlogDetailes();
    this.getSubjects();
    this.getCategories();

    // Initialize the form with the existing blog post data
    this.editBlogForm =  new FormGroup({
      'title': new FormControl(null, Validators.required),
      'content': new FormControl(null, Validators.required),
      'pictureUrl': new FormControl(null, Validators.required),
      'categoryId': new FormControl(null, Validators.required),
      'subjectId': new FormControl([], Validators.required),
    });
  }
   toggleDropdown() {
    this.showDropdown = !this.showDropdown;
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
 isSelected(subjectId: number): boolean {
    const selectedSubjectIds = this.editBlogForm.get('subjectId')?.value;
    return selectedSubjectIds.includes(subjectId);
 }

 onSubjectChange(event: any, subjectId: number) {
    const subjectIds = this.editBlogForm.get('subjectId')?.value;
    if (event.target.checked) {
      if (!subjectIds.includes(subjectId)) {
        subjectIds.push(subjectId);
      }
    } else {
      const index = subjectIds.indexOf(subjectId);
      if (index > -1) {
        subjectIds.splice(index, 1);
      }
    }
    this.editBlogForm.get('subjectId')?.setValue(subjectIds);
 }

  EditYourPost() {
    this.editBlogForm.setValue({
      title: this.blogDetailes.title,
      content: this.blogDetailes.content,
      pictureUrl: this.blogDetailes.pictureUrl,
      categoryId: this.blogDetailes.categoryId,
      subjectId: []
    });
  }
  submitEditYourPost() {
    const formData = new FormData();
    formData.append('title', this.editBlogForm.get('title')?.value);
    formData.append('content', this.editBlogForm.get('content')?.value);
    formData.append('categoryId', this.editBlogForm.get('categoryId')?.value);

    // Handle subjects
    const selectedSubjects = this.editBlogForm.get('subjectId')?.value;
    selectedSubjects.forEach((subjectId: any) => {
      formData.append('subjectId', subjectId);
    });

    // Append the file to formData
    if (this.selectedFile) {
      formData.append('pictureUrl', this.selectedFile, this.selectedFile.name);
    } else {
      // If no new file is selected, use the existing picture URL
      formData.append('pictureUrl', this.editBlogForm.get('pictureUrl')?.value);
    }
    this._BlogsService.editBlog(formData, this.blogDetailes.id).subscribe({
      next:(res) => {
        this.blogDetailes = res;
        console.log(res);

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
  getCategories() {
    this._BlogsService.getCategories().subscribe({
      next:(res) => {
        this.categories = res;
        console.log(this.categories);

      },
      error:(err) => console.log(err)
    })
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
    console.log(userData);

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

  formatDate(dateString:string):string {
    let publishingDate = new Date(dateString);
    return `${publishingDate.getFullYear()}-${String(publishingDate.getMonth() + 1).padStart(2, '0')}-${String(publishingDate.getDate()).padStart(2, '0')} ${publishingDate.getHours()}:${publishingDate.getMinutes().toString().padStart(2, '0')}`;
  }


}
