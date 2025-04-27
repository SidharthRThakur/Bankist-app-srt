'use strict';
//  ADVANCED DOM EVENTS
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
//////
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('nav');
//////
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault(); // it prevents the page to jump at the top
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
//----------------- or---------------------//
// above is the more effective way to wirte the
// same below code
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// Button Scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());
  console.log('Current scroll(X/Y)', window.scrollX, scrollY);
  //  after click the learn more will will get the x & y values of page scroll
  // we can alread the height and width of the viewport`
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // scrolling
  //   // frist argument is the left one of scrollTo
  //   // window.scrollTo(s1coords.left, s1coords.top);
  //   // now it will scroll from the top of the view port but not the
  //   // top of the web page
  //   // now i want ki whenver i clicked on the learn more,
  //   // the distance travelled should be start from the top of
  //   // the webpage so every time it should gain the same position
  //   // with respect to the top of the web page

  //   // window.scrollTo(
  //   //   s1coords.left + window.scrollX,
  //   //   s1coords.top + window.scrollY
  //   // );
  //   // now where ever i am clicking  on the learn more
  //   // it automatically scrolled upto scetion --1 that is features.
  //   // now there is a way to may this scrool more smooth
  //   // window.scrollTo({
  //   //   left: s1coords.left + window.scrollX,
  //   //   top: s1coords.top + window.scrollY,
  //   //   behavior: 'smooth',
  //   // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

//Page Navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault(); // this will stop the automatic scrolling of the page
//     // console.log('LINK');
//     const id = this.getAttribute('href'); //#section--1
//     // const id = this.href;//http://127.0.0.1:5500/?#section--1
//     // we can not write this.href beacuse it will return the absolute value
//     console.log(id);
//     //so now lets try to scroll it down smoothly
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
///////////////////////////////
//EVENT DELEGATION -event.tager property
// in EVENT DELEGATION we need two step
// 1. we addd the event listner to a common parent element
// -add event listener to common parent elemment
// 2. determin what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault(); // this will stop the automatic scrolling of the page
  // console.log(e.target); //<class="nav__link"href="#section">features</a>
  ///////////////////////////////////////////////////////////
  // it is used when we dont click on the any button , so there should be on result , as earlier we have seen that when we have click in bteween the feature and operation button , we got the output int he console

  //MAtching the strategy (that only click event shows  )
  if (e.target.classList.contains('nav__link')) {
    // console.log('LINK');
    const id = e.target.getAttribute('href'); //#section--1
    // const id = this.href;//http://127.0.0.1:5500/?#section--1
    // we can not write this.href beacuse it will return the absolute value
    console.log(id);
    //so now lets try to scroll it down smoothly
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//TABBED COMPONENTS
// console.log('BUILDING A TABBED COMPONENT');

// const tabs = document.querySelectorAll('.operations__tab');
// const tabsContainer = document.querySelector('.operations__tab-container');
// const tabsContent = document.querySelectorAll('.operations__content');
// const tabsContent = document.querySelectorAll('.operations__constent');
//on the above code i ahve mistakenly written constent onsted of content , due to which the content of the tab was not hiding when i click on the other tab
// using event delegation
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  //Gaurd clause - it use when we need some condition when it is matched

  if (!clicked) return; // to removeth error with null , while clicking outside the tabs

  // remove active tabs classes
  tabs.forEach(t => t.classList.remove('operations__tab--active')); // this code will bring back the other tabs to the down postion , whihc was not clicked
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //Activate TAB
  clicked.classList.add('operations__tab--active'); // by this tab will move upward when we clicked on it, Activating content are of the clicked TABS

  //ACTIVATe content area
  // console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active'); // using template literal coz not using hard code, and it will display the each 3 of them tabs content so now , we have to hide other two tab content
});

