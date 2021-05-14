import { DOG_API_URL } from "./config.js";
import { getJSON } from "./helper.js";
import dogbreedView from "./view/dogbreedView.js";
import * as model from "./model.js";
import searchView from "./view/searchView.js";
import resultsPreviewView from "./view/resultsPreviewView.js";
import paginationView from "./view/paginationView.js";
import bookmarksView from "./view/bookmarksView.js";
import pageView from "./view/pageView.js";
import filterView from "./view/filterView.js";
import breedCategoryView from "./view/breedCategoryView.js";
import adoptResultView from "./view/adoptResultView.js";
import paginationAdoptViewJs from "./view/paginationAdoptView.js";
import paginationAdoptView from "./view/paginationAdoptView.js";
const controlDogBreedView = async function () {
	try {
		const [page, dogbreedName] = window.location.hash.split("-");
		console.log(page, dogbreedName);
		console.log(dogbreedName);
		if (!dogbreedName) return;
		//1. renderSpinner
		dogbreedView.renderLoaderAnim();
		//2. Load Recipe
		await model.loadDogBreeds(dogbreedName);
		//3.render Recipe
		console.log(model.state.dogBreed);
		dogbreedView.render(model.state.dogBreed);

		//render bookmarks
		bookmarksView.render(model.state.bookmarks);
	} catch (err) {
		dogbreedView.renderError();
	}
};

const controlSearchResults = async function () {
	try {
		//get query from search box
		const query = searchView.getQuery();
		//1. load loader
		resultsPreviewView.renderLoaderAnim();
		await model.loadSearchResults(query);

		resultsPreviewView.render(
			model.getSearchResultsPage(model.state.search.page)
		);
		paginationView.render(model.state.search);
	} catch (error) {
		console.log(error);
	}
};
const controlPagination = function (goToPage) {
	//3.render New results
	console.log(model.state.search.page);

	resultsPreviewView.render(model.getSearchResultsPage(goToPage));

	//4. render new pagination buttons
	paginationView.render(model.state.search);
};
const controlAddBookmark = function () {
	try {
		console.log("yes");
		//1. add/remove bookmark
		if (!model.state.dogBreed.bookmark) {
			model.addBookmark(model.state.dogBreed);
		} else {
			model.deleteBookmark(model.state.dogBreed.id);
		}
		//2.render bookmark preview.
		bookmarksView.render(model.state.bookmarks, true);
		//update dogbreed interface
		dogbreedView.render(model.state.dogBreed);
	} catch (error) {
		bookmarksView.renderMessage();
	}
};
const checkactivePage = function () {
	const [page, dogbreedName] = window.location.hash.slice(1).split("-");
	if (!page) return;
	model.changePageView(page);
	console.log(model.state.activeTab);
	pageView.addActiveClass(model.state.activeTab);
	if (model.state.activeTab === `ADOPT`) {
		controlinitload();
	}
};
const controlAdoptFilterPage = async function (newfilters) {
	//1. load Loader
	adoptResultView.renderLoader();
	//2. get data on api based on filters
	await model.loadFilterAdopt(newfilters);
	adoptResultView.removeloader();
	//3. render it to the page
	console.log(model.state.adoptDogs);
	adoptResultView.render(model.state.adoptDogs);
	paginationAdoptView.render(model.state.pagination);
};
const controlinitload = async function () {
	//1. load Loader
	adoptResultView.renderLoader();
	//2. get data on api based on filters
	await model.loadFilterAdopt();
	adoptResultView.removeloader();
	//3. render it to the page
	console.log(model.state.adoptDogs);
	adoptResultView.render(model.state.adoptDogs);
	paginationAdoptView.render(model.state.pagination);
};
const controlAddBreedFilterCategory = async function () {
	try {
		await model.getBreedCategories();
		breedCategoryView.render(model.state.breedCategories);
	} catch (error) {
		breedCategoryView.renderError();
	}
};
const controlAdoptPagination = async function (goToPage) {
	try {
		//
		model.storeprevPage();

		//1.fetch next data
		await model.getAdoptResultPage(goToPage);
		//2. render loader animation

		//3. render new data
		adoptResultView.render(model.state.adoptDogs);
		paginationAdoptView.render(model.state.pagination);
		paginationAdoptView.paginationroll(
			model.state.prevPage,
			Number(goToPage)
		);
	} catch (error) {
		console.log(error);
	}
};
const controlSearchInput = function (filteredlist) {
	breedCategoryView.render(filteredlist);
};
controlAddBreedFilterCategory();

const init = function () {
	bookmarksView.render(model.state.bookmarks);
	dogbreedView.addHandlerLoadDogBreed(controlDogBreedView);
	dogbreedView.addHandlerAddBookmark(controlAddBookmark);
	searchView.addHandlerSearch(controlSearchResults);
	paginationView.addHandlerClick(controlPagination);
	paginationView.addHandlerClick(controlPagination);
	pageView.addHandlerChangePage(checkactivePage);
	filterView.addHandelerFilter(controlAdoptFilterPage);
	paginationAdoptView.addHandlerChangePage(controlAdoptPagination);
	breedCategoryView.addHandlershowfilter();
	breedCategoryView.searchinputbox(controlSearchInput);
	filterView.addhandlerclearform();
};
init();
