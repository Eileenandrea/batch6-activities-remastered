import { View } from "./View.js";

class PaginationView extends View {
	_parentElement = document.querySelector(".pagination");
	addHandlerClick(handler) {
		this._parentElement.addEventListener("click", function (e) {
			const btn = e.target.closest(".btn--inline");
			if (!btn) return;
			const goToPage = Number(btn.dataset.goto);

			handler(goToPage);
		});
	}
	_generateMarkup() {
		const numPages = Math.ceil(
			this._data.results.length / this._data.resultsPerPage
		);
		console.log(numPages);
		const currPage = this._data.page;
		//page 1, and there are other pages
		if (currPage === 1 && numPages > 1) {
			return this._generatePrevbtnMarkup();
		}
		//Page 1, and there are NO other pages
		//last one page
		if (currPage === numPages) {
			return this._generateNexbtnMarkup();
		}
		if (currPage < numPages) {
			return [
				this._generatePrevbtnMarkup(),
				this._generateNexbtnMarkup(),
			].join("");
		}
		return "";
	}
	_generateNexbtnMarkup() {
		return `<button data-goto="${
			this._data.page - 1
		}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="../../../src/img/icons.svg#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.page - 1}</span>
      </button>`;
	}
	_generatePrevbtnMarkup() {
		return `<button data-goto="${
			this._data.page + 1
		}" class="btn--inline pagination__btn--next" >
        <span>Page ${this._data.page + 1}</span>
        <svg class="search__icon">
          <use href="../../../src/img/icons.svg#icon-arrow-right"></use>
        </svg>
      </button>`;
	}
}

export default new PaginationView();
