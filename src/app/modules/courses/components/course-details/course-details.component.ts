import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { CourseService } from 'src/app/modules/courses/services/course.service';
import { CurriculumShowService } from 'src/app/modules/courses/services/curriculum-show.service';
import { start } from 'src/main';
import { Course_get } from '../../interfaces/course';
import { item_get, section_get } from '../../interfaces/curriculum';
import { Reviews_add } from '../../interfaces/reviews';
import { ReviewsService } from '../../services/reviews.service';



@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})

export class CourseDetailsComponent implements OnInit {
  userCourseUserName:string = '';
  instructorCourseUserName:string = '';

  isEnrolled:boolean = false;
  updatecommentbool: boolean = false
  toggler: boolean = false
  commentId:number=0
  course: Course_get | undefined=undefined
  levels: string[] = ['All levels', 'Beginner', 'Intermediate', 'Advanced'];
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  date = new Date()
  courseId:number=0
  sections:section_get[]=[]
  courseItems:any=[];
  allItems: {
    id: number,
    items:item_get[]
  }[]=[]
  AddcommentForm:FormGroup = new FormGroup({
    rating:new FormControl(0),
    Comment:new FormControl(''),
  })
  CourseAddedSuccessfully:boolean = false;
  cartItems: any;
  RecommendedCourses: Course_get[] = []
  LearningObjective = this.course?.learningObjectives[0].split(',');
  courseraiting=0

  constructor(private route:ActivatedRoute,private _CourseService:CourseService,private reviews:ReviewsService , private _CurriculumShowService:CurriculumShowService, private authService:AuthService) {
    this.getCourse();
    this.chaeckIfCourseInCart();
    let {id} = route.snapshot.params;
    this.getSections();
    let token = JSON.stringify(localStorage.getItem('userToken'));
    let decode:any = jwtDecode(token);
    console.log(decode['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname']);
    this.userCourseUserName = decode['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'];
    console.log(this.LearningObjective);

  }
  toggle(){
    this.toggler = !this.toggler;
  }
  toggleParagraph(section: section_get) {
    section.showParagraph = !section.showParagraph;
  }


  getSectionItems(id:string){
    this._CurriculumShowService.getItemsforSection(id).subscribe({
      next: (response) => {
        this.courseItems = response;

      }
    })
  }
  ngOnInit(): void {
    start();
     $('body,html').scrollTop(-10);
     this.route.params.subscribe(params => {
      // Update courseId with the new parameter value
      this.courseId = params['id'];
      // Call loadData with the new courseId
      this.getCourse();
    });
     this._CourseService.cartItems.subscribe(newcartItems => {
      this.CourseAddedSuccessfully = newcartItems?.some((course:any) => course?.courseId == this.course?.id);
     })
  }
  getSections() {
    this._CurriculumShowService.getSectionByCourseId(this.courseId).subscribe({
      /*next: (res) => {
        this.sections = res;
        this.getItems()
      }*/
      next: (res: section_get[]) => {
        this.sections = res.map(section => ({ ...section, showParagraph: false }));
        this.getItems()
      }
    })
  }
  getItems() {
    var items: item_get[];
    this.allItems=[]
         this.sections.forEach(element => {
          this._CurriculumShowService.getItemsforSection(element.id).subscribe({
            next: (res) => {
              items=res as item_get[];
              this.allItems.push({ id: element.id, items: items })
      }
        });
    })
  }
  chaeckIfCourseInCart() {
    this._CourseService.getBasketItems().subscribe({
      next:(res) => {
        console.log(res);
        this.cartItems = res.basketItems;
        console.log( this.cartItems );
        for(let i=0; i<this.cartItems.length; i++) {
          if(this.cartItems[i].courseId == this.course?.id) {
            this.CourseAddedSuccessfully = true;
          }
        }
        this._CourseService.cartItems.next(res.basketItems);
      },
      error:(err) => console.log(err)
    })
  }
  getCourse() {
   this.courseId= parseInt(this.route.snapshot.paramMap.get('id')!)
    if (this.courseId) {
      this._CourseService.getcourse(this.courseId).subscribe({
        next: (res) => {

          this.course = res
          this.date =new Date(this.course?.lastUpdatedDate!)
          this.getRecommendedCourses()
          console.log(res);
          this.isEnrolled = res.wasBoughtBySignedInUser;
          this.instructorCourseUserName = res.instructorName;
          this.LearningObjective = this.course?.learningObjectives[0].split(',')
          this.courseraiting=Math.round(this.course?.rating as number)
        },
        error: (err) => {
          console.log(err);

        }
      })
    }
}

