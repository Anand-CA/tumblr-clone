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

const unFollow = id => async dispatch => {
	try {
		const res = await axios.patch(`/auth/unfollow/${id}`);
	} catch (error) {
		console.log(error);
	}
};

const getUsers = () => async dispatch => {
	try {
		const res = await axios.get("/auth/allusers");
		dispatch({
			type: "GET_USERS",
			payload: res.data.users
		});
	} catch (error) {
		console.log(error);
	}
};

export { signin, signup, logout, follow, unFollow, getUsers };
