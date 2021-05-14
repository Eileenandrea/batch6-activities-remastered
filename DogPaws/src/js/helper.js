import {
	DOG_API_URL,
	OPTION_NO_TOKEN,
	OPTION_WITH_TOKEN,
	PETFINDER_KEY,
	PETFINDER_SECRET,
	TIMEOUT_SEC,
} from "./config.js";

export const timeout = function (s) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long! Timeout after ${s} second`));
		}, s * 1000);
	});
};
export const getJSON = async function (url, token = false) {
	try {
		if (token) {
			//1.Check if there is a token
			console.log(`token needed`);
			const hastoken = checkToken();
			console.log(hastoken);
			//2. generate token
			if (!hastoken) {
				console.log("no token please request a access token");
				const {
					token_type: tokenType,
					expires_in: expireIn,
					access_token: accessToken,
				} = await getToken();
				console.log(tokenType);
				const tokenExpiry = new Date().getTime() + expireIn * 1000;
				localStorage.setItem("tokenType", tokenType);
				localStorage.setItem("tokenExpiry", tokenExpiry);
				localStorage.setItem("accessToken", accessToken);
			}
		}

		const option = token ? OPTION_WITH_TOKEN : OPTION_NO_TOKEN;

		const res = await Promise.race([
			fetch(url, option),
			timeout(TIMEOUT_SEC),
		]);
		const data = await res.json();
		return data;
		if (!res.ok) throw new Error(`${data.message}(${data.status})`);
	} catch (error) {
		throw error;
	}
};

const checkToken = function () {
	const sessionToken = localStorage.getItem("accessToken");
	const sessionExpiration = localStorage.getItem("tokenExpiry");

	if (!sessionExpiration || sessionExpiration - new Date().getTime() < 1) {
		console.log(`expire`);
		return false;
	} else return true;
};

const getToken = async function () {
	try {
		const res = await fetch("https://api.petfinder.com/v2/oauth2/token", {
			method: "POST",
			body:
				"grant_type=client_credentials&client_id=" +
				PETFINDER_KEY +
				"&client_secret=" +
				PETFINDER_SECRET,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});
		if (!res.ok)
			throw new Error("Something is Wrong. Access token is not generted");
		const data = await res.json();
		console.log(data);
		return data;
	} catch (error) {
		console.error(console.error());
	}
};
