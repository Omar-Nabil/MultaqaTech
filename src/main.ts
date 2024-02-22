import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as Aos from 'aos';
import * as bootstrap from 'bootstrap';
import flatpickr from "flatpickr";
import GLightbox from 'glightbox';
import * as $ from 'jquery';
import * as parallax from 'parallax-js';
import PerfectScrollbar from 'perfect-scrollbar';
import "select2";
import Swiper from 'swiper';
import { AppModule } from './app/app.module';

// import './assets/js/plugins/nice-select.min.js';
// import sticky from 'sticky-kit'
// import  niceSelect from 'jquery-nice-select';
// import  powerTip from 'jquery-powertip';


// const sticky = require('sticky-kit')
// const niceSelect = require('jquery-nice-select')
// const GLightbox = require('glightbox')
const powerTip = require('jquery-powertip')

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


export function start() {
  /*--
		Banner Height
    -----------------------------------*/


      const header: JQuery<HTMLElement> = $('.header-section');
      const headerHeight: any = header.innerHeight();
      const banner: JQuery<HTMLElement> = $('.slider-wrapper, .page-banner__wrapper');
      const nextElem: JQuery<HTMLElement> = header.next();

      if (header.hasClass('header-sticky') == true) {
        banner.css({
          // 'min-height' : 'calc(100vh - ' + headerHeight + 'px)',
          'margin-top': headerHeight + 'px'
        });
        nextElem.css({
          'margin-top': headerHeight + 'px'
        });
      }


 /*--
		Header Sticky
    -----------------------------------*/
   $(window).on('scroll', function(event: Event) {
    var scroll: any = $(window).scrollTop();
    if (scroll <= 100) {
        $(".header-sticky").removeClass("sticky");
        $(".header-sticky .header-main-04 .header-logo img, .header-sticky .header-main-05 .header-logo img").attr("src", "assets/images/light-logo.png");
    } else {
        $(".header-sticky").addClass("sticky");
        $(".header-sticky .header-main-04 .header-logo img, .header-sticky .header-main-05 .header-logo img").attr("src", "assets/images/dark-logo.png");
    }
});


    /*--
		Sub menu viewport position
    -----------------------------------*/
   const windows: JQuery<Window> = $(window);

if ($(".menu-primary__container>li").find('.sub-menu').length) {
    const elm: JQuery<HTMLElement> = $(".menu-primary__container>li").find('.sub-menu');

    elm.each(function(){
        const off : JQuery.Coordinates = $(this).offset()!;
        const l: number = off.left;
        const w: number = $(this).width()!;
        const docH: any = windows.height();
        const docW: number = windows.width()! - 10;
        const isEntirelyVisible: boolean = (l + w <= docW);

        if (!isEntirelyVisible) {
            $(this).addClass('left');
        }
    });
}


 /*--
		Mobile Search Doropdown
    -----------------------------------*/
    $(".search-open").click(function(){
        $(".header-serach").toggleClass('open');
    });



    // /*--
		// Menu Active
    // -----------------------------------*/
    // $(function () {
    // var url = window.location.pathname;
    // var activePage = url.substring(url.lastIndexOf('/') + 1);
    //  var list = $('.dashboard-nav__menu-list li a').each(function () {

    //         var linkPage = this.href.substring(this.href.lastIndexOf('/') + 1);

    //         if (activePage == linkPage) {
    //             $(this).closest("li").addClass("active");
    //         }
    //     });
    // })
  /*--
		Menu Active
    -----------------------------------*/
    $(function () {
    var url = window.location.pathname;
    var activePage = url.substring(url.lastIndexOf('/') + 1);
      $('.dashboard-nav__menu-list li a').each(function () {
        var linkPage;
          if (this instanceof HTMLAnchorElement) {
       linkPage = this.href.substring(this.href.lastIndexOf('/') + 1);
    }


            if (activePage == linkPage) {
                $(this).closest("li").addClass("active");
            }
        });
    })


    /*--
        Off Canvas Menu
    -----------------------------------*/
    /*Variables*/
    var $offCanvasNav = $('.canvas-menu'),
    $offCanvasNavSubMenu = $offCanvasNav.find('.sub-menu, .mega-menu, .menu-item ');

    /*Add Toggle Button With Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.parent().prepend('<span class="mobile-menu-expand"></span>');

    /*Close Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.slideUp();

    /*Category Sub Menu Toggle*/
    $offCanvasNav.on('click', 'li a, li .mobile-menu-expand, li .menu-title', function(e) {
        var $this = $(this);
        if (($this.parent().attr('class')!.match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/)) && ($this.attr('href') === '#' || $this.hasClass('mobile-menu-expand'))) {
            e.preventDefault();
            if ($this.siblings('ul:visible').length) {
                $this.parent('li').removeClass('active-expand');
                $this.siblings('ul').slideUp();
            } else {
                $this.parent('li').addClass('active-expand');
                $this.closest('li').siblings('li').find('ul:visible').slideUp();
                $this.closest('li').siblings('li').removeClass('active-expand');
                $this.siblings('ul').slideDown();
            }
        }
    });

    $( ".sub-menu, .mega-menu, .menu-item" ).parent( "li" ).addClass( "menu-item-has-children" );
    $( ".mega-menu" ).parent( "li" ).addClass( "mega-menu-children" );


   /*--
        parallax
    -----------------------------------*/



        var scene:any = document.querySelectorAll('.scene');

    scene.forEach((el: HTMLElement)=>{
        var parallaxInstance = new (parallax as any)(el, {
            pointerEvents: true,
        });

    })


    /*--
		Mobile Search Doropdown
    -----------------------------------*/
    $(".btn-toggle").click(function(){
        $(".dashboard-menu").addClass('open');
    });
    $(".close-btn").click(function(){
        $(".dashboard-menu").removeClass('open');
    });


  /*--
		Demo Option Toggle
    -----------------------------------*/
    $(".demo-open").click(function(){
        $(".edumall-demo-option").toggleClass('open');
    });


     /*--
        Testimonial
    -----------------------------------*/
    var swiper = new Swiper('.testimonial-active .swiper', {
        slidesPerView: 3,
        spaceBetween: 30,
        speed: 1000,
        loop: true,
        pagination: {
            el: ".testimonial-active .swiper-pagination",
            clickable: true,
      },

        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1200: {
                slidesPerView: 3,
            }
        },

    });


   /*--
        Testimonial 02
    -----------------------------------*/
    var swiper = new Swiper('.testimonial-active-02 .swiper', {
        slidesPerView: 3,
        spaceBetween: 30,
        speed: 1000,
        loop: true,
        pagination: {
            el: ".testimonial-active-02 .swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1200: {
                slidesPerView: 4,
            }
        }
    });


   /*--
        Testimonial 03
    -----------------------------------*/
    var swiper = new Swiper('.testimonial-active-03 .swiper', {
        slidesPerView: 2,
        spaceBetween: 30,
        speed: 1000,
        loop: true,
        pagination: {
            el: ".testimonial-active-03 .swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1200: {
                slidesPerView: 2,
            }
        }
    });

  /*--
        Courses Tab
    -----------------------------------*/
    var swiper = new Swiper('.course-tab-active .swiper', {
        slidesPerView: 5,
        spaceBetween: 30,
        speed: 1000,
        loop: true,
        navigation: {
            nextEl: ".course-tab-active .swiper-button-next",
            prevEl: ".course-tab-active .swiper-button-prev",
        },
        pagination: {
            el: ".course-tab-active .swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 5,
            }
        }
    });

   /*--
        Courses
    -----------------------------------*/
    var swiper = new Swiper('.course-active .swiper', {
        slidesPerView: 4,
        spaceBetween: 30,
        speed: 1000,
        loop: true,
        navigation: {
            nextEl: ".course-active .swiper-button-next",
            prevEl: ".course-active .swiper-button-prev",
        },
        pagination: {
            el: ".course-active .swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            }
        }
    });

  /*--
        Category
    -----------------------------------*/
    var swiper = new Swiper('.category-active .swiper', {
        slidesPerView: 5,
        spaceBetween: 30,
        speed: 1000,
        loop: true,
        pagination: {
            el: ".category-active .swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".category-active .swiper-button-next",
            prevEl: ".category-active .swiper-button-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 5,
            }
        }
    });


    /*--
        Partners
    -----------------------------------*/
    var swiper = new Swiper('.partners-active .swiper', {
        slidesPerView: 5,
        spaceBetween: 30,
        loop: true,
        speed: 1000,
        navigation: {
            nextEl: ".partners-active .swiper-button-next",
            prevEl: ".partners-active .swiper-button-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 3,
            },
            576: {
                slidesPerView: 4,
            },
            768: {
                slidesPerView: 5,
            },
            992: {
                slidesPerView: 6,
            },
            1200: {
                slidesPerView: 7,
            }
        }
    });


    /*--
        Event
    -----------------------------------*/
    var swiper = new Swiper('.event-active .swiper', {
        slidesPerView: 3,
        spaceBetween: 30,
        speed: 1000,
        loop: true,
        pagination: {
            el: ".event-active .swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".event-active .swiper-button-next",
            prevEl: ".event-active .swiper-button-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            }
        }
    });


    /*--
        Event 02
    -----------------------------------*/
    var swiper = new Swiper('.event-active-02 .swiper', {
        slidesPerView: 4,
        spaceBetween: 30,
        speed: 1000,
        loop: true,
        navigation: {
            nextEl: ".event-active-02 .swiper-button-next",
            prevEl: ".event-active-02 .swiper-button-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            }
        }
    });


    /*--
        Banner
    -----------------------------------*/
    var swiper = new Swiper('.banner-active .swiper', {
        slidesPerView: 3,
        spaceBetween: 30,
        speed: 1000,
        loop: true,
        navigation: {
            nextEl: ".banner-active .swiper-button-next",
            prevEl: ".banner-active .swiper-button-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            }
        }
    });


    /*--
        Instructors
    -----------------------------------*/
    var swiper = new Swiper('.instructor-active .swiper', {
        slidesPerView: 4,
        spaceBetween: 30,
        speed: 1000,
        loop: true,
        navigation: {
            nextEl: ".instructor-active .swiper-button-next",
            prevEl: ".instructor-active .swiper-button-prev",
        },
        pagination: {
            el: ".instructor-active .swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            }
        }
    });


    /*--
        Related Posts
    -----------------------------------*/
    var swiper = new Swiper('.related-posts .swiper', {
        slidesPerView: 3,
        spaceBetween: 30,
        speed: 1000,
        loop: true,
        navigation: {
            nextEl: ".related-posts .swiper-button-next",
            prevEl: ".related-posts .swiper-button-prev",
        },
        pagination: {
            el: ".related-posts .swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 2,
            },
            1200: {
                slidesPerView: 3,
            }
        }
    });


    /*--
        Speaker
    -----------------------------------*/
    var swiper = new Swiper('.speaker-active .swiper', {
        slidesPerView: 5,
        spaceBetween: 30,
        speed: 1000,
        loop: true,
        pagination: {
            el: ".speaker-active .swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".speaker-active .swiper-button-next",
            prevEl: ".speaker-active .swiper-button-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 5,
            }
        }
    });


    /*--
        Related Products
    -----------------------------------*/
    var swiper = new Swiper('.related-products-active .swiper', {
        slidesPerView: 5,
        spaceBetween: 30,
        speed: 1000,
        loop: false,
        pagination: {
            el: ".related-products-active .swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".related-products-active .swiper-button-next",
            prevEl: ".related-products-active .swiper-button-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 5,
            }
        }
    });


    /*--
        Shop single Product
    -----------------------------------*/
    var swiper = new Swiper(".shop-single-product__image-thumbs  .swiper", {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
    });
    var swiper2 = new Swiper(".shop-single-product__image-main  .swiper", {
        spaceBetween: 10,
        speed: 1000,
        thumbs: {
          swiper: swiper,
        },
    });



    /*--
        Countdown
    -----------------------------------*/
    // function makeTimer($endDate, $this, $format) {
    //     var today = new Date();
    //     var BigDay = new Date($endDate),
    //       msPerDay = 24 * 60 * 60 * 1000,
    //       timeLeft = (BigDay.getTime() - today.getTime()),
    //       e_daysLeft = timeLeft / msPerDay,
    //       daysLeft = Math.floor(e_daysLeft),
    //       e_hrsLeft = (e_daysLeft - daysLeft) * 24,
    //       hrsLeft = Math.floor(e_hrsLeft),
    //       e_minsLeft = (e_hrsLeft - hrsLeft) * 60,
    //       minsLeft = Math.floor((e_hrsLeft - hrsLeft) * 60),
    //       e_secsLeft = (e_minsLeft - minsLeft) * 60,
    //       secsLeft = Math.floor((e_minsLeft - minsLeft) * 60);

    //     var yearsLeft = 0;
    //     var monthsLeft = 0
    //     var weeksLeft = 0;

    //     if ($format != 'short') {
    //       if (daysLeft > 365) {
    //         yearsLeft = Math.floor(daysLeft / 365);
    //         daysLeft = daysLeft % 365;
    //       }

    //       if (daysLeft > 30) {
    //         monthsLeft = Math.floor(daysLeft / 30);
    //         daysLeft = daysLeft % 30;
    //       }
    //       if (daysLeft > 7) {
    //         weeksLeft = Math.floor(daysLeft / 7);
    //         daysLeft = daysLeft % 7;
    //       }
    //     }

    //     var yearsLeft = yearsLeft < 10 ? "0" + yearsLeft : yearsLeft,
    //       monthsLeft = monthsLeft < 10 ? "0" + monthsLeft : monthsLeft,
    //       weeksLeft = weeksLeft < 10 ? "0" + weeksLeft : weeksLeft,
    //       daysLeft = daysLeft < 10 ? "0" + daysLeft : daysLeft,
    //       hrsLeft = hrsLeft < 10 ? "0" + hrsLeft : hrsLeft,
    //       minsLeft = minsLeft < 10 ? "0" + minsLeft : minsLeft,
    //       secsLeft = secsLeft < 10 ? "0" + secsLeft : secsLeft,
    //       yearsText = yearsLeft > 1 ? 'Years' : 'year',
    //       monthsText = monthsLeft > 1 ? 'Months' : 'month',
    //       weeksText = weeksLeft > 1 ? 'Weeks' : 'week',
    //       daysText = daysLeft > 1 ? 'Days' : 'day',
    //       hourText = hrsLeft > 1 ? 'Hours' : 'hr',
    //       minsText = minsLeft > 1 ? 'Mints' : 'min',
    //       secText = secsLeft > 1 ? 'Secs' : 'sec';

    //     var $markup = {
    //       wrapper: $this.find('.countdown__item'),
    //       year: $this.find('.yearsLeft'),
    //       month: $this.find('.monthsLeft'),
    //       week: $this.find('.weeksLeft'),
    //       day: $this.find('.daysLeft'),
    //       hour: $this.find('.hoursLeft'),
    //       minute: $this.find('.minsLeft'),
    //       second: $this.find('.secsLeft'),
    //       yearTxt: $this.find('.yearsText'),
    //       monthTxt: $this.find('.monthsText'),
    //       weekTxt: $this.find('.weeksText'),
    //       dayTxt: $this.find('.daysText'),
    //       hourTxt: $this.find('.hoursText'),
    //       minTxt: $this.find('.minsText'),
    //       secTxt: $this.find('.secsText')
    //     }

    //     var elNumber = $markup.wrapper.length;
    //     $this.addClass('item-' + elNumber);
    //     $($markup.year).html(yearsLeft);
    //     $($markup.yearTxt).html(yearsText);
    //     $($markup.month).html(monthsLeft);
    //     $($markup.monthTxt).html(monthsText);
    //     $($markup.week).html(weeksLeft);
    //     $($markup.weekTxt).html(weeksText);
    //     $($markup.day).html(daysLeft);
    //     $($markup.dayTxt).html(daysText);
    //     $($markup.hour).html(hrsLeft);
    //     $($markup.hourTxt).html(hourText);
    //     $($markup.minute).html(minsLeft);
    //     $($markup.minTxt).html(minsText);
    //     $($markup.second).html(secsLeft);
    //     $($markup.secTxt).html(secText);
    // }

    // $('.countdown').each(function () {
    //     var $this = $(this);
    //     var $endDate = $(this).data('countdown');
    //     var $format = $(this).data('format');
    //     setInterval(function () {
    //       makeTimer($endDate, $this, $format);
    //     }, 0);
    // });

  function makeTimer(endDate: string, format: string): void {
  const today: Date = new Date();
  const BigDay: Date = new Date(endDate);
  const msPerDay: number = 24 * 60 * 60 * 1000;
  const timeLeft: number = BigDay.getTime() - today.getTime();
  const e_daysLeft: number = timeLeft / msPerDay;
  let daysLeft: number = Math.floor(e_daysLeft);
  const e_hrsLeft: number = (e_daysLeft - daysLeft) * 24;
  let hrsLeft: number = Math.floor(e_hrsLeft);
  const e_minsLeft: number = (e_hrsLeft - hrsLeft) * 60;
  let minsLeft: number = Math.floor((e_hrsLeft - hrsLeft) * 60);
  const e_secsLeft: number = (e_minsLeft - minsLeft) * 60;
  let secsLeft: number = Math.floor((e_minsLeft - minsLeft) * 60);

  let yearsLeft: number = 0;
  let monthsLeft: number = 0;
  let weeksLeft: number = 0;

  if (format !== 'short') {
    if (daysLeft > 365) {
      yearsLeft = Math.floor(daysLeft / 365);
      daysLeft = daysLeft % 365;
    }

    if (daysLeft > 30) {
      monthsLeft = Math.floor(daysLeft / 30);
      daysLeft = daysLeft % 30;
    }
    if (daysLeft > 7) {
      weeksLeft = Math.floor(daysLeft / 7);
      daysLeft = daysLeft % 7;
    }
  }

  const yearsText: string = yearsLeft > 1 ? 'Years' : 'year';
  const monthsText: string = monthsLeft > 1 ? 'Months' : 'month';
  const weeksText: string = weeksLeft > 1 ? 'Weeks' : 'week';
  const daysText: string = daysLeft > 1 ? 'Days' : 'day';
  const hourText: string = hrsLeft > 1 ? 'Hours' : 'hr';
  const minsText: string = minsLeft > 1 ? 'Mints' : 'min';
  const secText: string = secsLeft > 1 ? 'Secs' : 'sec';

  const $markup = {
    wrapper: $('.countdown__item'),
    year: $('.yearsLeft'),
    month: $('.monthsLeft'),
    week: $('.weeksLeft'),
    day: $('.daysLeft'),
    hour: $('.hoursLeft'),
    minute: $('.minsLeft'),
    second: $('.secsLeft'),
    yearTxt: $('.yearsText'),
    monthTxt: $('.monthsText'),
    weekTxt: $('.weeksText'),
    dayTxt: $('.daysText'),
    hourTxt: $('.hoursText'),
    minTxt: $('.minsText'),
    secTxt: $('.secsText')
  };

  const elNumber: number = $markup.wrapper.length;
  $markup.wrapper.addClass('item-' + elNumber);
  $markup.year.html(`${yearsLeft}`);
  $markup.yearTxt.html(yearsText);
  $markup.month.html(`${monthsLeft}`);
  $markup.monthTxt.html(monthsText);
  $markup.week.html(`${weeksLeft}`);
  $markup.weekTxt.html(weeksText);
  $markup.day.html(`${daysLeft}`);
  $markup.dayTxt.html(daysText);
  $markup.hour.html(`${hrsLeft}`);
  $markup.hourTxt.html(hourText);
  $markup.minute.html(`${minsLeft}`);
  $markup.minTxt.html(minsText);
  $markup.second.html(`${secsLeft}`);
  $markup.secTxt.html(secText);
}

