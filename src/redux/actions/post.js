import axios from "../../utils/axios";

const fetchPosts = () => async dispatch => {
	try {
		dispatch({ type: "POSTS_REQUEST" });
		const res = await axios.get("/post/all");
		dispatch({ type: "POSTS_SUCCESS", payload: res.data.posts });
	} catch (err) {
		dispatch({ type: "POSTS_FAILURE", payload: err?.response?.data });
	}
};

const addPost = post => async dispatch => {
	dispatch({ type: "ADD_POST", payload: post });
};

const removePost = id => async dispatch => {
	dispatch({ type: "REMOVE_POST", payload: id });
};

const likePost = id => async dispatch => {
	try {
		const res = await axios.patch(`/post/like/${id}`);
		dispatch({
			type: "LIKE_POST",
			payload: {
				postId: id,
				userId: res.data.userId
			}
		});
	} catch (err) {
		dispatch({
			type: "OPEN_TOAST",
			payload: {
				message: err.response.data.error,
				type: "error"
			}
		});
	}
};

const dislikePost = id => async dispatch => {
	try {
		const res = await axios.patch(`/post/dislike/${id}`);
		dispatch({
			type: "DISLIKE_POST",
			payload: {
				postId: id,
				userId: res.data.userId
			}
		});
	} catch (error) {
		console.log(error);
	}
};

const addcomment = data => async dispatch => {
	try {
		await axios.post("/comment/add", data);
	} catch (error) {
		dispatch({
			type: "OPEN_TOAST",
			payload: {
				message: error.response.data.error,
				type: "error"
			}
		});
	}
};

const deletecomment = id => async dispatch => {
	try {
		await axios.delete(`/comment/delete/${id}`);
	} catch (error) {
		dispatch({
			type: "OPEN_TOAST",
			payload: {
				message: error.response.data.error,
				type: "error"
			}
		});
	}
};

const likeComment = (id, postId, userId) => async dispatch => {
	try {
		const res = await axios.patch(`/comment/like/${id}`);
		dispatch({
			type: "LIKE_COMMENT",
			payload: {
				commentId: id,
				userId,
				postId
			}
		});
	} catch (error) {
		dispatch({
			type: "OPEN_TOAST",
			payload: {
				message: error.response.data.error,
				type: "error"
			}
		});
	}
};

const dislikeComment = (id, postId, userId) => async dispatch => {
	try {
		const res = await axios.patch(`/comment/dislike/${id}`);
		dispatch({
			type: "DISLIKE_COMMENT",
			payload: {
				commentId: id,
				userId,
				postId
			}
		});
	} catch (error) {
		dispatch({
			type: "OPEN_TOAST",
			payload: {
				message: error.response.data.error,
				type: "error"
			}
		});
	}
};

export {
	fetchPosts,
	addPost,
	removePost,
	likePost,
	dislikePost,
	addcomment,
	deletecomment,
	likeComment,
	dislikeComment
};
