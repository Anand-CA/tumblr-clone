export const initialState = {
	isAuthenticated: false,
	user: null,
	users: [],
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

		case "GET_USERS":
			return {
				...state,
				users: action.payload
			};

		case "SET_FOLLOWING_FOLLOWERS":
			const newUsers = [...state.users];
			//find sender by index
			const senderIndex = newUsers.findIndex(
				user => user._id === action.payload.sender
			);
			console.log(
				"🚀 ~ file: auth.js ~ line 65 ~ reducer ~ senderIndex",
				senderIndex
			);
			//find receiver by index
			const receiverIndex = newUsers.findIndex(
				user => user._id === action.payload.receiver
			);
			console.log(
				"🚀 ~ file: auth.js ~ line 70 ~ reducer ~ receiverIndex",
				receiverIndex
			);
			//set sender following
			newUsers[senderIndex].following.push(action.payload.receiver);
			//set receiver followers
			newUsers[receiverIndex].followers.push(action.payload.sender);

			if (action.payload.sender === state.user._id) {
				return {
					...state,
					user: {
						...state.user,
						following: newUsers[senderIndex].following,
						followers: newUsers[senderIndex].followers
					}
				};
			} else if (action.payload.receiver === state.user._id) {
				return {
					...state,
					user: {
						...state.user,
						following: newUsers[receiverIndex].following,
						followers: newUsers[receiverIndex].followers
					}
				};
			}

			return {
				...state,
				users: newUsers
			};

		case "UNSET_FOLLOWING_FOLLOWERS":
			const newUsers2 = [...state.users];
			//find sender by index
			const senderIndex2 = newUsers2.findIndex(
				user => user._id === action.payload.sender
			);
			console.log(
				"🚀 ~ file: auth.js ~ line 85 ~ reducer ~ senderIndex2",
				senderIndex2
			);
			//find receiver by index
			const receiverIndex2 = newUsers2.findIndex(
				user => user._id === action.payload.receiver
			);
			console.log(
				"🚀 ~ file: auth.js ~ line 90 ~ reducer ~ receiverIndex2",
				receiverIndex2
			);
			//set sender following
			newUsers2[senderIndex2].following = newUsers2[
				senderIndex2
			].following.filter(user => user !== action.payload.receiver);
			//set receiver followers
			newUsers2[receiverIndex2].followers = newUsers2[
				receiverIndex2
			].followers.filter(user => user !== action.payload.sender);

			if (
				action.payload.sender === state.user._id ||
				action.payload.receiver === state.user._id
			) {
				return {
					...state,
					user: {
						...state.user,
						following: newUsers2[senderIndex2].following,
						followers: newUsers2[receiverIndex2].followers
					}
				};
			}

			return {
				...state,
				users: newUsers2
			};

		default:
			return state;
	}
}