$('.countdown').each(function () {
  const $this: JQuery = $(this);
  const endDate: string = $(this).data('countdown');
  const format: string = $(this).data('format');
  setInterval(function () {
    makeTimer(endDate, format);
  }, 0);
});

     /*--
        Light Box
    -----------------------------------*/
    var lightboxVideo = GLightbox({
        selector: '.glightbox',
    });


      /*--
        Perfect Scrollbar
    -----------------------------------*/
    const container = document.querySelectorAll('.widgetScroll');

    container.forEach(function(el){
        const ps = new PerfectScrollbar(el,{
            wheelSpeed: 0.4,
            wheelPropagation: true,
            minScrollbarLength: 10,
        });
    })

    const navScroll = document.querySelectorAll('.navScroll');

    navScroll.forEach(function(el){
        const ps = new PerfectScrollbar(el,{
            wheelSpeed: 0.4,
            wheelPropagation: true,
            minScrollbarLength: 10,
        });
    })


  /*--
        Tooltip
    -----------------------------------*/
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-tooltip="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })


   /*--
        PowerTip
    -----------------------------------*/
    $('.course-item, .course-item-02').data('powertiptarget', 'course-hover');

   (<any> $('.course-item, .course-item-02')).powerTip({
        placement: 'e',
        mouseOnToPopup: true,
        smartPlacement: true,
    });


    $('.course-list-item').data('powertiptarget', 'course-list-hover');

    (<any>$('.course-list-item')).powerTip({
        placement: 'n',
        mouseOnToPopup: true,
        smartPlacement: true,
    });


    /*--
        Nice Select
    -----------------------------------*/
    // (<any>$('.select')).niceSelect();
  // (<any>$(".edumall-nice-select")).EdumallNiceSelect()

  //     /*--
  //       Datepicker
  //   -----------------------------------*/

    // (<any>$(".filter_start_date")).flatpickr({
    //     altInput: true,
    //     altFormat: "F j, Y",
    //     disableMobile: true,
    // });

    flatpickr($(".filter_start_date"), { altInput: true,
        altFormat: "F j, Y",
        disableMobile: true,});

  //  /*--
  //       Sticky
  //   -----------------------------------*/
  //   (<any>$(".sidebar-sticky")).stick_in_parent({
  //       offset_top: 130,
  //       parent: ".sticky-parent", // note: we must now manually provide the parent
  //   });

  //  /*--
  //       Masonry
  //   -----------------------------------*/
    // $('.container').imagesLoaded( function() {
    //     // images have loaded

    //     // $('.grid').masonry({
    //     //     // options
    //     //     itemSelector: '.grid-item',
    //     //     columnWidth: 2,
    //     // });
    // });


    /*--
        Product Quantity Activation
    -----------------------------------*/
