import axios from "../../utils/axios";
import { startSocket } from "../../utils/socketio";

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

const googleAuth = id => async dispatch => {
	try {
		dispatch({ type: "GOOGLE_AUTH_REQUEST" });
		const res = await axios.post("/auth/google", {
			tokenId: id
		});
		localStorage.setItem("accesstoken", res.data.accesstoken);
		dispatch({ type: "SET_USER", payload: res.data.user });
		startSocket(res.data.user._id);
	} catch (error) {
		dispatch({
			type: "OPEN_TOAST",
			payload: {
				message: err.response.data.error,
				type: "error"
			}
		});
	}
};

const getCurrentUser = () => async dispatch => {
	try {
		dispatch({ type: "USER_AUTH_CHECK" });
		const res = await axios.get("/auth/currentuser");
		dispatch({ type: "SET_USER", payload: res.data.user });
		startSocket(res.data.user._id);
	} catch (error) {
		console.log(error);
	}
};

const logout = () => async dispatch => {
	dispatch({
		type: "LOGOUT_USER"
	});
};

const follow = id => async dispatch => {
	try {
		await axios.patch(`/auth/follow/${id}`);
	} catch (error) {
		dispatch({
			type: "OPEN_TOAST",
			payload: {
				message: error?.response?.data?.error,
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

export {
	signin,
	signup,
	logout,
	follow,
	unFollow,
	googleAuth,
	getUsers,
	getCurrentUser
};
