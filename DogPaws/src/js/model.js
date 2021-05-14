import {
	DOG_API_URL,
	PETFINDER_API_URL,
	PETFINDER_API_URL_BREEDS,
	RES_PER_PAGE,
} from "./config.js";
import { getJSON } from "./helper.js";

export const state = {
	dogBreed: {},
	search: {
		resultsPerPage: RES_PER_PAGE,
		query: "",
		results: [],
		page: 1,
	},
	bookmarks: [],
	activeTab: `HOME`,
	breedCategories: [],
	filter: {
		breed: [],
		gender: [],
		age: [],
		size: [],
	},
	adoptDog: [],
	filterjoin: "",
	adoptpage: 1,
	pagination: {},
	prevPage: "",
};
export const storeprevPage = function (params) {
	state.prevPage = state.pagination.currentPage;
};
export const changePageView = function (activeTab) {
	state.activeTab = activeTab;
};
const createDogBreedObject = function (data) {
	return {
		id: data.id,
		lifeSpan: data.life_span,
		height: data.height,
		name: data.name,
		origin: data.origin,
		imageID: data.reference_image_id,
		temperament: data.temperament,
	};
};
export const loadDogBreeds = async function (dogbreed) {
	try {
		const [data] = await getJSON(`${DOG_API_URL}search?name=${dogbreed}`);
		state.dogBreed = createDogBreedObject(data);
		console.log(state.dogBreed);
		console.log(state.bookmarks);
		if (state.bookmarks.some((b) => b.id === state.dogBreed.id)) {
			state.dogBreed.bookmark = true;
		} else {
			state.dogBreed.bookmark = false;
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const loadSearchResults = async function (query) {
	try {
		const data = await getJSON(`${DOG_API_URL}search?name=${query}`);
		state.search.results = data.map((el) => createDogBreedObject(el));
	} catch (err) {
		throw err;
	}
};

export const getSearchResultsPage = function (page = state.search.page) {
	state.search.page = page;
	const start = (page - 1) * state.search.resultsPerPage; //0
	const end = page * state.search.resultsPerPage; //10
	console.log(start);
	return state.search.results.slice(start, end);
};

const persistBookmarks = function () {
	localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};
export const addBookmark = function (dogBreed) {
	// Add bookmark

	state.bookmarks.push(dogBreed);

	if (dogBreed.id === state.dogBreed.id) state.dogBreed.bookmark = true;
	persistBookmarks();
	console.log(state.dogBreed);
	console.log(state.bookmarks);
};
export const deleteBookmark = function (id) {
	console.log(state.bookmarks);
	console.log(id);
	const index = state.bookmarks.findIndex((el) => el.id === id);

	console.log(index);
	state.bookmarks.splice(index, 1);
	console.log(state.bookmarks);
	if (id === state.dogBreed.id) state.dogBreed.bookmark = false;
	persistBookmarks();
};
const clearBookmarks = function () {
	localStorage.clear("bookmarks");
};
const init = function () {
	const storage = localStorage.getItem("bookmarks");
	if (storage) state.bookmarks = JSON.parse(storage);
	console.log(storage);
};

/* this is for the Dog Adopt page */
export const loadFilterAdopt = async function (newfilter = "") {
	try {
		//clearing the filter;
		const breedlength = state.filter.breed.length;
		const genderlength = state.filter.gender.length;
		const agelength = state.filter.age.length;
		const sizelength = state.filter.size.length;
		for (let i = 0; i < breedlength; i++) {
			state.filter.breed.pop();
		}

		for (let i = 0; i < genderlength; i++) {
			state.filter.gender.pop();
		}
		for (let i = 0; i < agelength; i++) {
			state.filter.age.pop();
		}
		for (let i = 0; i < sizelength; i++) {
			state.filter.size.pop();
		}

		for (const [key, value] of Object.entries(newfilter)) {
			const keysplit = key.split("-");

			switch (keysplit[0]) {
				case "Breed":
					if (!state.filter.breed.some((el) => el === value)) {
						state.filter.breed.push(value);
					}
					break;
				case "Gender":
					// code block
					if (!state.filter.gender.some((el) => el === value)) {
						state.filter.gender.push(value);
					}
					break;
				case "Age":
					// code block
					if (!state.filter.age.some((el) => el === value)) {
						state.filter.age.push(value);
					}
					break;
				case "Size":
					// code block
					if (!state.filter.size.some((el) => el === value)) {
						state.filter.size.push(value);
					}
					break;
				default:
				// code block
			}
		}
		const breedFilter = `${
			state.filter.breed.length > 0
				? `&breed=${state.filter.breed.join(",")}`
				: ""
		}`;
		const genderFilter = `${
			state.filter.gender.length > 0
				? `&gender=${state.filter.gender.join(",")}`
				: ""
		}`;
		const ageFilter = `${
			state.filter.size.length > 0
				? `&size=${state.filter.size.join(",")}`
				: ""
		}`;
		const sizeFilter = `${
			state.filter.size.length > 0
				? `&size=${state.filter.size.join(",")}`
				: ""
		}`;
		const page = `&page=${state.adoptpage}`;
		const filter = [breedFilter, genderFilter, ageFilter, sizeFilter].join(
			""
		);

		state.filterjoin = filter;
		const { animals: animals, pagination: pagination } = await getJSON(
			`${PETFINDER_API_URL}${filter}${page}`,
			true
		);
		state.adoptDogs = animals;
		console.log(pagination);
		state.pagination = {
			coutPerPage: pagination?.count_per_page,
			totalCount: pagination.total_count,
			currentPage: pagination.current_page,
			totalPages: pagination.total_pages,
		};
		console.log(state.pagination);
	} catch (error) {
		throw error;
	}
};

export const getAdoptResultPage = async function (gotopage) {
	try {
		state.adoptpage = gotopage;
		const page = `&page=${gotopage}`;
		const filter = state.filterjoin;
		const { animals: animals, pagination: pagination } = await getJSON(
			`${PETFINDER_API_URL}${filter}${page}`,
			true
		);
		state.adoptDogs = animals;
		console.log(pagination);
		state.pagination = {
			coutPerPage: pagination?.count_per_page,
			totalCount: pagination.total_count,
			currentPage: pagination.current_page,
			totalPages: pagination.total_pages,
		};
	} catch (error) {
		throw error;
	}
};
export const getBreedCategories = async function () {
	try {
		const { breeds } = await getJSON(`${PETFINDER_API_URL_BREEDS}`, true);
		if (!breeds) throw new Error(`Something went wrong please try again`);

		const breedsArray = breeds.map((b) => b.name);
		breedsArray.forEach((el) => {
			state.breedCategories.push({ name: el, checked: false });
		});
		return breedsArray;
	} catch (err) {
		throw error;
	}
};

init();
