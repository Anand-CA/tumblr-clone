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
			const senderDoc = newUsers.find(
				user => user._id === action.payload.senderId
			);

			const receiverDoc = newUsers.find(
				user => user._id === action.payload.receiverId
			);

			senderDoc.following.push(receiverDoc._id);
			receiverDoc.followers.push(senderDoc._id);

			if (state.user._id === action.payload.senderId) {
				return {
					...state,
					user: {
						...state.user,
						following: senderDoc.following
					}
				};
			}
			if (state.user._id === action.payload.receiverId) {
				return {
					...state,
					user: {
						...state.user,
						followers: receiverDoc.followers
					}
				};
			}

			return {
				...state,
				users: newUsers
			};

		case "UNSET_FOLLOWING_FOLLOWERS":
			const newUsers2 = [...state.users];
			const senderDoc2 = newUsers2.find(
				user => user._id === action.payload.senderId
			);

			const receiverDoc2 = newUsers2.find(
				user => user._id === action.payload.receiverId
			);

			senderDoc2.following = senderDoc2.following.filter(
				following => following !== receiverDoc2._id
			);
			receiverDoc2.followers = receiverDoc2.followers.filter(
				follower => follower !== senderDoc2._id
			);

			if (state.user._id === action.payload.senderId) {
				return {
					...state,
					user: {
						...state.user,
						following: senderDoc2.following
					}
				};
			}
			if (state.user._id === action.payload.receiverId) {
				return {
					...state,
					user: {
						...state.user,
						followers: receiverDoc2.followers
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
