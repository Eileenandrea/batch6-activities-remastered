import anime from "../node_modules/animejs/lib/anime.es.js";
const btnPrev = document.querySelector(".button--nav-prev");
const btnNext = document.querySelector(".button--nav-next");
const btnSearch = document.querySelector(".button--nav-search");
const slides = [...document.querySelectorAll(".slide")];
const content = document.querySelector(".content");
const btnClose = document.querySelector(".button--close");
let current = 0;
console.log(slides);
btnPrev.addEventListener("click", function () {
	navigate("left");
});

btnNext.addEventListener("click", function () {
	navigate("right");
});
slides.forEach(
	(slide, i) => (slide.style.transform = `translateX(${i * 100}%)`)
);
btnSearch.addEventListener("click", displayModal);
btnClose.addEventListener("click", closemodal);
function closemodal() {
	content.classList.remove("display-modal");
}
function displayModal() {
	content.classList.add("display-modal");
}
function navigate(dir) {
	if (dir == "left" && current > 0) {
		slides[current].classList.toggle("slide--current");
		current--;
		console.log(current);
		slides.forEach((slide, i) => {
			console.log(`translateX(${(i + current) * 100}%)`);
			return (slide.style.transform = `translateX(${(i - current) * 100}%)`);
		});
		slides[current].classList.toggle("slide--current");
	} else if (dir == "right") {
		slides[current].classList.toggle("slide--current");
		current++;
		if (current == slides.length) {
			current = 0;
		}
		slides.forEach(
			(slide, i) =>
				(slide.style.transform = `translateX(${(i - current) * 100}%)`)
		);
		slides[current].classList.toggle("slide--current");
	}
	console.log(current);
}
