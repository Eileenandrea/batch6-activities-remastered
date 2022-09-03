import { View } from "./View.js";

class PageView extends View {
  addHandlerChangePage(handler) {
    ["hashchange", "load"].forEach((e) => {
      window.addEventListener(e, function () {
        handler();
      });
    });
  }
  addActiveClass(activeTab) {
    //1. remove all active Tab page
    const ActiveTabs = [...document.querySelectorAll(".active__page")];
    if (ActiveTabs) {
      ActiveTabs.forEach((e) => e.classList.remove("active__page"));
    }
    //2. add active class to current hash
    const curPage = document.querySelector(`.container__${activeTab}`);
    curPage.classList.add("active__page");
    console.log(curPage);
  }
}
export default new PageView();
