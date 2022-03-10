const initialState = {
	posts: [],
	posts_status: "idle",
	posts_err: null
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case "POSTS_REQUEST":
			return {
				...state,
				posts_status: "loading"
			};

		case "POSTS_SUCCESS":
			return {
				...state,
				posts_status: "succeeded",
				posts: action.payload,
				posts_err: null
			};
		case "POSTS_FAILURE":
			return {
				...state,
				posts_status: "failed",
				posts_err: action.payload
			};

		case "REMOVE_POST":
			return {
				...state,
				posts: state.posts.filter(post => post._id !== action.payload)
			};

		case "ADD_POST":
			return {
				...state,
				posts: [action.payload, ...state.posts]
			};

		case "FOLLOW_USER":
			return {
				...state
			};

		case "UNFOLLOW_USER":
			return {
				...state
			};
		default:
			return state;
	}
}
