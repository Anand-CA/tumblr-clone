import { combineReducers } from "redux";
import auth from "./auth";
import post from "./post";
import layout from "./layout";

export default combineReducers({
	auth,
	post,
	layout
});
