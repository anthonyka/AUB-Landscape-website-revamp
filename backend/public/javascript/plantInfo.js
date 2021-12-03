var slideIndex = 1;

window.onload = function () {
  showSlides(slideIndex);
  let demo = document.getElementsByClassName("demo");
  for (let index = 0; index < demo.length; index++) {
    demo[index].addEventListener("click", currentSlide);
  }

  let prev = document.getElementsByClassName("prev")[0];
  prev.addEventListener("click", plusSlides);

  let next = document.getElementsByClassName("next")[0];
  next.addEventListener("click", plusSlides);

  let divDesc = document.querySelectorAll(".navNew a");
  for (let index = 0; index < divDesc.length; index++) {
    divDesc[index].addEventListener("click", switchTab);
  }

  let pdf = document.getElementById("downloadPDF");
  pdf.addEventListener("click", generatePDF);
}


// Next/previous controls
function plusSlides() {
  let n = parseInt(this.getAttribute("direction"));
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide() {
  let n = parseInt(this.getAttribute("index")) + 1;
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  captionText.innerHTML = dots[slideIndex - 1].alt;
}

function switchTab() {
  let divDesc = document.getElementsByClassName("divDescription");
  for (let index = 0; index < divDesc.length; index++) {
    divDesc[index].style.display = "none";
  }
  if (this.innerHTML == "Landscape Information") {
    divDesc[0].style.removeProperty("display");
  } else if (this.innerHTML == "Botanical Description") {
    divDesc[1].style.removeProperty("display");
  } else if (this.innerHTML == "Horticulture Management") {
    divDesc[2].style.removeProperty("display");
  }
}

function generatePDF() {
  window.print();
}