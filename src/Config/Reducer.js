export function favoriteReducer(state = {}, action) {
	switch (action.type) {
		case 'ADD':
			state = {
				...state,
				[action.photo.id]: action.photo
			};

			return state;

		case 'REMOVE':
			delete state[action.photo.id];
			return state;

		default:
			return state;
	}
}
