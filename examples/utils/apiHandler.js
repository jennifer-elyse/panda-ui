import { Alert } from 'react-native';

let sessionState = null;
// Do not use!
// Only exported for use in Contexts, the source of truth of the session state.
export function setSessionState(state) {
	sessionState = state;
}

const serverUrl = '';
const headers = {
	'Accept': 'application/json',
	'Content-Type': 'application/json; charset=UTF-8'
};

async function apiFetch(url, method, data) {
	if (!sessionState) {
		Alert.alert('dataVizApi called before session state initialized. Try to defer API calls made in response to authentication.');
		return Promise.reject();
	}

	const response = await fetch(url, {
		method,
		headers,
		mode: 'cors',
		body: method === 'GET' ? null : JSON.stringify(data)
	});

	// console.log(url, response);
	if (!response.ok) throw Error(response.statusText);
	const parsedJson = await response.json();

	return parsedJson;
}

const delayData = (data, delay=1000) => new Promise(resolve => setTimeout(() => resolve(data), delay));

export async function getCharacters() {
	return {
		data: {
			characters: [
				{
					id: '0',
					animal: 'default'
				},
				{
					id: '1',
					animal: 'Panda'
				},
				{
					id: '2',
					animal: 'Red Panda'
				},
				{
					id: '3',
					animal: 'Ugly Panda'
				},
				{
					id: '4',
					animal: 'Trash Panda'
				},
				{
					id: '5',
					animal: 'Candy Panda'
				}
			]
		}
	};
}

export async function getCharacterQualities(characterId) {
	// const url = `${serverUrl}/`;
	// const response = await apiFetch(url, 'GET', null);

	const json =  {
		data: {
			qualities: [
				{
					characterId: '1',
					animal: 'Panda',
					name: 'Akira',
					theme: 'panda',
					faveFood: 'Bamboo',
					peeves: 'Rainy Days',
					loves: 'Classical Music',
					color: 'Rose Gold',
					svg: require('../assets/panda.svg')
				},
				{
					characterId: '2',
					animal: 'Red Panda',
					name: 'Yuki',
					theme: 'redPanda',
					faveFood: 'Chocolate-covered Strawberries',
					peeves: 'Paparazzi',
					loves: 'Ear scratches and Bling',
					color: 'Red',
					svg: require('../assets/redpanda.svg')
				},
				{
					characterId: '3',
					animal: 'Ugly Panda',
					name: 'Kenzo',
					theme: 'uglyPanda',
					faveFood: 'Eucalyptus Tea and Fortune Cookies',
					peeves: 'Judgy People',
					loves: 'Books and Good Conversation',
					color: 'Grey',
					svg: require('../assets/uglypanda.svg')
				},
				{
					characterId: '4',
					animal: 'Trash Panda',
					name: 'Tsuki',
					theme: 'trashPanda',
					faveFood: 'Peanut Butter, Spaghetti and Trash Juice',
					peeves: 'Locks',
					color: 'Midnight',
					loves: 'Cardboard, Dumpsters, and Dog Doors',
					svg: require('../assets/trashpanda.svg')
				},
				{
					characterId: '5',
					animal: 'Candy Panda',
					name: 'Kumi',
					theme: 'candyPanda',
					faveFood: 'My-Ame ',
					peeves: 'Party Poopers',
					color: 'Hot Pink',
					loves: 'Cuddles',
					svg: require('../assets/trashpanda.svg')
				}
			]

		}
	};

	if (!characterId) {
		return delayData(json);
	}

	return delayData(json.data.qualities.find(item => item.characterId === characterId));

	// const qualities = response.data.map((item, i) => {
	// return {
	// 	};
	// });

	// return qualities;
}
