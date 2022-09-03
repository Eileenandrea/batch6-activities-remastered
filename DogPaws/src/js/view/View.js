export class View {
  renderLoaderAnim() {
    const markup = `<div class="loader">
			<img src="./src/img/dogloaders.gif" alt="" />
		</div>`;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  render(data, forBookmark = false) {
    this._data = data;
    if (!forBookmark) {
      if (!data || (Array.isArray(data) && data.length === 0))
        return this.renderError();
    }
    if (forBookmark) {
      if (!data || (Array.isArray(data) && data.length === 0))
        return this.renderMessage();
    }
    const markup = this._generateMarkup();

    console.log(this._parentElement);
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  _clear() {
    this._parentElement.innerHTML = "";
  }
  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
		<div>
		  <svg>
			<use href="../../../src/img/icons.svg#icon-alert-triangle"></use>
		  </svg>
		</div>
		<p>${message}</p>
	  </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  renderMessage(message = this._message) {
    const markup = `<div class="error">
			<div>
			  <svg>
				<use href="../../../src/img/icons.svg#icon-smile-triangle"></use>
			  </svg>
			</div>
			<p>${message}</p>
		  </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  update(data) {
    this._data = data;

    const newmarkup = this._generateMarkup();
    console.log(newmarkup);
    const newDOM = document.createRange().createContextualFragment(newmarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild &&
        newEl.firstChild.nodeValue.trim(" ") !== ""
      ) {
        console.log(newEl.firstChild.nodeValue.trim(" "));
        curEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
}
