import { View } from "./View.js";

class DogBreedView extends View {
	_parentElement = document.querySelector(".dogbreed");
	_errorMessage = `We could not find that Dog Breed. please Try another one!`;
	addHandlerLoadDogBreed(handler) {
		["hashchange", "load"].forEach((e) =>
			window.addEventListener(e, function () {
				handler();
			})
		);
	}
	addHandlerAddBookmark(handler) {
		this._parentElement.addEventListener("click", function (e) {
			const btn = e.target.closest(".btn--bookmark");
			if (!btn) return;
			handler();
		});
	}
	_generateMarkup() {
		return `	<figure class="dog__fig">
        <div class="dog__fig--header">
            <h1 class="dog__name">${this._data.name}</h1>
            <button class="btn--round btn--bookmark">
                <svg><use href="../../../src/img/icons.svg#icon-bookmark${
							this._data.bookmark ? "-fill" : ""
						}"</svg>
            </button>
        </div>
        <div class="dog__image">
            <img
                src="https://cdn2.thedogapi.com/images/${
							this._data.imageID
						}.jpg"
                alt="dogimage"
            />
        </div>
    </figure>
    <div class="dogbreed__detailsContainer">
        <ul class="dogbreed__details">
            <li id="dogbreed__ID">
                <p class="dogbreed__details--label">ID:</p>
                <p class="dogbreed__details--data">${this._data.id}</p>
            </li>
            <li id="dogbreed__origin">
                <p class="dogbreed__details--label">Origin:</p>
                <p class="dogbreed__details--data">${this._data.origin}</p>
            </li>
            <li id="dogbreed__hieght">
                <p class="dogbreed__details--label">Height:</p>
                <p class="dogbreed__details--data">${
							this._data.height.metric
						}</p>
            </li>

            <li id="dogbreed__lifespan">
                <p class="dogbreed__details--label">Life <span></span>:</p>
                <p class="dogbreed__details--data">${this._data.lifeSpan}</p>
            </li>

            <li id="dogbreed__Temperament">
                <p class="dogbreed__details--label">Temperament:</p>
                <p class="dogbreed__details--data">${this._data.temperament}</p>
            </li>
        </ul>
    </div>`;
	}
}
export default new DogBreedView();
