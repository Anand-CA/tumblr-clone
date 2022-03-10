export const initialState = {
	isAuthenticated: false,
	user: null,
	signinStatus: "idle",
	signinErr: null,

	signupStatus: "idle",
	signupErr: null
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case "SIGNIN_REQUEST":
			return {
				...state,
				signinStatus: "loading"
			};

		case "SIGNIN_SUCCESS":
			localStorage.setItem(
				"access_token",
				action.payload.authToken.accessToken
			);
			return {
				...state,
				isAuthenticated: true,
				user: action.payload.user,
				signinStatus: "succeeded"
			};

		case "SIGNIN_FAILURE":
			return {
				...state,
				user: null,
				signinStatus: "failed",
				signinErr: action.payload
			};
		case "SET_USER":
			return {
				...state,
				isAuthenticated: true,
				user: action.payload
			};
		case "LOGOUT_USER":
			localStorage.removeItem("accesstoken");
			return {
				...state,
				isAuthenticated: false,
				user: null
			};

		case "FOLLOW_USER":
			return {
				...state,
				user: {
					...state.user,
					following: [...state.user.following, action.payload]
				}
			};

		case "UNFOLLOW_USER":
			return {
				...state,
				user: {
					...state.user,
					following: state.user.following.filter(
						user => user !== action.payload
					)
				}
			};

		default:
			return state;
	}
}
