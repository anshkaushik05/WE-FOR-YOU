
// let slideIndex = 1;
//  let slide1=document.querySelector("#slideshow1");
//  let slide2=document.querySelector("#slideshow2"); 
//  let slide3=document.querySelector("#slideshow3");
// let container=document.querySelector(".slideshow-container");

// // let j=1{};
// // for(let dot of dots){
// //   dot.addEventListener("click",function (){
// //     conssole.log("hi")
// //     let b=dot.id;
// //     slideIndex=b;
// //     // showSlides()
// //   })
// // }
// let flag=0;
// function showSlides() {

//   if(slideIndex==4){
//     slideIndex=1;
//   }
//   if(slideIndex==1){
//     slide1.style.display="block";
//     slide2.style.display="none";
//     slide3.style.display="none";
//   }
//   else if(slideIndex==2){
//     slide2.style.display="block";
//     slide3.style.display="none";
//     slide1.style.display="none";
//   }
//   else{
//     slide2.style.display="none";
//     slide3.style.display="block";
//     slide1.style.display="none";
//   }
//   slideIndex++;
//   if(flag)
//   {
//     flag=0;
//     return;
//   }
//   else{
//    setTimeout(showSlides,3000);
//   }
// }

// showSlides();

// let dots=document.querySelectorAll(".dot");
// for(let i=1;i<=dots.length;i++){
//   dots[i-1].addEventListener("click", () =>{
    
//     flag=1;
//     slideIndex=i;
//     if(slideIndex==4){
//       slideIndex--;
//     }
//     showSlides();

//   })
// }

// //    if(id==1){
// //   slide1.style.display="block";
// //   slide2.style.display="none";
// //   slide3.style.display="none";
// // }
// // else if(id==2){
// //   slide2.style.display="block";
// //   slide3.style.display="none";
// //   slide1.style.display="none";
// // }
// // else{
// //   slide2.style.display="none";
// //   slide3.style.display="block";
// //   slide1.style.display="none";
// // }
let counter=1;
setInterval(function(){
document.getElementById('radio'+counter).checked=true;
counter++;
if(counter>4){
  counter=1;
}
},3000);

let body=document.querySelector("body");
let preloader=document.querySelector("#loading");
body.onload=loadFunction();

function loadFunction(){
  preloader.style.display='none';
}