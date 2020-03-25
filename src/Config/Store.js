import { createStore, combineReducers } from 'redux';
import { favoriteReducer } from './Reducer';

function saveToLocalStorage(state) {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('state', serializedState)
	}
	catch (error) {
		console.log(error);
	}
}

function loadFromLocalStorage() {
	try {
		const serializedState = localStorage.getItem('state');
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	}
	catch (error) {
		console.log(error);
		return undefined;
	}
}

const rootReducer = combineReducers({
	photos: favoriteReducer,
})

const persistedState = loadFromLocalStorage();

export const favoriteStore = createStore(
	rootReducer,
	persistedState,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

favoriteStore.subscribe(() => saveToLocalStorage(favoriteStore.getState()));