$('.add').on('click', function () {
    const inputVal: string = $(this).prev().val() as string;
    if (inputVal) {
        $(this).prev().val(+inputVal + 1);
    }
});

$('.sub').on('click', function () {
    const inputVal: string = $(this).next().val() as string;
    if (+inputVal > 1) {
        $(this).next().val(+inputVal - 1);
    }
});



    /*--
		Rating Script
	-----------------------------------*/
	$("#rating li").on('mouseover', function(){
    var onStar: number = parseInt($(this).data('value'), 10);
    var siblings: JQuery<HTMLElement> = $(this).parent().children('li.star');
    Array.from(siblings, function(item: HTMLElement){
        var value: string = item.dataset['value']!;
        var child: HTMLElement = item.firstChild as HTMLElement;
        if(value as unknown as number <= onStar){
            child.classList.add('hover')
        } else {
            child.classList.remove('hover')
        }
    })
})

$("#rating").on('mouseleave', function(){
    var child: JQuery<HTMLElement> = $(this).find('li.star i');
    Array.from(child, function(item: HTMLElement){
        item.classList.remove('hover');
    })
})


    /*--
        Select 2
    -----------------------------------*/
    $(".select2").select2({
        tags: true
    });



$('#account').on('click', function () {
    if ($('#account:checked').length > 0) {
        $('.checkout-form__account').slideDown();
    } else {
        $('.checkout-form__account').slideUp();
    }
});

