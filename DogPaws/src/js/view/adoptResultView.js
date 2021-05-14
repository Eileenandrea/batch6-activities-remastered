import { View } from "./View.js";

class AdoptResultsView extends View {
	_parentElement = document.querySelector(".adopt__results--ul");

	_generateMarkup() {
		console.log(this._data);
		const markup = this._data
			.map((result, i) => {
				return this._generateMarkupPreview(i);
			})
			.join("");
		return markup;
	}
	_generateMarkupPreview(i) {
		return `	<li class="adopt__results--li">
        <div class="adopt__image--container">
            <img src="${
					this._data[i].primary_photo_cropped?.small ??
					"/src/img/alternateimage.jpg"
				}" alt="">
        </div>
        <div class="adopt__details">
            <div class="adopt__details--container">
                <h2 class="name">${this._data[i].name}</h2>
            <p class="details">${this._data[i].age}, ${this._data[i].gender}, ${
			this._data[i].breeds?.primary
		},${
			this._data[i].breeds?.secondary ? this._data[i].breeds?.secondary : ""
		}   </p>
            <a href=${this._data[i].url} target="_blank">
                <button class="btn--adopt">Adopt me</button>
            </a>
            </div>
        </div>
    </li>`;
	}
	renderLoader() {
		const overlay = document.querySelector(".overlay");
		console.log(overlay);
		overlay.style.display = "block";
		const markup = `<div class="loader" style="margin-top:10vh;">
		<img src="./src/img/dogloaders.gif" alt="" />
		<h3 style="text-align:center;font-size:5.5rem; color: rgb(46, 46, 46)">Loading ...</h3>
	</div>`;
		overlay.innerHTML = "";
		overlay.insertAdjacentHTML("afterbegin", markup);
	}
	removeloader() {
		const overlay = document.querySelector(".overlay");
		overlay.innerHTML = "";
		overlay.style.display = "none";
	}
}
export default new AdoptResultsView();
