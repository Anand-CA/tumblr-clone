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

const follow = id => async dispatch => {
	try {
		const res = await axios.put(`/auth/follow/${id}`);
		dispatch({
			type: "FOLLOW_USER",
			payload: id
		});
	} catch (error) {
		console.log(error);
	}
};

const unFollow = id => async dispatch => {
	try {
		const res = await axios.put(`/auth/unfollow/${id}`);
		dispatch({
			type: "UNFOLLOW_USER",
			payload: id
		});
	} catch (error) {
		console.log(error);
	}
};

export { fetchPosts, addPost, removePost, follow, unFollow };