$('#shipping').on('click', function () {
    if ($('#shipping:checked').length > 0) {
        $('.checkout-form__shipping').slideDown();
    } else {
        $('.checkout-form__shipping').slideUp();
    }
});

const checked = $('.payment-method:checked');
if (checked) {
    $(checked).siblings('.payment-details').slideDown(500);
}
$('.payment-method').on('change', function () {
    $('.payment-details').slideUp(500);
    $(this).siblings('.payment-details').slideToggle(500);
});

$('.card-option').on('click', function () {
    if ($('.card-option:checked').length > 0) {
        $('.checkout-form__payment-card').slideDown();
    } else {
        $('.checkout-form__payment-card').slideUp();
    }
});



  Aos.init({
    once: true,
    offset: 0,
});

class PhotoEditor {
    dialogue_box: JQuery;

    constructor(photo_editor: JQuery) {
        this.dialogue_box = photo_editor.find('#dashboard-photo-dialogue-box');
    }

    open_dialogue_box(name: string): void {
        this.dialogue_box.attr('name', name);
        this.dialogue_box.trigger('click');
    }

    validate_image(file: File): boolean {
        return true;
    }

    upload_selected_image(name: string, file: File): void {
        if (!file || !this.validate_image(file)) {
            return;
        }

        // const nonce = tutor_get_nonce_data(true);

        const context = this;
        context.toggle_loader(name, true);

        const form_data = new FormData();
        form_data.append('action', 'tutor_user_photo_upload');
        form_data.append('photo_type', name);
        form_data.append('photo_file', file, file.name);
        // form_data.append(nonce.key, nonce.value);

        $.ajax({
            // url: window._tutorobject.ajaxurl,
            data: form_data,
            type: 'POST',
            processData: false,
            contentType: false,
            error: context.error_alert,
            complete: function () {
                context.toggle_loader(name, false);
            }
        });
    }

