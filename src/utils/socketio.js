import { io } from "socket.io-client";

export const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
	autoConnect: false
});

export const startSocket = userId => {
	socket.auth = {
		userId
	};
	socket.connect();
};

export const stopSocket = () => {
	socket.disconnect();
};