console.log('PASSING ARGUMENTS TO EVENTS HANDLER');
//  MENU FADE ANIMATION rgb(255,255,255)
// AS WE KNOW WE DO NOT WANT TO ATTACH EVENT LISTNER  nstead
//  we will work with event delegation
// bubble up event
// const nav = document.querySelector('nav');
// in bleow code we are not using closest method beacuase there in no child element here that we accidently will clicked on it
const handleHover = function (e) {
  // console.log(this, e.currentTarget);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });

// passing "argumnet into handeler"
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

console.log('MPLEMENTING STICKY NAVIGATION - THE SCROLL EVENT');
// // STICKY NAVIGATION- when even we scroll down the web page , so  we want to freeze the top most heading of the page
// // SCROLL EVENT is aviable on window not document
// const initialCorods = section1.getBoundingClientRect();
// console.log(initialCorods);
// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);
//   if (window.scrollY > initialCorods.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// how  Intersection Server API works
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOption = {
//   root: null,
//   threshold: 0.1,
// };
// const observer = new IntersectionObserver(obsCallback, obsOption);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, // null represent entire view port
  threshold: 0,
  rootMargin: `-${navHeight}px`,
  // rootMargin: '90px
  //  //box of ninty pixel, -90 beacuse slilder shoud be slide just before corossing the vewport or we can
  // say, crossing the first part(first header ) of the webpage
  // mentioning rootMargin with hard code so we will mwke logical
});

headerObserver.observe(header);
/////////////////

console.log('Revealing sections');
console.log('fixing a small scrolling bug ');
// this is ahappmimg beacuse we write the coding of hiding at the begning
console.log(
  'once the next section appeard after scrolling down than once we refersh the webpage it disappears and did not appear after that'
);

const allSection = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  // console.log(entries);
  // const [entry] = entries;// removed due to scrolling bug
  // console.log(entry);// removed due to scrolling bug
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15, // it revel the section once ewe scrool and hit the view port line
});
allSection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

console.log('LAZY LOADING IMAGES');
// we will have toi select  all the images first ,
// those who have the property of data-src

const imgTargets = document.querySelectorAll('img[data-src]');
// console.log(imgTargets);
const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  //repalce the src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));
///////////////////////////////////////////////////////////
console.log('BUILDING A SLIDER COMPONENT-PART 1');

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  let curSlide = 0;
  const maxSlide = slides.length; // to control the rotaotion of the slide

  // const slider =document.querySelector('.slider')
  // slider.style.transform='scale(0.4) translateX(-800px)'
  // slider.style.overflow='visible'
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  createDots();
  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };
  activateDot(0);

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = ` translateX(${100 * (i - slide)}%)`)
    );
  };
  goToSlide(0);
  // next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  //Event HAndler
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  //////////////////////////
  //SECOND PART ADDING ARROW operation for left and Right , incliding dots

  document.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.key === 'ArrowLeft') prevSlide();
    // if (e.key === 'ArrowRight') nextSlide();
    // or
    e.key === 'ArrowRight' && nextSlide();
  });
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      // console.log('DOT');// to check if ti is working , if it is wokring then it will be console the dot when ever we click on the dots
      //Actully needs to be , curSlide = Number(e.target.dataset.slide)
      // by above we do not loose the track of the curSlide when we click on the DOt
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide); // activateDot(curslide)
      // actully needs to be , goToSlide(curSlide)
    }
  });
};
slider();
/// //////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

//  ADVANCED DOM EVENTS

console.log('Use of href = #- to scroll the window up automatically ');
//  <a class="nav__link nav__link--btn btn--show-modal" href="#" // is used to scroll the window upward automatically

console.log('how DOM really works ');
// DOM is the interface between all javascript code and the browswer
// more specifically HTML documents
// 1. Allow us to make Java Script intreact with the broweser
// 2. we can write Javascript to create,Modify or delete HTML
//  elements,set styles,classes and attributes and listen and respond to the events
// 3. DOM tress is generate from HTML document,which can be then intreact with
// 4. DOM is very complex API that contains lots of method and properties
// to intreact with the DOM tree
// Every HTML has to go int ot the DOM as well`
// Inheritance of Method an dporperties
// Example:
//Any HTML Elementwill have access to
// 1.addeventlisten()
// 2. clone node()
// 3. .closets() Method
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

