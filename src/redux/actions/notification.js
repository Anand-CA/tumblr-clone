import axios from "../../utils/axios";

const fetchNotifications = userId => async dispatch => {
	try {
		const res = await axios.get(`/notification/user/${userId}`);
		console.log(res.data);
		dispatch({ type: "FETCH_NOTIFICATIONS", payload: res.data.notifications });
	} catch (error) {
		console.log(error);
	}
};

const setNotificationAsRead = notifications => async dispatch => {
	try {
		const res = await axios.put(`/notification/read`, { notifications });
		dispatch({
			type: "SET_NOTIFICATION_AS_READ",
			payload: res.data.notifications
		});
	} catch (error) {
		console.log(error);
	}
};

export { fetchNotifications, setNotificationAsRead };
