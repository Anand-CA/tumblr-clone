const initialState = {
	notifications: [],
	unreadNotifications: null
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case "FETCH_NOTIFICATIONS":
			const nots = action.payload;
			const notsFiltered = nots.filter(not => not.read === false);
			return {
				...state,
				notifications: action.payload,
				unreadNotifications: notsFiltered.length
			};

		case "ADD_NOTIFICATION": {
			const nots = [...state.notifications];
			nots.unshift(action.payload);
			const notsFiltered = nots.filter(not => not.read === false);

			return {
				...state,
				notifications: nots,
				unreadNotifications: notsFiltered.length
			};
		}

		case "SET_NOTIFICATION_AS_READ":
			return {
				...state,
				unreadNotifications: 0
			};

		case "DELETE_NOTIFICATION":
			return {
				...state,
				notifications: state.notifications.filter(
					not => not._id !== action.payload
				)
			};

		default:
			return state;
	}
}