console.log('Selecting ,creating and Deleting elements');
/*
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
// selecting ELEment
const header = document.querySelector('.header');
const allsection = document.querySelectorAll('.section');
console.log(allsection);
document.getElementById('section--1');
const allbuttons = document.getElementsByTagName('button');
console.log(allbuttons);
console.log(document.getElementsByClassName('btn'));

//Creating and inserting element
// .insertAdjacentHTML
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent='We use cookie to improve functionality and analytuics'
message.innerHTML =
  'We use cookie to improve functionality and analytuics.<button class="btn btn--close-cookie">Got It!</button>';
// header.prepend(message); // first child of header
header.append(message); // at the last
// multiple copy

// header.append(message.cloneNode(true));

// Insert the message before the header element
header.before(message);
// Insert the message AFTER the header element
header.after(message);

//  now remove the message
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.parentElement.removeChild(message);
    message.remove();
  });
  */
///////////////////////////////////////////////////
console.log('STYLES,ATTRIBUTES & CLASSES ');
/*
//STYLES
// to Set a style on a element
message.style.backgroundColor = '#37383d';
// we can  set the width of the cookie backgroundColor
message.style.width = '120%';
console.log(
  'Inline Styles-: that we have set mannually is called inline styles'
);

// message.style.height = '49px';
console.log(message.style.height); // balnk output
console.log(message.style.backgroundColor);
// by the above process we cannot get the style that is hidden in the calss
// e.g.
  
// // COOKIE MESSAGE 
// .cookie-message {
//   display: flex;
//   align-items: center;
//   justify-content: space-evenly;
//   width: 100%;
//   background-color: white;
//   color: #bbb;
//   font-size: 1.5rem;
//   font-weight: 400;
// } 
//  let say we wanted to get the color, but it is already
// defined in the style sheet but if we try to log it here
console.log(message.style.color); // blank output
//it is blank output and nowhere to be find
// now we can still get it if we want to
// we need to use the "getcomputedstyle"
console.log(getComputedStyle(message).color);
/// let say we need to increase the size of the message banner upto 40px
// message.style.height = getComputedStyle(message).height + 40 + 'px';
// up here we are trying to add numer to a string (".height"
// as we alredy know that parseInt can tke the number out of the string
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 20 + 'px';
//  now the size height of the message banner has been increased
*/
/* // these are called "custom properties"
:root {
  --color-primary: #5ec576;
  --color-secondary: #ffcb03;
  --color-tertiary: #ff585f;
  --color-primary-darker: #4bbb7d;
  --color-secondary-darker: #ffbb00;
  --color-tertiary-darker: #fd424b;
  --color-primary-opacity: #5ec5763a;
  --color-secondary-opacity: #ffcd0331;
  --color-tertiary-opacity: #ff58602d;
  --gradient-primary: linear-gradient(to top left, #39b385, #9be15d);
  --gradient-secondary: linear-gradient(to top left, #ffb003, #ffcb03);
}
  this is defined in the document root so it will eqvalanet to DOCUMENT IN JAVASCRIPT
TO BE SPECIFIC IT IS "DOCUMENT ELEMENT" 
  */
// document.documentElement.style.setProperty('--color-primary', 'orangered');
// // or;
// // message.style.backgroundColor = '#37383d';
// //  can be used

/// ATTRIBUTES
/*
<header class="header">
      <nav class="nav">
<img
          src="img/logo.png"
          alt="Bankist logo"
          class="nav__logo"
          id="logo"
          designer ='Jonas'// added later 

//all of these src,alt,class,id are the attributes of this element "img"
          */
// so in javaSCript we can change these diffrent attributes

//  let select oa logo , and the callss of the logo is
// ".nav--logo"
/*
const logo = document.querySelector('.nav__logo');
// lets read the property by logging it
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className); //nav__logo
// lets add designer attibute to the "img"element
// no wif we try to read globa
// console.log(logo.designer); // undefined
// undefined beacasue this is not the standard porperty that is expected to be on image

// non-Standard
console.log(logo.designer);
console.log(logo.getAttribute('designer')); //Jonas
// just as we can read the value of these atttibutes
// we can also set them
logo.alt = 'Beautiful minimalist logo';
//  also the opposite of the get attribute htat is the setAttribute
logo.setAttribute('company', 'Bankist');
// URL shown in console is absolute and the URL shown in INEX.HTML file is realitive URL
console.log(logo.src); // absolute //http://127.0.0.1:5500/img/logo.png
console.log(logo.getAttribute('src')); //relative//img/logo.png
/////
// href attribute for the link
const link = document.querySelector('.twitter-link');
console.log(link.href); //https://twitter.com/jonasschmedtman
console.log(link.getAttribute('href')); //https://twitter.com/jonasschmedtman
//  in above case both are the same anyway
// lets try one of the link at the top of Bankist webpage
const lin = document.querySelector('.nav__link--btn');
console.log(lin.href); //absolute -:http://127.0.0.1:5500/?#
console.log(lin.getAttribute('href')); //relative-: #
*/
console.log('DATA ATTRIBUTES');
// // // lets add data in img class
// // <header class="header">
// //       <nav class="nav">
// // <img
// //           src="img/logo.png"
// //           alt="Bankist logo"
// //           class="nav__logo"
// //           id="logo"
// //           designer ='Jonas'
// //           data-version-number="3"// added later

