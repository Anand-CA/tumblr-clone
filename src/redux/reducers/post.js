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
			if (state.posts.find(post => post._id !== action.payload._id)) {
				return {
					...state,
					posts: [action.payload, ...state.posts]
				};
			}

		case "LIKE_POST":
			return {
				...state,
				posts: state.posts.map(post => {
					if (post._id === action.payload.postId) {
						return {
							...post,
							likes: [...post.likes, action.payload.userId]
						};
					}
					return post;
				})
			};

		case "DISLIKE_POST":
			return {
				...state,
				posts: state.posts.map(post => {
					if (post._id === action.payload.postId) {
						post.likes = post.likes.filter(
							like => like !== action.payload.userId
						);
					}
					return post;
				})
			};

		case "ADD_COMMENT":
			// don't add duplicate comment
			if (
				state.posts
					.find(post => post._id === action.payload.postId)
					.comments.find(comment => comment._id === action.payload._id)
			) {
				return state;
			}

			return {
				...state,
				posts: state.posts.map(post => {
					if (post._id === action.payload.postId) {
						return {
							...post,
							comments: [action.payload, ...post.comments]
						};
					}
					return post;
				})
			};

		case "DELETE_COMMENT":
			return {
				...state,
				posts: state.posts.map(post => {
					if (post._id === action.payload.postId) {
						post.comments = post.comments.filter(
							comment => comment._id !== action.payload.commentId
						);
					}
					return post;
				})
			};

		case "LIKE_COMMENT":
			return {
				...state,
				posts: state.posts.map(post => {
					if (post._id === action.payload.postId) {
						post.comments = post.comments.map(comment => {
							if (comment._id === action.payload.commentId) {
								if (!comment.likes.includes(action.payload.userId)) {
									return {
										...comment,
										likes: [...comment.likes, action.payload.userId]
									};
								}
							}
							return comment;
						});
					}
					return post;
				})
			};

		case "DISLIKE_COMMENT":
			return {
				...state,
				posts: state.posts.map(post => {
					if (post._id === action.payload.postId) {
						post.comments = post.comments.map(comment => {
							if (comment._id === action.payload.commentId) {
								comment.likes = comment.likes.filter(
									like => like !== action.payload.userId
								);
							}
							return comment;
						});
					}
					return post;
				})
			};

		default:
			return state;
	}
}
