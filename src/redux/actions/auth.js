import axios from "../../utils/axios";

const signin = (formData, id, router) => async dispatch => {
	try {
		const res = await axios.post("/login", formData);
		dispatch({ type: LOGIN, payload: res.data });
		id
			? router.push({
					pathname: "/internship/question/[id]",
					query: { id }
			  })
			: router.push("/");
	} catch (err) {
		dispatch({
			type: SIGNIN_ERRORS,
			payload: err.response.data
		});
	}
};

const signup = (formData, router) => async dispatch => {
	try {
		const res = await axios.post("/register", formData);
		dispatch({ type: LOGIN, payload: res.data });
		router.push("/signin");
	} catch (err) {
		dispatch({
			type: ERRORS,
			payload: err.response.data
		});
	}
};

const logout = () => async dispatch => {
	dispatch({
		type: "LOGOUT_USER"
	});
};

const follow = id => async dispatch => {
	try {
		const res = await axios.patch(`/auth/follow/${id}`);

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
		const res = await axios.patch(`/auth/unfollow/${id}`);
		dispatch({
			type: "UNFOLLOW_USER",
			payload: id
		});
	} catch (error) {
		console.log(error);
	}
};

export { signin, signup, logout, follow, unFollow };