// console.log(logo.dataset.versionNumber); // camelCase will be used in place of dash'-'
// // o/p = 3

// //Classes
// logo.classList.add('c', 'j'); // we can add multiple classes
// logo.classList.remove('c', 'j');
// logo.classList.toggle('c');
// logo.classList.contains('c'); // not includes
// // logo.className = 'Jonas';//we should not use this because this will overwrite all the existing classes

console.log('MPLEMENTING SMOOTH SCROLLING ');
// <button class="btn--text btn--scroll-to">Learn more &DownArrow;</button>
// above line is used to scroll the page

// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// btnScrollTo.addEventListener('click', function (e) {
//   const s1coords = section1.getBoundingClientRect();
//   console.log(s1coords);

//   console.log(e.target.getBoundingClientRect());
//   console.log('Current scroll(X/Y)', window.scrollX, scrollY);
//   //  after click the learn more will will get the x & y values of page scroll
//   // we can alread the height and width of the viewport`
//   console.log(
//     'height/width viewport',
//     document.documentElement.clientHeight,
//     document.documentElement.clientWidth
//   );

//   // scrolling
//   // frist argument is the left one of scrollTo
//   // window.scrollTo(s1coords.left, s1coords.top);
//   // now it will scroll from the top of the view port but not the
//   // top of the web page
//   // now i want ki whenver i clicked on the learn more,
//   // the distance travelled should be start from the top of
//   // the webpage so every time it should gain the same position
//   // with respect to the top of the web page

//   // window.scrollTo(
//   //   s1coords.left + window.scrollX,
//   //   s1coords.top + window.scrollY
//   // );
//   // now where ever i am clicking  on the learn more
//   // it automatically scrolled upto scetion --1 that is features.
//   // now there is a way to may this scrool more smooth
//   // window.scrollTo({
//   //   left: s1coords.left + window.scrollX,
//   //   top: s1coords.top + window.scrollY,
//   //   behavior: 'smooth',
//   // });

//   section1.scrollIntoView({ behavior: 'smooth' });
// });
// above is the old way to scroll the webpage to the particulare section
console.log('MODERN WAY TO SCROLL');
// section1.scrollIntoView({ behavior: 'smooth' });
//////////////////////////////////////////////////
console.log('TYPES OF EVENTS AND EVENT HANDELERS');
/*
//mouseenter event

// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', function (e) {
//   alert('addEventListener: Great! Your are reading the heading :D');
// });
// here we can use multiple function
//above program will show an alert when we scroll the mouse to the Heading 1
// there are diffrent events in MDM

// THER IS ANOTHER WAY OF DOING THIS
// on-event property directly on the element

///////////////////////////
// below is the old way of calling the event
// in  this if second fucntion is used it will orverride the first function
// h1.onmouseenter = function (e) {
//   alert('addEventListener: Greataa! Your are reading the heading :D');
// };

//  TO REMOVE THE EVENTLISTENER  WE NEED TO DO SOME CHANGES
const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: Great! Your are reading the heading :D');
  // h1.removeEventListener('mouseenter', alertH1);
};
h1.addEventListener('mouseenter', alertH1);

// so now we wnat to remove the event listener after
// the certain time has passed in that case
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);
// after the 3 second event listener will deactivated now no more alert window will be shown
///////////////////////////////////////
// 3rd is use HTML ATTIBUTE
// *** this one should not be used

//  <h1 onclick="alert('GREATAAAAA')"></h1> 
*/
////////////////////////////////////////
console.log('EVENT PROPAGATION: BUBBLING & CAPTURING');
// MOST IMPORTANT PROPERTY OF HEVENT HANDLING
// BUBBLING

