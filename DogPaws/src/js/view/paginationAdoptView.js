import { View } from "./View.js";

class PaginationAdoptView extends View {
  _parentElement = document.querySelector(".pagination_nav");
  _paginationList = "";
  _translateX = 0;
  addHandlerChangePage(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn__page");
      if (!btn) return;
      const gotopage = btn.dataset.gotopage;
      console.log(this._currentPage);
      handler(gotopage);
    });
    //add active class to active page
  }
  paginationroll(prevPage, gotopage) {
    this._paginationList = document.querySelector(".pagination__list");
    console.log(prevPage, gotopage);

    if (gotopage === 1) {
      this._translateX = 0;
      this._paginationList.style.transform = `translateX(${this._translateX}rem)`;
    } else if (gotopage - prevPage >= 4) {
      console.log(this._translateX);
      this._translateX += -(3 * (gotopage - prevPage - 2));
      this._paginationList.style.transform = `translateX(${this._translateX}rem)`;
    } else if (
      gotopage - prevPage >= 0 &&
      gotopage - prevPage < 4 &&
      gotopage >= 5
    ) {
      console.log(gotopage - prevPage);
      console.log(this._paginationList);
      this._translateX += -(3 * (gotopage - prevPage));
      console.log(this._translateX);
      this._paginationList.style.transform = `translateX(${this._translateX}rem)`;

      console.log(`translateX(${this._translateX}rem)`);
    } else if (gotopage - prevPage < 0) {
      console.log(gotopage - prevPage);
      console.log(this._paginationList);
      this._translateX += 3 * (prevPage - gotopage);
      console.log(this._translateX);
      console.log(`translateX(${this._translateX}rem)`);
      this._paginationList.style.transform = `translateX(${this._translateX}rem)`;
    }
  }
  _generateMarkup() {
    //current page is 1 there is another page and total page is greater than 5
    /* 		_generatePageOnenbtn();
		_generateNumberbtn();
		_generateNextbtn();
		_generateLatNumber(); */
    console.log(this._data.currentPage);
    return `	<div class="pagination__prev">
		${this._data.currentPage === 1 ? "" : `${this._generatePrevbtn()}`}
		<button class="btn__page ${
      this._data.currentPage === 1 ? `active` : ""
    }" data-gotopage="${1}">1</button>
	</div>
	<div class="pagination__list-container">
		<div class="pagination__list">
			<ul class='pagination_buttons'>
				${this._data.totalPages > 1 ? `${this._generatePagebtn()}` : ""}
				
			</ul>
		</div>
		
	</div>
	<div class="pagination__next">					
		${this._data.totalPages > 5 ? `${this._generateLastbtn()}` : ""}
					${
            this._data.currentPage === this._data.totalPages
              ? ""
              : `${this._generateNextbtn()}`
          }
</div>
`;
    //current page is 1 and no other next button
  }
  _generatePrevbtn() {
    return `<button class="btn__page" data-gotopage="${
      this._data.currentPage - 1
    }"> 
		<i class="fas fa-chevron-left"></i>
	</button>`;
  }
  _generatePagebtn() {
    let markup = "";
    console.log(this);
    let y = this._data.totalPages > 5 ? 0 : 1;
    for (let i = 2; i < this._data.totalPages + y; i++) {
      markup += `<li>
			<button class="btn__page ${
        this._data.currentPage === i ? `active` : ""
      }" data-gotopage="${i}">${i}</button>
		</li>`;
    }
    return markup;
  }
  _generateLastbtn() {
    return `<button class="btn__page" data-gotopage=${this._data.totalPages}>${this._data.totalPages}</button>
		`;
  }
  _generateNextbtn() {
    return `<button class="btn__page" data-gotopage="${
      this._data.currentPage + 1
    }">
		<i class="fas fa-chevron-right"></i>
	</button>	`;
  }
}

export default new PaginationAdoptView();