    accept_upload_image(context: PhotoEditor, e: JQuery.ChangeEvent): void {
        const file = e.currentTarget.files[0] || null;
        context.update_preview(e.currentTarget.name, file);
        context.upload_selected_image(e.currentTarget.name, file);
        $(e.currentTarget).val('');
    }

    delete_image(name: string): void {
        const context = this;
        context.toggle_loader(name, true);

        $.ajax({
            // url: window._tutorobject.ajaxurl,
            data: { action: 'tutor_user_photo_remove', photo_type: name },
            type: 'POST',
            error: context.error_alert,
            complete: function () {
                context.toggle_loader(name, false);
            }
        });
    }

    update_preview(name: string, file: any): void {
        const renderer = photo_editor.find(name == 'cover_photo' ? '#dashboard-cover-area' : '#profile-photo');

        if (!file) {
            renderer.css('background-image', 'url(' + renderer.data('fallback') + ')');
            this.delete_image(name);
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            renderer.css('background-image', 'url(' + e.target!.result + ')');
        };

        reader.readAsDataURL(file);
    }

    toggle_profile_pic_action(show?: boolean): void {
        const method = show === undefined ? 'toggleClass' : (show ? 'addClass' : 'removeClass');
        photo_editor[method]('pop-up-opened');
    }