console.log('RACTICING OF BUBBLING & CAPTURING');
/*
// rgb(255,255,255)// this shows the white colour by JAVASCRIPT

// now will choose the random number by the funciton
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
// console.log(randomInt(0, 6));
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// console.log(randomColor());
// OW LETS ATTACHE THE EVENT HANLDER TO THE "FEATURE" LINK
document.querySelector('.nav__link').addEventListener('click', function (e) {
  // console.log('LINK');
  //"LINK " will be on the console appear when we will click on the featue bttoun on the web page
  // In eveent handler that "this." keyword point always to the element
  // on which that event handler is attached.
  // in here (document.querySelector('.nav__link')) this is the element
  this.style.backgroundColor = randomColor(); // by this the color of the FEATURE buttons randomly changing.
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this); //true
  // we can also stop the parent event bu using e.stopPropagation
  // e.stopPropagation(); // by thusi only FEATURE button background color will changed,
  // but not any of parant element like , nav.links or nav
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // .nav__links is the paranet element of .nav__link
  // console.log('LINKS');
  //"LINK " will be on the console appear when we will click on the featue bttoun on the web page

  this.style.backgroundColor = randomColor(); // this will change the background color of the complete link box
  console.log('LINK', e.target, e.currentTarget);
});
// now when we click on the FEATURE button the backgournd colour of the link box as well as the background colour of FEATURE changes,
// FEATURE button background color change beacuse of event bubbling up to the parent element

document.querySelector('.nav').addEventListener('click', function (e) {
  // console.log('LINK.NAV');
  //"LINK " will be on the console appear when we will click on the featue bttoun on the web page
  console.log('LINK', e.target, e.currentTarget);
});
*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log('DOM TRAVERSING ');
// // DOM TRAVERSING -:DOM Traversing is the process of moving up, down, and sideways in the DOM (Document Object Model) tree to select and manipulate elements.

// const h1 = document.querySelector('h1');
// //going downward : CHILD (selecting child element )
// //so the first way of doing that is to use QuerySelector coz query/selector also works on elemetn as well as documents
// console.log(h1.querySelectorAll('.highlight'));
// //other element of highlight will not get selected beacuse they are not he the child element of "h1"
// console.log(h1.childNodes);
// // as we know nodes can be anything ,text,element , document
// // so insted of childNodes we can use children to  get the exact childer of the "h1"
// console.log(h1.children);
// // O/P - HTMLCollection(3) [span.highlight, br, span.highlight]
// // so here we get the actual elemnt element that are inside the "h1"
// ////////////////////////
// // so let say we want to change the colour of the first elment
// h1.firstElementChild.style.color = 'blue';
// h1.lastElementChild.style.color = 'purple';
// ///////////////
// // Going upwards : parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// // WHEN WE NEED TO FIND THE PARENT ELEMENT NO MATTER HOW FAR IT IS
// h1.closest('.header').style.color = 'blue';
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// //////////////
// // qureySelctor finds children no matter how deep it is
// // closest found parent

// //////////////////////////////
// //Going sideways : Siblings
// // for some reason JAVA SCRIPT we can only access direct siblings,
// //  so basically only the previuos and the next one

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });
////////////////////////////////////////////////////////////////////////
console.log('BUILDING A TABBED COMPONENT');
console.log('Revealing ELement on scroll'); //
// means jab b hum scroll kare tab tak next koi bhi ssection visible na ha and jasie hi , scroll karte hue hum next section ko intersect kare tabi next section visible ho

console.log('LIFECYCLE DOM EVENTS ');
// it means when we just accessed the page first time   till the user leaves it
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded ');
});

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = ''; // did not worked , it should show a warning message for closing the tab in the broweser
// });

console.log('EFICIENT SCRIPT LOADING: DEFER & ASYNC');

// regular way of including javascript file into the HTML
// <script src= "script.js">
// however we can add ASYNC attribute
// <script async src="script.js">
// or //
// DEFER attribute
// <script defer src ="script.js">
