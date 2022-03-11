const initialState = {
	toast: {
		status: "idle",
		open: false,
		message: null,
		type: null
	},

	modal: {
		status: "idle",
		open: false
	}
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case "OPEN_TOAST":
			return {
				...state,
				toast: {
					...state.toast,
					open: true,
					message: action.payload.message,
					type: action.payload.type
				}
			};

		case "CLOSE_TOAST":
			return {
				...state,
				toast: {
					...state.toast,
					open: false,
					message: null,
					type: null
				}
			};

		case "OPEN_MODAL":
			return {
				...state,
				modal: {
					...state.modal,
					open: true
				}
			};

		case "CLOSE_MODAL":
			return {
				...state,
				modal: {
					...state.modal,
					open: false
				}
			};

		default:
			return state;
	}
}
