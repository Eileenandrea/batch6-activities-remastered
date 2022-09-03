import { View } from "./View.js";
import * as model from "../model.js";
class FilterView extends View {
  _parentElement = document.querySelector(".filter");
  addHandelerFilter(handler) {
    console.log(this._parentElement);
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      console.log(this);
      const dataArray = [...new FormData(this)];
      const data = Object.fromEntries(dataArray);
      console.log(data);
      handler(data);
    });
  }
  addhandlerclearform() {
    const clearBtn = document.querySelector(".clearform");
    clearBtn.addEventListener("click", this.clearform.bind(this));
  }
  clearform() {
    model.state.breedCategories.forEach((el) => (el.checked = false));
    this._parentElement.reset();
  }
}
export default new FilterView();
