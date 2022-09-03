export const DOG_API_URL = `https://api.thedogapi.com/v1/breeds/`;
export const PETFINDER_API_URL = `https://api.petfinder.com/v2/animals?type=dog`;
export const PETFINDER_API_URL_BREEDS = `https://api.petfinder.com/v2/types/dog/breeds`;
export const TIMEOUT_SEC = 20;
export const RES_PER_PAGE = 5;
export const KEY = "f71ada5a-43fe-44aa-a859-7cbc29154576";
export const MODAL_CLOSE_SEC = 2.5;
export const PETFINDER_KEY =
  "uQ2ZwPWg7tdlZZS4LOVlDpw0jaOb1ZCAZKVFUv70eRk1IyHsQf";
export const PETFINDER_SECRET = "8s3ymCPOOO4WzzDmObqfCI2WHw92EqEilY2FOzwO";
export const OPTION_NO_TOKEN = {
  headers: {
    "X-API-KEY": "d54efa80-8806-4f44-828d-fc215287841a",
  },
};
const accessToken = localStorage.getItem("accessToken");
const tokenExpiry = localStorage.getItem("tokenExpiry");
const tokenType = localStorage.getItem("tokenType");
export const OPTION_WITH_TOKEN = {
  headers: {
    Authorization: tokenType + " " + accessToken,
    "Content-Type": "application/x-www-form-urlencoded",
  },
};