  addcomment() {
    const Comment: Reviews_add = {
      courseId: this.course?.id!,
      content: this.AddcommentForm.get('Comment')?.value,
      numberOfStars:this.AddcommentForm.get('rating')?.value
    }
    this.reviews.addcomment(Comment).subscribe({
      next: (res) => {
        this.reset();
        this.getCourse()
        $('#collapseForm').slideUp(600)
      $('body,html').scrollTop($('.tutor-course-segment__review-commnet').offset()?.top! - 150)
      },
      error:(res)=>{console.log(res);
      }
    })
  }
  reset() {
  this.AddcommentForm.get('Comment')?.setValue('')
  this.AddcommentForm.get('rating')?.setValue('')
  }

  isgreater(n1: number, n2: number) {
    return n1>n2
  }
  isgreaterequal(n1: number, n2: number) {
    return n1>=n2
  }
  issmaller(n1: number, n2: number) {
    return n1<n2
  }
  issmallerequal(n1: number, n2: number) {
    return n1<=n2
  }

  slidedown() {
    $('#collapseForm').slideToggle(600)
  }

  Delete(id: number, review: Reviews_add) {
    console.log({
      courseid: this.courseId,
      id:id
    });

    this.reviews.deletecomment(id,review).subscribe((res) => {
      console.log(res);
      this.getCourse()

})
  }

  getcomment(i: number, id: number) {
    this.commentId = id;
    this.updatecommentbool=true
    $('#collapseForm').slideDown(600)
    $('body,html').scrollTop($('#collapseForm').offset()?.top! - 250)

    this.AddcommentForm.get('rating')?.setValue(this.course?.reviews[i].numberOfStars)
    this.AddcommentForm.get('Comment')?.setValue(this.course?.reviews[i].content)
  }

  updatecomment() {
    const Comment: Reviews_add = {
      courseId: this.course?.id!,
      content: this.AddcommentForm.get('Comment')?.value,
      numberOfStars:this.AddcommentForm.get('rating')?.value
    }
    console.log(this.commentId,Comment);

    this.reviews.updatecomment(this.commentId, Comment).subscribe((res) => {
      this.reset();
      this.getCourse()
      this.updatecommentbool = false
      $('#collapseForm').slideUp(600)
      $('body,html').scrollTop($('.tutor-course-segment__review-commnet').offset()?.top! - 150)
    })
  }

  AddCourseToCart() {

    this._CourseService.AddCourseToCart(this.course?.id).subscribe({
      next:(res) => {
        console.log(res);
        this.CourseAddedSuccessfully = true;
        this.cartItems = res.basketItems;
        this._CourseService.cartItems.next(res.basketItems);
      },
      error:(err) => console.log(err)
    })
  }

  getRecommendedCourses() {
    this._CourseService.getRecommendedCoursesId({ title: this.course?.title }).subscribe({
      next: (res) => {
        let coursesIds = res.slice(0, 5);
        console.log(coursesIds);
        let courses:Course_get[]=[]
        coursesIds.forEach((id:any) => {
          this._CourseService.getCourseById(id.Id).subscribe({
            next: (res) => {
              courses.push(res)
            }
          })
        });
        this.RecommendedCourses=courses
        console.log(this.RecommendedCourses);

      }
    })
  }
}
