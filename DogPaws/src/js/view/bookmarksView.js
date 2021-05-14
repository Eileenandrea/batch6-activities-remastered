import { View } from "./View.js";

class BookmarksView extends View {
	_parentElement = document.querySelector(".bookmarks__contents");
	_errorMessage = `We could not find that Dog Breed. please Try another one!`;
	_message = `No Bookmarks yet. Please Bookmark your favourite dog`;
	_generateMarkup() {
		const markup = this._data
			.map((result, i) => {
				return this._generateMarkupPreview(i);
			})
			.join("");
		return markup;
	}
	_generateMarkupPreview(i) {
		return `<li class="preview">
        <a href="#BREED-${this._data[i].name}" class="preview__link">
            <figure class="preview__fig">
            <div class="preview__fig--imgcontainer">
                <img
                    src="https://cdn2.thedogapi.com/images/${this._data[i].imageID}.jpg"
                    alt="preview img"
                />
                </div>
            </figure>
            <div class="preview__data">
                <h4 class="preview__name">${this._data[i].name}</h4>
            </div>
        </a>
    </li>`;
	}
}

export default new BookmarksView();
