

window.onscroll = function () { scrollFunction() };
let nav = document.querySelector(".head");
// let logo=document.querySelector(".name");
function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    nav.style.backgroundColor = "white";
    nav.style.transition = "all 1s"
    // logo.textContent="";
    nav.style.color = "black";
    // document.getElementsByTagName("P").style.color="black";
  }
  else {
    nav.style.backgroundColor = "transparent";
  }
}

let abtUs = document.querySelector("#abtUs");
abtUs.addEventListener('click', about);
let abtUsDiv = document.querySelector("#AboutUs");
function about() {
  abtUsDiv.scrollIntoView(true);
}