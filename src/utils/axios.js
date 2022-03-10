import axios from "axios";

const instance = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`
});

instance.interceptors.request.use(
	config => {
		const token = localStorage?.getItem("accesstoken");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	error => {
		console.log(error);
	}
);

export default instance;
