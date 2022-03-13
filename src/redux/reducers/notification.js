const initialState = {
	notifications: [],
	unreadNotifications: []
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case "FETCH_NOTIFICATIONS":
			const nots = action.payload;
			const notsFiltered = nots.filter(not => not.read === false);
			return {
				...state,
				notifications: action.payload,
				unreadNotifications: notsFiltered
			};

		case "SET_NOTIFICATION_AS_READ":
			return {
				...state,
				notifications: action.payload,
				unreadNotifications: []
			};

		default:
			return state;
	}
}
