import { combineReducers } from "redux";
import auth from "./auth";
import post from "./post";
import layout from "./layout";
import notification from "./notification";

export default combineReducers({
	auth,
	post,
	layout,
	notification
});
