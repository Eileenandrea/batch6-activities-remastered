import { View } from "./View.js";
import * as model from "../model.js";

class DogBreedCategory extends View {
  _parentElement = document.querySelector(".breedFilter__list");
  _breedInputs = document.querySelector(".breedinputs");
  _breedDroptDown = document.querySelector(".fa-chevron-down");
  _breedFilter = document.querySelector(".breedFilter");
  _breedListSearch = document.querySelector(".breedlistsearch");
  _generateMarkup() {
    const markup = this._data
      .map((result, i) => {
        return this._generateMarkupPreview(i);
      })
      .join("");
    return markup;
  }
  _generateMarkupPreview(i) {
    return `<li class="breed_li">
        <input type="checkbox" id="Breed-${this._data[i].name}" name="Breed-${
      this._data[i].name
    }" value="${this._data[i].name}" ${this._data[i].checked ? "checked" : ""}>
        <label for="Breed-${this._data[i].name} ">${
      this._data[i].name
    }</label><br>
    </li>`;
  }
  addHandlershowfilter() {
    this._breedDroptDown.addEventListener("click", this.showfilter.bind(this));
  }
  showfilter() {
    this._breedFilter.classList.toggle("active");
  }
  searchinputbox(handler) {
    let checked = [];
    this._breedListSearch.addEventListener("input", function (e) {
      const searchval = e.target.value;

      let filtered = [];

      const newdatafilter = model.state.breedCategories.filter((el) =>
        el.name.toLowerCase().startsWith(searchval)
      );

      console.log(newdatafilter);
      handler(newdatafilter);
      checked = [...document.querySelectorAll(".breed_li")];

      if (checked.length > 0) {
        checked.forEach((el) =>
          el.addEventListener("change", function (e) {
            const targetel = e.target;
            console.log(targetel.checked);
            if (e.target.checked) {
              const index = model.state.breedCategories.findIndex((el) => {
                return el.name == targetel.value;
              });
              model.state.breedCategories[index].checked = true;
            } else if (!e.target.checked) {
              const index = model.state.breedCategories.findIndex((el) => {
                return el.name == targetel.value;
              });
              model.state.breedCategories[index].checked = false;
            }
            console.log(`yes`);
          })
        );
      }
    });
  }
}
export default new DogBreedCategory();