    error_alert(): void {
        alert('Something Went Wrong.');
    }

    toggle_loader(name: string, show: boolean): void {
        photo_editor.find('#photo-meta-area .loader-area').css('display', show ? 'block' : 'none');
    }

    initialize(): void {
        const context = this;

        this.dialogue_box.change(function (e) { context.accept_upload_image(context, e); });

        photo_editor.find('#profile-photo .overlay, #profile-photo-option>div:last-child').click(function () { context.toggle_profile_pic_action(); });

        photo_editor.find('.cover-uploader').click(function () { context.open_dialogue_box('cover_photo'); });
        photo_editor.find('.profile-photo-uploader').click(function () { context.open_dialogue_box('profile_photo'); });

        photo_editor.find('.cover-deleter').click(function () { context.update_preview('cover_photo', null); });
        photo_editor.find('.profile-photo-deleter').click(function () { context.update_preview('profile_photo', null); });
    }
}

const photo_editor = $('#dashboard-profile-cover-photo-editor');
photo_editor.length > 0 ? new PhotoEditor(photo_editor).initialize() : 0;

const toTopBtn = document.querySelectorAll('.backBtn');

toTopBtn.forEach(function (btn:any) {
    btn.addEventListener('click', function (e:any) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    let scrollPos = 0;

    window.addEventListener('scroll', function () {
        if ((document.body.getBoundingClientRect()).top > scrollPos) {
          btn.style.display = "none";
        } else {
            btn.style.display = "block";
        }
        scrollPos = (document.body.getBoundingClientRect()).top;
    });
});


}

