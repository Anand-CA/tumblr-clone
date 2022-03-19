import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { getCurrentUser, logout } from "../redux/actions/auth";
import axios from "../utils/axios";
import { startSocket, stopSocket } from "../utils/socketio";

const useAuth = dispatch => {
	useEffect(() => {
		const accesstoken = localStorage.getItem("accesstoken");
		if (accesstoken) {
			const payload = jwt_decode(accesstoken);
			if (Date.now() >= payload.exp * 1000) {
				localStorage.removeItem("accesstoken");
				dispatch(logout());
				stopSocket();
			} else {
				dispatch(getCurrentUser());
			}
		}
	}, [dispatch]);
};

export default useAuth;
